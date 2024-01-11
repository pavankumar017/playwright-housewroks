import { Locator, Page } from "@playwright/test";

export class SideMenu {
  readonly page: Page;
  readonly patient: Locator;
  readonly createPatient: Locator;
  readonly patientMaster: Locator;

  constructor(page: Page) {
    this.page = page;
    this.patient = this.page.getByTestId("patients-menu-icon");
    this.createPatient = this.page.locator("[href='/patients/add']");
    this.patientMaster = this.page.locator("[href='/patients']");
  }


  async openCreateFromSideMenu() {
    await this.patient.hover();
    await this.createPatient.click();
  }

}
