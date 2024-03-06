import { Locator, Page, expect } from "@playwright/test";

export class PatientMaster {
  readonly page: Page;
  readonly createButton: Locator;
  readonly closePatientMaster: Locator;
  readonly searchField: Locator;
  readonly table: Locator;
  readonly patientTable: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createButton = this.page.getByRole("button", { name: "Create" });
    this.closePatientMaster = this.page.getByLabel("remove");
    this.searchField = this.page.getByTestId("search-filter-input");
    this.table = this.page.locator(
      "(//*[@class='table-wrapper'])/div/div/div/div/div/div/table"
    );
    this.patientTable = this.page.locator(
      "(//*[@class='ant-table-content'])/table"
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

  async validateLatestCreatedAtTop(
    firstName: string,
    middleName: string,
    lastName: string
  ) {
    let tableData = await this.patientTable.innerText();
    let allRecordsArray = tableData.split("\n");
    allRecordsArray.splice(0, 4);
    let expectedName = lastName + ", " + firstName + " " + middleName[0];
    let firstRecord = allRecordsArray[0].split("\t");
    let name = firstRecord[1];
    expect(
      name,
      "Created patient is not displayed at the top of patient master"
    ).toEqual(expect.stringMatching(expectedName));
  }
}
