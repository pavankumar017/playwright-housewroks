import { Locator, Page } from "@playwright/test";

export class PatientMaster {
  readonly page: Page;
  readonly createButton: Locator;
  readonly closePatientMaster: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createButton = this.page.getByRole("button", { name: "Create" });
    this.closePatientMaster = this.page.getByLabel("remove");
  }

  async clickOnCreateButton() {
    await this.createButton.click();
  }
  async closePatientMasterTab() {
    await this.closePatientMaster.first().click();
  }
}
