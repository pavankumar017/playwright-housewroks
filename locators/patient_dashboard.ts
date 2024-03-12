import { Locator, Page, expect } from "@playwright/test";

export class PatientDashboard {
  readonly page: Page;
  readonly dashboardTabTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardTabTitle = this.page.getByText("Dashboard");
  }

  async validatePatientDashboardPage() {
    await this.dashboardTabTitle.waitFor();
    expect(
      await this.dashboardTabTitle.isVisible(),
      "Patient Dashboard is not displayed"
    ).toBeTruthy();
  }
}
