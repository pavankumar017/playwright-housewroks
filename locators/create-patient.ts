import { Locator, Page } from "@playwright/test";

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

  constructor(page: Page) {
    this.page = page;
    this.firstName = this.page.getByLabel("First Name");
    this.middleName = this.page.getByLabel("Middle Name");
    this.lastName = this.page.getByLabel("Last Name");
    this.dateOfBirth = this.page.getByLabel("Date Of Birth");
    this.sex = this.page.getByLabel("Sex");
    this.clearButton = this.page.getByRole("button", { name: "Clear" });
    this.checkButton = this.page.getByTestId("add-patient-check-button");
    this.selectedDate = this.page.locator("[class*=cell-selected]");
  }
  async enterFirstName(inputFirstName: string) {
    await this.firstName.fill(inputFirstName);
  }
  async enterMiddleName(inputMiddleName: string) {
    await this.middleName.fill(inputMiddleName);
  }
  async enterLastName(inputLastName: string) {
    await this.lastName.fill(inputLastName);
  }
  async selectDateOfBirth(inputDateOfBirth: string) {
    await this.dateOfBirth.fill(inputDateOfBirth);
    await this.selectedDate.click();
  }
  async clickOnCheckButton() {
    await this.checkButton.click();
  }
}
