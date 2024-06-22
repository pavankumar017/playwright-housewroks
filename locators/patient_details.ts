import { Locator, Page, expect } from "@playwright/test";

export class PatientDetails {
  readonly page: Page;
  readonly detailsTabTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.detailsTabTitle = this.page.getByText("Details");
  }

  async validatePatientDetailsPage() {
    await this.detailsTabTitle.waitFor();
    expect(
      await this.detailsTabTitle.isVisible(),
      "Patient Details is not displayed"
    ).toBeTruthy();
  }
}
