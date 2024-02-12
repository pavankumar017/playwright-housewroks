import { Locator, Page, expect } from "@playwright/test";

export class PatientMaster {
  readonly page: Page;
  readonly createButton: Locator;
  readonly closePatientMaster: Locator;
  readonly searchField: Locator;
  readonly table: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createButton = this.page.getByRole("button", { name: "Create" });
    this.closePatientMaster = this.page.getByLabel("remove");
    this.searchField = this.page.getByTestId("search-filter-input");
    this.table = this.page.locator(
      "(//*[@class='table-wrapper'])/div/div/div/div/div/div/table"
    );
  }

  async searchWithProvidedText(text: string) {
    await this.searchField.fill(text);
  }

  async validateCreatedPatient(text: string) {
    await this.searchField.fill(text);
    await this.page.waitForTimeout(3000);
    let tableData = await this.table.innerText();
    expect(tableData).toContain(text);
  }

  async clickOnCreateButton() {
    await this.createButton.click();
  }
}
