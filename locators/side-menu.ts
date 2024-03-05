import { Locator, Page, expect } from "@playwright/test";

export class SideMenu {
  readonly page: Page;
  readonly patient: Locator;
  readonly createPatient: Locator;
  readonly patientMaster: Locator;
  readonly patientsSideMenu: Locator;

  constructor(page: Page) {
    this.page = page;
    this.patient = this.page.getByTestId("patients-menu-icon");
    this.createPatient = this.page.locator("[href='/patients/add']");
    this.patientMaster = this.page.locator("[href='/patients']");
    this.patientsSideMenu = this.page.getByText("PATIENTS");
  }

  async openCreateFromSideMenu() {
    await this.patient.hover();
    await this.createPatient.click();
  }

  async validateCreatePatientDisplayedUnderPatients() {
    await this.patient.hover();
    await this.createPatient.waitFor();
    expect(
      await this.createPatient.isVisible(),
      "Create Patient menu is not visible"
    ).toBeTruthy();
  }

  async validateSideMenuPatientsTitle() {
    await this.patientsSideMenu.waitFor();
    expect(
      await this.patientsSideMenu.isVisible(),
      "Title for patients side menu is incorrect"
    ).toBeTruthy();
  }
}
