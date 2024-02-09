import { Locator, Page, expect } from "@playwright/test";

export class PatientMaster {
  readonly page: Page;
  readonly createButton: Locator;
  readonly closePatientMaster: Locator;
  readonly heading: Locator;
  readonly search: Locator;
  readonly sear_result: Locator;
  readonly search_key: string;
  readonly filter: Locator;
  readonly criteria_dropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createButton = this.page.getByRole("button", { name: "Create" });
    this.closePatientMaster = this.page.getByLabel("remove");
    this.heading = this.page.getByText("Patient Master");
    this.search = this.page.locator("//*[@data-testid='search-filter-input']");
    this.sear_result = this.page.locator(
      "//tbody[@class ='ant-table-tbody']/child::tr/td[2]"
    );
    this.search_key = "James";
    this.filter = this.page.locator("//*[@data-testid='down-arrow']");
    this.criteria_dropdown = this.page.locator(
      "//*[@data-testid='criteria-dropdown']"
    );
  }

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async search_enter() {
    await this.search.fill(this.search_key);
    await this.page.waitForTimeout(10000);
  }

  async verify_search_result() {
    let text = await this.sear_result.innerText();
    await expect(text).toEqual(expect.stringContaining(this.search_key));
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
        .allTextContents();
      expect(current_text).toEqual(dropdown_expected[i]);
    }
  }
}
