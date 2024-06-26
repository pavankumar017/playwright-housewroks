import { Locator, Page, expect } from "@playwright/test";

export class PatientMaster {
  readonly page: Page;
  readonly createButton: Locator;
  readonly closePatientMaster: Locator;
  readonly searchField: Locator;
  readonly table: Locator;
  readonly patientTable: Locator;
  readonly heading: Locator;
  readonly search: Locator;
  readonly searchResult: Locator;
  searchKeyRecieved: string;
  readonly filter: Locator;
  readonly criteriaDropdown: Locator;
  readonly selectDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createButton = this.page.getByRole("button", { name: "Create" });
    this.closePatientMaster = this.page.getByLabel("remove");
    this.searchField = this.page.getByTestId("search-filter-input");
    this.table = this.page.locator(
      "(//*[@class='table-wrapper'])/div/div/div/div/div/div/table"
    );
    this.patientTable = this.page.getByTestId("patient-list-table");
    this.heading = this.page.getByText("Patient Master");
    this.search = this.page.locator("//*[@data-testid='search-filter-input']");
    this.searchResult = this.page.locator(
      "//tbody[@class ='ant-table-tbody']/child::tr/td[2]"
    );
    this.filter = this.page.locator("//*[@data-testid='down-arrow']");
    this.criteriaDropdown = this.page.locator(
      "//*[@data-testid='criteria-dropdown']"
    );
    this.selectDropdown = this.page.locator(
      "//div[@data-testid='criteria-value-dropdown']"
    );
  }

  async clickOnCreateButton() {
    await this.createButton.click();
  }
  async validateCreatedPatient(text: string) {
    await this.searchField.fill(text);
    await this.searchResult.waitFor();
    let tableData = await this.table.innerText();
    expect(tableData).toContain(text);
  }

  async searchEnter(searchKey) {
    this.searchKeyRecieved = searchKey;
    await this.search.fill(this.searchKeyRecieved);
  }

  async verifySearchResult() {
    await this.searchResult.waitFor();
    let text = await this.searchResult.innerText();
    await expect(text).toEqual(expect.stringContaining(this.searchKeyRecieved));
  }

  async clickOnFilters() {
    await this.filter.click();
  }

  async clickOnCriteriaDropdown() {
    await this.criteriaDropdown.click();
  }

  async verifyCriteriaDropdown() {
    let dropdownExpected = [
      "DOB",
      "Disease",
      "Organ",
      "Phase",
      "Navigator",
      "Status",
    ];
    for (let i = 1; i < 7; i++) {
      let currentText = await this.page
        .locator("//div[@title='DOB']/parent::div/div" + "[" + i + "]")
        .textContent();
      expect(currentText).toEqual(dropdownExpected[i - 1]);
    }
  }

  async verifyNoDataFound() {
    await this.page.getByText("No patients found").isVisible();
  }

  async selectCriteriaDropdown(criteria) {
    await this.page.getByText(criteria, { exact: true }).click();
  }

  async clickOnSelectDropdown() {
    await this.selectDropdown.click();
  }
  async verifyDiseaseValues() {
    let diseaseDropDownValues = ["Cancer", "Organ Failure"];

    for (let i = 1; i <= diseaseDropDownValues.length; i++) {
      let currentValues = await this.page
        .locator("//div[@title = 'Cancer']/parent::div/div" + "[" + i + "]")
        .textContent();
      expect(currentValues).toEqual(diseaseDropDownValues[i - 1]);
    }
  }

  async verifyOrganValues() {
    let organDropDownValues = [
      "Kidney",
      "Liver",
      "Pancreas",
      "Heart",
      "Lung",
      "Breast",
      "Colon",
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

    for (let i = 1; i <= organDropDownValues.length; i++) {
      let currentValues = await this.page
        .locator("//div[@title = 'Kidney']/parent::div/div" + "[" + i + "]")
        .textContent();
      expect(currentValues).toEqual(organDropDownValues[i - 1]);
      await this.page.keyboard.press("ArrowDown");
    }
  }

  async validateLatestCreatedAtTop(
    firstName: string,
    middleName: string,
    lastName: string
  ) {
    let filteredArray: string[] = [];
    let tableData = await this.patientTable.innerText();
    let allRecordsArray = tableData.split("\n");
    filteredArray = allRecordsArray.filter(
      (element) => element.trim() !== "" && element !== "\t"
    );
    filteredArray.splice(0, 4);
    let expectedName = lastName + ", " + firstName + " " + middleName[0];
    let firstRecord = filteredArray[0].split("\t");
    let name = firstRecord[1];
    expect(
      name,
      "Created patient is not displayed at the top of patient master"
    ).toEqual(expect.stringMatching(expectedName));
  }

  async validatePatientMasterIsDisplayed() {
    await this.createButton.waitFor();
    expect(
      await this.createButton.isVisible(),
      "Patient Master is not visible"
    ).toBeTruthy();
  }
}
