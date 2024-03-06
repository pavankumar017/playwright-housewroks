import { Locator, Page, expect } from "@playwright/test";
import { randomInt } from "crypto";
import { names, uniqueNamesGenerator } from "unique-names-generator";

export class CreatePatient {
  readonly page: Page;
  readonly firstName: Locator;
  readonly mandatoryMark: Locator;
  readonly middleName: Locator;
  readonly lastName: Locator;
  readonly dateOfBirth: Locator;
  readonly sex: Locator;
  readonly clearButton: Locator;
  readonly checkButton: Locator;
  readonly selectedDate: Locator;
  readonly createButton: Locator;
  readonly errorAlert: Locator;
  readonly totalItems: Locator;
  readonly recordsPerPage: Locator;
  readonly pageNumberCount: Locator;
  readonly sideMenu: Locator;
  readonly nextPage: Locator;
  readonly patientTable: Locator;
  readonly randomFirstName: string;
  readonly randomMiddleName: string;
  readonly randomLastName: string;
  readonly randomDateOfBirth: string;
  readonly firstNameCharacterLimitValue: string;
  readonly middleNameCharacterLimitValue: string;
  readonly lastNameCharacterLimitValue: string;
  readonly noDataAvailable: Locator;
  readonly sexDropdown: string[];
  readonly diseaseType: Locator;
  readonly diseaseTypeDropdown: string[];
  readonly affectedOrgan: Locator;
  readonly affectedOrganCancerDropdown: string[];
  readonly affectedOrganOrganFailureDropdown: string[];
  readonly activePageNumber: Locator;
  readonly diseaseTypeOption: Locator;
  readonly radioButton: Locator;
  readonly patientTableColumnNames: string[];
  readonly possibleMatchesHelpText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = this.page.getByTestId("first-name");
    this.mandatoryMark = this.page.locator("[class='ant-form-item-required']");
    this.middleName = this.page.getByTestId("middle-name");
    this.lastName = this.page.getByTestId("last-name");
    this.dateOfBirth = this.page.getByTestId("dob");
    this.sex = this.page.locator("[data-testid=sex]");
    this.clearButton = this.page.getByRole("button", { name: "Clear" });
    this.createButton = this.page.getByRole("button", { name: "Create" });
    this.checkButton = this.page.getByRole("button", { name: "Check" });
    this.selectedDate = this.page.locator("[class*='selected']");
    this.errorAlert = this.page
      .getByTestId("create-patient-form")
      .getByRole("alert");
    this.totalItems = this.page.getByText("item(s)");
    this.recordsPerPage = this.page.locator(
      "(//li[@title='Next Page'])/following-sibling::li[1]"
    );
    this.pageNumberCount = this.page.locator(
      "(//li[@title='Next Page'])/preceding-sibling::li[1]"
    );
    this.sideMenu = this.page.getByTestId("pin-menu");
    this.nextPage = this.page.locator("(//li[@title='Next Page'])");
    this.patientTable = this.page.locator(
      "(//*[@class='ant-table-content'])/table"
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
    this.firstNameCharacterLimitValue =
      "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
    this.middleNameCharacterLimitValue =
      "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
    this.lastNameCharacterLimitValue =
      "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz";
    this.noDataAvailable = this.page.getByText(
      "Looks like we don’t have any patients that match."
    );
    this.sexDropdown = ["Male", "Female", "Other", "Choose not to answer"];
    this.diseaseType = this.page.getByTestId("disease-type");
    this.diseaseTypeOption = this.page.locator(
      "[data-testid='disease-type'] label"
    );
    this.diseaseTypeDropdown = ["Cancer", "Organ Failure"];
    this.affectedOrgan = this.page.locator("[data-testid='affected-organ']");
    this.affectedOrganCancerDropdown = [
      "Breast",
      "Colon",
      "Lung",
      "Liver",
      "Pancreas",
      "Gallbladder",
      "Stomach",
      "Cervical",
      "Ovarian",
      "Uterine",
      "Prostate",
      "Thyroid",
      "Melanoma",
      "Biliary",
      "Duodenal",
    ];
    this.affectedOrganOrganFailureDropdown = [
      "Kidney",
      "Liver",
      "Pancreas",
      "Heart",
      "Lung",
    ];
    this.activePageNumber = this.page.locator(
      "[class*='ant-pagination-item-active']"
    );
    this.radioButton = this.page.locator("[class*='ant-radio']");
    this.patientTableColumnNames = ["PATIENT ID", "NAME", "DOB", "MATCH SCORE"];
    this.possibleMatchesHelpText = this.page.getByText(
      "Enter the above details and press “Check”."
    );
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

  async enterLastNameProvided(lastName: string) {
    await this.lastName.fill(lastName);
  }

  async enterFirstNameProvided(firstName: string) {
    await this.firstName.fill(firstName);
  }

  async enterMiddleNameProvided(middleName: string) {
    await this.middleName.fill(middleName);
  }

  async enterDOBProvided(DOB: string) {
    await this.dateOfBirth.click();
    await this.dateOfBirth.fill(DOB);
    await this.selectedDate.click();
  }

  async selectDateOfBirth() {
    await this.dateOfBirth.click();
    await this.dateOfBirth.fill(this.randomDateOfBirth);
    await this.selectedDate.click();
  }

  async clickOnCheckButton() {
    await this.checkButton.click();
  }

  async clickOnCreateButton() {
    await this.createButton.click();
  }
  async waitTillCreateButtonEnabled() {
    await this.createButton.waitFor();
    if ((await this.patientTable.count()).toString() == "1") {
      await expect(
        this.createButton,
        "Create button is not disabled"
      ).toBeDisabled();
      await this.page.waitForTimeout(10000);
    }
  }

  async validateSuccessfulCreation() {
    await this.validateNameSearchResult(this.randomFirstName);
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
  }

  async enterDataIntoMandatoryFields() {
    await this.enterFirstName();
    await this.enterLastName();
    await this.selectDateOfBirth();
    await this.selectDiseaseType();
    await this.selectSexValue();
  }

  async enterDataIntoOptionalFields() {
    await this.enterMiddleName();
  }

  async validateEmptyMandatoryFieldsErrorMessages() {
    await this.errorAlert.first().waitFor();
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
    ).toHaveText("DOB is required");
    expect(
      this.errorAlert.nth(3),
      "Sex required error message is incorrect"
    ).toHaveText("Sex is required");
    expect(
      this.errorAlert.nth(4),
      "Disease required error message is incorrect"
    ).toHaveText("Disease type is required");
    expect(
      this.errorAlert.nth(5),
      "Affected Organ required error message is incorrect"
    ).toHaveText("Affected Organ is required");
  }

  async validatePagination() {
    if (await this.validatePatientRecordsAvailable()) {
      await this.page.waitForTimeout(2000);
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
        let actualPageCount = (
          await this.pageNumberCount.innerText()
        ).toString();
        expect(expectedPageCount.toString(), "Page count is incorrect").toEqual(
          actualPageCount
        );
      }
    } else {
      console.log("No patient records available");
    }
  }

  async validatePatientRecordsAvailable() {
    await this.page.waitForTimeout(2000);
    if (await this.createButton.isDisabled()) {
      return true;
    } else {
      return false;
    }
  }

  async validateDefaultSort() {
    if (await this.validatePatientRecordsAvailable()) {
      let rank: string[] = [];
      let pageCount = await this.pageNumberCount.innerText();
      for (let count = Number(pageCount); count > 0; count = count - 1) {
        let tableData = await this.patientTable.innerText();
        let allRecordsArray = tableData.split("\n");
        allRecordsArray.splice(0, 1);
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
    } else {
      console.log("No patient records available");
    }
  }

  async enterCharacterLimitDataInFirstName() {
    await this.firstName.fill(this.firstNameCharacterLimitValue);
  }

  async enterCharacterLimitDataInMiddleName() {
    await this.firstName.fill(this.middleNameCharacterLimitValue);
  }

  async enterCharacterLimitDataInLastName() {
    await this.firstName.fill(this.lastNameCharacterLimitValue);
  }

  async validateErrorOnMaximumCharacter() {
    await this.errorAlert.waitFor();
    expect(
      (await this.errorAlert.first().innerText()).toString(),
      "Error message for maximum 64 characters is incorrect"
    ).toEqual("Maximum 64 characters allowed.");
  }

  async validateInvalidSSN() {
    await this.errorAlert.waitFor();
    expect(
      (await this.errorAlert.first().innerText()).toString(),
      "Error message for invalid SSN is incorrect"
    ).toEqual("Enter a valid SSN");
  }

  async validateCreatePatientPage() {
    await expect(
      this.firstName,
      "Create patient form not visible"
    ).toBeVisible();
  }

  async validateClearButtonEnabled() {
    await expect(this.clearButton, "Clear button is not enabled").toBeEnabled();
  }

  async validateFutureDateDisabled(date: string) {
    await this.dateOfBirth.click();
    await this.dateOfBirth.fill(date);
    await expect(this.selectedDate, "Future date is enabled").toHaveCount(0);
  }

  async validateNameSearchResult(value: string) {
    if (await this.validatePatientRecordsAvailable()) {
      let pageCount = await this.pageNumberCount.innerText();
      for (let count = Number(pageCount); count > 0; count = count - 1) {
        let tableData = await this.patientTable.innerText();
        let allRecordsArray = tableData.split("\n");
        allRecordsArray.splice(0, 1);
        for (const element of allRecordsArray) {
          let removeMRN = element.substring(9);
          let name = removeMRN.substring(0, removeMRN.indexOf("\t"));
          expect(
            name.toLowerCase(),
            "Name search result is incorrect"
          ).toContain(value);
        }
        await this.nextPage.click();
        await this.page.waitForTimeout(2000);
      }
    } else {
      console.log("No patient records available");
    }
  }

  async validateDOBSearchResult(dateOfBirth: string) {
    if (await this.validatePatientRecordsAvailable()) {
      let pageCount = await this.pageNumberCount.innerText();
      let expectedDateOfBirth = dateOfBirth.split("/");
      let date = expectedDateOfBirth[0];
      let month = expectedDateOfBirth[1];
      let year = expectedDateOfBirth[2];
      let expectedDateOfBirthArray = [
        date,
        month,
        year.substring(0, 2),
        year.substring(2),
      ];
      let result;
      for (let count = Number(pageCount); count > 0; count = count - 1) {
        let tableData = await this.patientTable.innerText();
        let allRecordsArray = tableData.split("\n");
        allRecordsArray.splice(0, 1);
        for (const element of allRecordsArray) {
          let removeRank = element.substring(0, element.lastIndexOf("\t"));
          let dateOfBirth = removeRank.substring(removeRank.lastIndexOf("\t"));
          let actualDateOfBirth = dateOfBirth.trim().split("/");
          let yearStartValue = actualDateOfBirth[2].substring(0, 2);
          actualDateOfBirth.push(actualDateOfBirth[2].substring(2));
          actualDateOfBirth[2] = yearStartValue;
          expectedDateOfBirthArray.forEach((element) => {
            if (actualDateOfBirth.includes(element)) {
              result = true;
            }
          });
          expect(result).toBeTruthy();
          result = false;
        }
        await this.nextPage.click();
        await this.page.waitForTimeout(2000);
      }
    } else {
      console.log("No patient records available");
    }
  }

  async selectSexValue() {
    let randomSexValue = this.sexDropdown[randomInt(0, 3)];
    await this.sex.click();
    await this.page.click("[title=" + randomSexValue + "]");
  }

  async selectSexValueProvided(value: string) {
    await this.sex.click();
    await this.page.click("[title=" + value + "]");
  }

  async selectDiseaseType() {
    let randomDiseaseTypeValue = this.diseaseTypeDropdown[randomInt(0, 1)];
    await this.page
      .getByLabel(randomDiseaseTypeValue)
      .and(this.page.getByRole("radio"))
      .click();
    await this.selectAffectedOrganBasedOnDiseaseType(randomDiseaseTypeValue);
  }

  async selectDiseaseTypeProvided(disease: string) {
    await this.page
      .getByLabel(disease)
      .and(this.page.getByRole("radio"))
      .click();
  }

  async selectAffectedOrganBasedOnDiseaseType(randomDiseaseTypeValue: string) {
    let randomAffectedOrganValue;
    if (randomDiseaseTypeValue == "Cancer") {
      randomAffectedOrganValue =
        this.affectedOrganCancerDropdown[
          randomInt(0, this.affectedOrganCancerDropdown.length - 1)
        ];
    } else if (randomDiseaseTypeValue == "Organ Failure") {
      randomAffectedOrganValue =
        this.affectedOrganOrganFailureDropdown[
          randomInt(0, this.affectedOrganOrganFailureDropdown.length - 1)
        ];
    }
    await this.selectAffectedOrganProvided(randomAffectedOrganValue);
  }

  async selectAffectedOrganProvided(value: string) {
    let textOfAffectedOrgan = await this.affectedOrgan.innerText();
    while (textOfAffectedOrgan.toString() !== value) {
      await this.affectedOrgan.click();
      await this.affectedOrgan.press("ArrowDown");
      await this.affectedOrgan.press("Enter");
      textOfAffectedOrgan = await this.page
        .locator(
          "[data-testid='affected-organ'] span[class='ant-select-selection-item']"
        )
        .innerText();
    }
  }

  async validateNoDataFound() {
    await this.noDataAvailable.waitFor();
    expect(
      await this.noDataAvailable,
      "No data text is not visible"
    ).toBeVisible();
  }

  async validateCheckButtonDisplayed() {
    await expect(this.checkButton, "Check button is not visible").toHaveText(
      "Check"
    );
  }

  async validateSamePatientRank() {
    let tableData = await this.patientTable.innerText();
    let allRecordsArray = tableData.split("\n");
    allRecordsArray.splice(0, 1);
    let rank = allRecordsArray[0]
      .substring(allRecordsArray[0].lastIndexOf("\t"))
      .trim();
    expect(rank, "Rank is not 1 for exact match patient").toEqual("1");
  }

  async clickOnNextButton() {
    await this.nextPage.click();
  }

  async validateFirstPageIsActive() {
    let activePageNumberValue = await this.activePageNumber.innerText();
    expect(activePageNumberValue, "First page is not active").toBe("1");
  }

  async clearDOB() {
    await this.page
      .locator("(//*[@data-testid='dob'])/parent::div//span[2]")
      .click();
  }

  async validateTotalItemsIsVisible() {
    if (await this.validatePatientRecordsAvailable()) {
      expect(this.totalItems, "Total items are not visible").toBeVisible();
    } else {
      console.log("No patient records available");
    }
  }

  async validateUIFields() {
    await expect(this.firstName, "First name is not visible").toBeVisible();
    await expect(this.middleName, "Middle name is not visible").toBeVisible();
    await expect(this.lastName, "Last name is not visible").toBeVisible();
    await expect(this.dateOfBirth, "DOB is not visible").toBeVisible();
    await expect(this.sex, "Sex is not visible").toBeVisible();
    await expect(this.diseaseType, "Disease type is not visible").toBeVisible();
    await expect(
      this.affectedOrgan,
      "Affected organ is not visible"
    ).toBeVisible();
  }

  async validateMandatoryMark() {
    await this.mandatoryMark.first().waitFor();
    let expectedListOfMandatoryFields = [
      "First Name",
      "Last Name",
      "DOB",
      "Sex",
      "Disease Type",
      "Affected Organ",
    ];
    let actualListOfMandatoryFields = await this.page
      .locator("[class='ant-form-item-required']")
      .allTextContents();
    expect(
      actualListOfMandatoryFields,
      "List of mandatory fields are incorrect"
    ).toStrictEqual(expectedListOfMandatoryFields);
  }

  async validateDateFormat(expectedDate: string) {
    expect(this.dateOfBirth, "DOB format is not MM/DD/YYYY").toHaveAttribute(
      "title",
      expectedDate
    );
  }

  async verifyDiseaseTypeLabel() {
    let diseaseType = this.page.locator("[title='Disease Type']");
    await expect(diseaseType, "Disease Type label is incorrect").toHaveText(
      "Disease Type"
    );
  }

  async verifyDiseaseTypeOptions() {
    for (let i = 0; i < this.diseaseTypeDropdown.length; i++) {
      await expect(this.diseaseTypeOption.nth(i)).toHaveText(
        this.diseaseTypeDropdown[i]
      );
    }
  }

  async verifyDiseaseTypeIsRadio() {
    await expect(this.radioButton.first()).toHaveAttribute(
      "data-testid",
      "disease-type"
    );
  }

  async verifyAffectedOrganLabel() {
    let affectedOrgan = this.page.locator("[title='Affected Organ']");
    await expect(affectedOrgan, "Affected Organ label is incorrect").toHaveText(
      "Affected Organ"
    );
  }

  async validateAffectedOrganValuesForCancer() {
    let affectedOrganValuesForCancer = [""];
    await this.affectedOrgan.click();
    await this.affectedOrgan.press("Enter");
    affectedOrganValuesForCancer.push(
      await this.page
        .locator(
          "[data-testid='affected-organ'] span[class='ant-select-selection-item']"
        )
        .innerText()
    );
    for (let i = 0; i < this.affectedOrganCancerDropdown.length - 1; i++) {
      await this.affectedOrgan.click();
      await this.affectedOrgan.press("ArrowDown");
      await this.affectedOrgan.press("Enter");
      affectedOrganValuesForCancer.push(
        await this.page
          .locator(
            "[data-testid='affected-organ'] span[class='ant-select-selection-item']"
          )
          .innerText()
      );
    }
    affectedOrganValuesForCancer.shift();
    expect(
      affectedOrganValuesForCancer,
      "List of affected organ values for Cancer is incorrect"
    ).toEqual(this.affectedOrganCancerDropdown);
  }

  async validateAffectedOrganValuesForOrganFailure() {
    let affectedOrganValuesForOrganFailure = [""];
    await this.affectedOrgan.click();
    await this.affectedOrgan.press("Enter");
    affectedOrganValuesForOrganFailure.push(
      await this.page
        .locator(
          "[data-testid='affected-organ'] span[class='ant-select-selection-item']"
        )
        .innerText()
    );
    for (
      let i = 0;
      i < this.affectedOrganOrganFailureDropdown.length - 1;
      i++
    ) {
      await this.affectedOrgan.click();
      await this.affectedOrgan.press("ArrowDown");
      await this.affectedOrgan.press("Enter");
      affectedOrganValuesForOrganFailure.push(
        await this.page
          .locator(
            "[data-testid='affected-organ'] span[class='ant-select-selection-item']"
          )
          .innerText()
      );
    }
    affectedOrganValuesForOrganFailure.shift();
    expect(
      affectedOrganValuesForOrganFailure,
      "List of affected organ values for Organ Failure is incorrect"
    ).toEqual(this.affectedOrganOrganFailureDropdown);
  }

  async validateAffectedOrganResets() {
    expect(
      await this.affectedOrgan.innerText(),
      "Affected Organ value does not reset"
    ).toEqual("Select");
  }

  async validateCreateButtonIsDisabled() {
    expect(
      await this.createButton.isDisabled(),
      "Create Button is not disabled"
    ).toBeTruthy();
  }

  async validateColumnsOfPossibleMatchesTable() {
    if (await this.validatePatientRecordsAvailable()) {
      let tableData = await this.patientTable.innerText();
      let allRecordsArray = tableData.split("\n");
      let columnNamesArray = allRecordsArray[0].split("\t");
      expect(
        this.patientTableColumnNames,
        "Possible matches table columns are not as expected"
      ).toEqual(columnNamesArray);
    } else {
      console.log("No patient records available");
    }
  }

  async validateBackgroundColorOfClearButton() {
    await this.clearButton.waitFor();
    expect(this.clearButton).toHaveCSS(
      "background-color",
      "rgb(255, 255, 255)"
    );
  }

  async validateBackgroundColorOfDisabledCheckButton() {
    await this.checkButton.waitFor();
    expect(this.checkButton).toHaveCSS(
      "background-color",
      "rgba(0, 0, 0, 0.04)"
    );
  }

  async validateBackgroundColorOfCheckButton() {
    await this.checkButton.waitFor();
    expect(await this.checkButton.isEnabled()).toBeTruthy();
    await this.page.waitForTimeout(2000);
    expect(this.checkButton).toHaveCSS("background-color", "rgb(47, 84, 235)");
  }

  async validateBackgroundColorOfDisabledCreateButton() {
    await this.createButton.waitFor();
    expect(this.createButton).toHaveCSS(
      "background-color",
      "rgba(0, 0, 0, 0.04)"
    );
  }

  async validatePatientIDFormat() {
    if (await this.validatePatientRecordsAvailable()) {
      let tableData = await this.patientTable.innerText();
      let allRecordsArray = tableData.split("\n");
      allRecordsArray.splice(0, 1);
      let regularExpression = "^[0-9]{8}$";
      for (const element of allRecordsArray) {
        let patientId = element.substring(0, element.indexOf("\t"));
        expect(patientId, "Patient ID is not an 8 digit number").toEqual(
          expect.stringMatching(regularExpression)
        );
      }
    } else {
      console.log("No patient records available");
    }
  }

  async validateNameFormat() {
    if (await this.validatePatientRecordsAvailable()) {
      let tableData = await this.patientTable.innerText();
      let allRecordsArray = tableData.split("\n");
      allRecordsArray.splice(0, 1);
      let expectedName =
        this.randomLastName +
        ", " +
        this.randomFirstName +
        " " +
        this.randomMiddleName[0];
      let removeMRN = allRecordsArray[0].substring(9);
      let name = removeMRN.substring(0, removeMRN.indexOf("\t"));
      expect(name, "Name format is not as expected").toEqual(
        expect.stringMatching(expectedName)
      );
    } else {
      console.log("No patient records available");
    }
  }

  async validateDOBFormat() {
    if (await this.validatePatientRecordsAvailable()) {
      let listOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      let flag = true;
      let pageCount = await this.pageNumberCount.innerText();
      for (let count = Number(pageCount); count > 0; count = count - 1) {
        let tableData = await this.patientTable.innerText();
        let allRecordsArray = tableData.split("\n");
        allRecordsArray.splice(0, 1);
        for (const element of allRecordsArray) {
          let removeRank = element.substring(0, element.lastIndexOf("\t"));
          let dateOfBirth = removeRank.substring(removeRank.lastIndexOf("\t"));
          let dateOfBirthArray = dateOfBirth.split("/");
          let month = parseInt(dateOfBirthArray[0]);
          let day = parseInt(dateOfBirthArray[1]);
          let year = parseInt(dateOfBirthArray[2]);
          if (month != 2) {
            if (day > listOfDays[month - 1]) {
              flag = false;
            }
            if (month > 12) {
              flag = false;
            }
          } else if (month == 2) {
            let leapYear = false;
            if ((!(year % 4) && year % 100) || !(year % 400)) {
              leapYear = true;
            }
            if (leapYear == false && day >= 29) {
              flag = false;
            } else if (leapYear == true && day > 29) {
              flag = false;
            }
          }
        }
        expect(flag, "DOB format is not MM/DD/YYYY").toBeTruthy();
        await this.nextPage.click();
        await this.page.waitForTimeout(2000);
      }
    } else {
      console.log("No patient records available");
    }
  }

  async validateCreateButtonIsEnabled() {
    expect(
      await this.createButton.isEnabled(),
      "Create button is not enabled"
    ).toBeTruthy();
  }

  async validateRankMoreThanThreshold() {
    if (await this.validatePatientRecordsAvailable()) {
      let pageCount = await this.pageNumberCount.innerText();
      for (let count = Number(pageCount); count > 0; count = count - 1) {
        let tableData = await this.patientTable.innerText();
        let allRecordsArray = tableData.split("\n");
        allRecordsArray.splice(0, 1);
        for (const element of allRecordsArray) {
          let indexForMatchScore = element.lastIndexOf("\t");
          let rank = element.substring(indexForMatchScore + 1);
          console.log(rank);
          expect(
            parseFloat(rank),
            "Match score is less than 0.1"
          ).toBeGreaterThanOrEqual(0.4);
        }
        await this.nextPage.click();
        await this.page.waitForTimeout(2000);
      }
    } else {
      console.log("No patient records available");
    }
  }

  async validatePossibleMatchesHelpTextDisplayed() {
    await this.possibleMatchesHelpText.waitFor();
    expect(
      await this.possibleMatchesHelpText.isVisible(),
      "Possible matches help text is not displayed"
    ).toBeTruthy();
  }

  async validateNoMandatoryMark() {
    let actualListOfMandatoryFields = await this.page
      .locator("[class='ant-form-item-required']")
      .allTextContents();
    expect(
      actualListOfMandatoryFields.length,
      "Mandatory mark is present on few field(s)"
    ).toEqual(0);
  }

  async changeAndValidateActivePage() {
    if (await this.validatePatientRecordsAvailable()) {
      await this.nextPage.waitFor();
      if (!this.nextPage.isEnabled()) {
        console.log("Result contains only one page");
      } else {
        let activePageNumberValue = await this.activePageNumber.innerText();
        expect(activePageNumberValue, "First page is not active").toBe("1");
        await this.nextPage.click();
        await this.page.waitForTimeout(2000);
        activePageNumberValue = await this.activePageNumber.innerText();
        expect(activePageNumberValue, "First page is not active").toBe("2");
      }
    } else {
      console.log("No patient records available");
    }
  }
}
