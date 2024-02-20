import { Locator, Page, expect } from "@playwright/test";

export class PatientMaster {
  readonly page: Page;
  readonly createButton: Locator;
  readonly closePatientMaster: Locator;
  readonly searchField: Locator;
  readonly table: Locator;
  readonly heading: Locator;
  readonly search: Locator;
  readonly sear_result: Locator;
  search_key_recieved: string;
  readonly filter: Locator;
  readonly criteria_dropdown: Locator;
  readonly select_dropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createButton = this.page.getByRole("button", { name: "Create" });
    this.closePatientMaster = this.page.getByLabel("remove");
    this.searchField = this.page.getByTestId("search-filter-input");
    this.table = this.page.locator(
      "(//*[@class='table-wrapper'])/div/div/div/div/div/div/table"
    );
    this.heading = this.page.getByText("Patient Master");
    this.search = this.page.locator("//*[@data-testid='search-filter-input']");
    this.sear_result = this.page.locator(
      "//tbody[@class ='ant-table-tbody']/child::tr/td[2]"
    );
    // this.search_key = "James";
    this.filter = this.page.locator("//*[@data-testid='down-arrow']");
    this.criteria_dropdown = this.page.locator(
      "//*[@data-testid='criteria-dropdown']"
    );
    this.select_dropdown = this.page.locator(
      "//div[@data-testid='criteria-value-dropdown']"
    );
  }

  async clickOnCreateButton() {
    await this.createButton.click();
  }
  async validateCreatedPatient(text: string) {
    await this.searchField.fill(text);
    await this.page.waitForTimeout(3000);
    let tableData = await this.table.innerText();
    expect(tableData).toContain(text);
  }

  async search_enter(search_key) {
    this.search_key_recieved = search_key;
    await this.search.fill(this.search_key_recieved);
    await this.page.waitForTimeout(10000);
  }

  async verify_search_result() {
    let text = await this.sear_result.innerText();
    await expect(text).toEqual(
      expect.stringContaining(this.search_key_recieved)
    );
  }

  async click_on_filters() {
    await this.filter.click();
  }

  async click_on_criteria_dropdown() {
    await this.criteria_dropdown.click();
  }

  async verify_criteria_dropdown() {
    let dropdown_expected = [
      "DOB",
      "Disease",
      "Organ",
      "Phase",
      "Navigator",
      "Status",
    ];
    for (let i = 1; i < 7; i++) {
      let current_text = await this.page
        .locator("//div[@title='DOB']/parent::div/div" + "[" + i + "]")
        .textContent();
      console.log(current_text);
      console.log(dropdown_expected[i - 1]);
      expect(current_text).toEqual(dropdown_expected[i - 1]);
    }
  }

  async verify_no_data_found() {
    await this.page.getByText("No patients found").isVisible();
  }

  async select_criteria_dropdown(criteria) {
    await this.page.getByText(criteria, { exact: true }).click();
  }

  async click_on_select_dropdown() {
    await this.select_dropdown.click();
  }
  async verify_disease_values() {
    let disease_drop_down_values = ["Cancer", "Organ Failure"];

    for (let i = 1; i <= disease_drop_down_values.length; i++) {
      let current_values = await this.page
        .locator("//div[@title = 'Cancer']/parent::div/div" + "[" + i + "]")
        .textContent();
      expect(current_values).toEqual(disease_drop_down_values[i - 1]);
    }
  }

  async verify_organ_values() {
    let organ_drop_down_values = [
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

    for (let i = 1; i <= organ_drop_down_values.length; i++) {
      let current_values = await this.page
        .locator("//div[@title = 'Kidney']/parent::div/div" + "[" + i + "]")
        .textContent();
      expect(current_values).toEqual(organ_drop_down_values[i - 1]);
      await this.page.keyboard.press("ArrowDown");
      // await this.page.keyboardpress("Enter");
    }
  }
}
