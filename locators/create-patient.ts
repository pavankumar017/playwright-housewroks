import { Locator, Page, expect } from "@playwright/test";
import {
  NumberDictionary,
  names,
  uniqueNamesGenerator,
} from "unique-names-generator";

export class CreatePatient {
  readonly page: Page;
  readonly firstName: Locator;
  readonly middleName: Locator;
  readonly lastName: Locator;
  readonly dateOfBirth: Locator;
  readonly sex: Locator;
  readonly clearButton: Locator;
  readonly checkButton: Locator;
  readonly selectedDate: Locator;
  readonly createButton: Locator;
  readonly ssnField: Locator;
  readonly errorAlert: Locator;
  readonly totalItems: Locator;
  readonly sideMenuPatients: Locator;
  readonly sideMenuCreatePatient: Locator;
  readonly recordsPerPage: Locator;
  readonly pageNumberCount: Locator;
  readonly sideMenu: Locator;
  readonly nextPage: Locator;
  readonly patientTable: Locator;
  randomFirstName: string;
  randomMiddleName: string;
  randomLastName: string;
  randomDateOfBirth: string;

  constructor(page: Page) {
    this.page = page;
    this.firstName = this.page.getByPlaceholder("Enter First Name");
    this.middleName = this.page.getByPlaceholder("Enter Middle Name");
    this.lastName = this.page.getByPlaceholder("Enter Last Name");
    this.dateOfBirth = this.page.locator("[data-testid='add-patient-dob']");
    this.sex = this.page.getByLabel("Sex");
    this.clearButton = this.page.getByRole("button", { name: "Clear" });
    this.createButton = this.page.getByRole("button", { name: "Create" });
    this.checkButton = this.page.getByTestId("add-patient-check-button");
    this.selectedDate = this.page.locator("[class*=cell-selected]");
    this.ssnField = this.page.getByTestId("add-patient-ssn");
    this.errorAlert = this.page.getByRole("alert");
    this.totalItems = this.page.getByText("item(s)");
    this.recordsPerPage = this.page.locator(
      "(//*[@data-testid='patients-table'])/following-sibling::ul[1]/li[@title='Next Page']/following-sibling::li"
    );
    this.sideMenuPatients = this.page.getByTestId("activity-Patients");
    this.sideMenuCreatePatient = this.page.getByTestId("menu-CreatePatient");
    this.pageNumberCount = this.page.locator(
      "(//*[@data-testid='patients-table'])/following-sibling::ul[1]/li[@title='Next Page']/preceding-sibling::li[1]"
    );
    this.sideMenu = this.page.getByTestId("pin-menu");
    this.nextPage = this.page.locator(
      "(//*[@data-testid='patients-table'])/following-sibling::ul[1]/li[@title='Next Page']"
    );
    this.patientTable = this.page.locator(
      "(//*[@data-testid='patients-table'])/div/div/table/tbody"
    );
    this.randomFirstName = uniqueNamesGenerator({
      dictionaries: [names],
    });
    this.randomMiddleName = uniqueNamesGenerator({
      dictionaries: [names],
    });
    this.randomLastName = uniqueNamesGenerator({
      dictionaries: [names],
    });
    this.randomDateOfBirth = this.formatDate(
      new Date(
        new Date(1111, 0, 1).getTime() +
          Math.random() *
            (new Date().getTime() - new Date(1111, 0, 1).getTime())
      )
    ).toString();
  }

  formatDate = (date: Date) => {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(date);
    return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join("/");
  };

  async enterFirstName() {
    await this.firstName.fill(this.randomFirstName);
  }
  async enterMiddleName() {
    await this.middleName.fill(this.randomMiddleName);
  }
  async enterLastName() {
    await this.lastName.fill(this.randomLastName);
  }
  async selectDateOfBirth() {
    await this.dateOfBirth.click();
    await this.dateOfBirth.fill(this.randomDateOfBirth);
    await this.selectedDate.click();
  }
  async enterSSN() {
    const numberDictionary = NumberDictionary.generate({
      min: 100000000,
      max: 999999999,
    });
    let randomSSN: string = uniqueNamesGenerator({
      dictionaries: [numberDictionary],
    });
    await this.ssnField.fill(randomSSN);
  }

  async clickOnCheckButton() {
    await this.checkButton.click();
  }

  async clickOnCreateButton() {
    await this.createButton.click();
  }
  async waitTillCreateButtonOnDisplayed() {
    await expect(
      this.createButton,
      "Create button is not disabled"
    ).toBeDisabled();
    await this.page.waitForTimeout(10000);
  }

  async clickOnClearButton() {
    await this.clearButton.click();
  }

  async validateCheckButtonDisabled() {
    await expect(
      this.checkButton,
      "Check button is not disabled"
    ).toBeDisabled();
  }

  async validateAllFieldsAreEmpty() {
    await expect(
      this.firstName,
      "First name value is not null after clear"
    ).toHaveValue("");
    await expect(
      this.middleName,
      "Middle name value is not null after clear"
    ).toHaveValue("");
    await expect(
      this.lastName,
      "Last name value is not null after clear"
    ).toHaveValue("");
    await expect(
      this.dateOfBirth,
      "Date of birth name value is not null after clear"
    ).toHaveValue("");
    await expect(
      this.ssnField,
      "SSN value is not null after clear"
    ).toHaveValue("");
  }

  async enterDataIntoMandatoryFields() {
    await this.enterFirstName();
    await this.enterLastName();
    await this.selectDateOfBirth();
  }

  async enterDataIntoOptionalFields() {
    await this.enterMiddleName();
    await this.enterSSN();
  }

  async validateEmptyMandatoryFieldsErrorMessages() {
    await this.page.waitForTimeout(2000);
    expect(
      this.errorAlert.nth(0),
      "First name required error message is incorrect"
    ).toHaveText("First name is required");
    expect(
      this.errorAlert.nth(1),
      "Last name required error message is incorrect"
    ).toHaveText("Last name is required");
    expect(
      this.errorAlert.nth(2),
      "Date of Birth required error message is incorrect"
    ).toHaveText("Date of Birth is required");
  }

  async validatePagination() {
    await this.page.waitForTimeout(5000);
    await this.totalItems.isVisible();
    let totalItemsText = (await this.totalItems.innerText()).toString();
    let totalItemsTextArray = totalItemsText.split(" ");
    let totalItemsCount = totalItemsTextArray[1];
    let recordsPerPageOption = ["20", "50", "100"];
    let expectedPageCount = Math.ceil(Number(totalItemsCount) / 10);
    let actualPageCount = (await this.pageNumberCount.innerText()).toString();
    expect(expectedPageCount.toString(), "Page count is incorrect").toEqual(
      actualPageCount
    );
    for (const recordsPerPageValue of recordsPerPageOption) {
      await this.recordsPerPage.click();
      await this.page
        .locator("//*[@title='" + recordsPerPageValue + " / page']")
        .click();
      let expectedPageCount = Math.ceil(
        Number(totalItemsCount) / Number(recordsPerPageValue)
      );
      let actualPageCount = (await this.pageNumberCount.innerText()).toString();
      expect(expectedPageCount.toString(), "Page count is incorrect").toEqual(
        actualPageCount
      );
    }
  }
  async openCreateFromSideMenu() {
    await this.sideMenuPatients.hover();
    await this.sideMenu.click();
    await this.page.waitForTimeout(2000);
    await this.sideMenuCreatePatient.click();
  }

  async validateDefaultSort() {
    let rank: string[] = [];
    let flag = true;
    let pageCount = await this.pageNumberCount.innerText();
    for (let count = Number(pageCount); count > 0; count = count - 1) {
      let tableData = await this.patientTable.innerText();
      let allRecordsArray = tableData.split("\n");
      allRecordsArray.splice(0, 12);
      for (const element of allRecordsArray) {
        let indexForMatchScore = element.lastIndexOf("\t");
        let actualRankOrder = element.substring(indexForMatchScore + 1);
        rank.push(actualRankOrder);
      }
      await this.nextPage.click();
      await this.page.waitForTimeout(2000);
    }
    let sortedRank = [...rank];
    sortedRank.sort((one, two) => (one > two ? -1 : 1));
    expect(rank, "Match score order is incorrect").toEqual(sortedRank);
  }
}
