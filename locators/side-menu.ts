import { Locator, Page, expect } from "@playwright/test";

export class SideMenu {
  readonly page: Page;
  readonly patient: Locator;
  readonly createPatient: Locator;
  readonly patientMaster: Locator;
  readonly patientsSideMenu: Locator;
  readonly patientMenuIcon: Locator;

  constructor(page: Page) {
    this.page = page;
    this.patient = this.page.getByTestId("patients-menu-icon");
    this.createPatient = this.page.locator("[href='/patients/add']");
    this.patientMaster = this.page.locator("[href='/patients']");
    this.patientsSideMenu = this.page.getByText("PATIENTS");
    this.patientMenuIcon = this.page.getByTestId("patients-menu-icon");
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

  async validatePatientSideMenuIcon() {
    await this.patientMenuIcon.waitFor();
    expect(
      this.patientMenuIcon,
      "Patient menu icon is not displayed"
    ).toBeVisible();
  }

  async openPatientMaster() {
    await this.patient.hover();
    await this.patientMaster.waitFor();
    await this.patientMaster.click();
  }
}
