import { Locator, Page } from "@playwright/test";
import { randomInt } from "crypto";
import { names, uniqueNamesGenerator } from "unique-names-generator";

export class Users {
  readonly page: Page;
  readonly createButton: Locator;
  readonly firstName: Locator;
  readonly randomFirstName: string;
  readonly randomLastName: string;
  readonly lastName: Locator;
  readonly sex: Locator;
  readonly sexDropdown: string[];
  readonly randomDateOfBirth: string;
  readonly autogenerateUsername: Locator;
  readonly email: Locator;
  readonly userType: Locator;
  readonly userTypeInput: Locator;
  readonly userTypeDropdown: string[];

  constructor(page: Page) {
    this.page = page;
    this.createButton = this.page.getByTestId("create-user-button");
    this.firstName = this.page.getByLabel("First Name");
    this.randomFirstName = uniqueNamesGenerator({
      dictionaries: [names],
    });
    this.randomLastName = uniqueNamesGenerator({
      dictionaries: [names],
    });
    this.lastName = this.page.getByTestId("last-name");
    this.sex = this.page.getByLabel("Sex");
    this.sexDropdown = ["Male", "Female", "Other", "Choose not to answer"];
    this.randomDateOfBirth = this.formatDate(
      new Date(
        new Date(1111, 0, 1).getTime() +
          Math.random() *
            (new Date().getTime() - new Date(1111, 0, 1).getTime())
      )
    ).toString();
    this.autogenerateUsername = this.page.getByRole("button", {
      name: "Auto Generate",
    });
    this.email = this.page.getByTestId("email");
    this.userType = this.page.getByLabel("User Type");
    this.userTypeDropdown = [
      "Doctor",
      "Physician Assistant",
      "Navigator",
      "Nurse",
      "Office Assistant",
      "Quality Coordinator",
      "Director",
      "Other",
      "Navigator Coordinator",
      "Navigator Assistant",
    ];
    this.userTypeInput = this.page.locator(
      "[data-testid='user-type-select'] input"
    );
  }

  formatDate = (date: Date) => {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(date);
    return [pad(d.getMonth() + 1), pad(d.getDate()), d.getFullYear()].join("/");
  };

  async randomDropdownSelection(dropdown: string[]) {
    return dropdown[randomInt(0, dropdown.length - 1)].toString();
  }

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async enterFirstName() {
    await this.firstName.fill(this.randomFirstName);
  }

  async enterLastName() {
    await this.lastName.fill(this.randomLastName);
  }

  async selectSex() {
    await this.sex.click();
    await this.page
      .getByText(await this.randomDropdownSelection(this.sexDropdown), {
        exact: true,
      })
      .click();
  }

  async clickOnAutoGenerateUsername() {
    this.autogenerateUsername.click();
  }

  async enterEmail() {
    await this.email.fill(
      this.randomFirstName + this.randomLastName + "@gmail.com"
    );
  }

  async selectUserType() {
    let randomUserType = await this.randomDropdownSelection(
      this.userTypeDropdown
    );
    console.log(randomUserType.slice(0, randomUserType.indexOf(" ")));
    await this.userType.click();
    await this.userTypeInput.fill(randomUserType);
    await this.userType.getByTitle(randomUserType, { exact: true }).click();
  }
}

// await page.getByTitle("Nurse").click();
// await page.getByTestId("user-type-select").getByTitle("Nurse").click();
// await page.getByText("Physician Assistant").click();
// await page
//   .getByTestId("user-type-select")
//   .getByTitle("Physician Assistant")
//   .click();
// await page.getByText("Quality Coordinator").click();
// await page.locator("#rc_select_7").click();
// await page.getByText("Test permission group with").click();
// await page.getByTestId("add-access-group-button").click();
// await page.getByTestId("create-user-button").click();
// await page.goto("https://staging.rbp.houseworksinc.co/users");
// await page
//   .locator("div")
//   .filter({ hasText: "User addedSuccessfully added" })
//   .nth(2)
//   .click();
// await page.locator(".ant-notification-notice-close").click();
