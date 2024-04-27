import { Locator, Page, expect } from "@playwright/test";

export class SideMenu {
  readonly page: Page;
  readonly patient: Locator;
  readonly createPatient: Locator;
  readonly patientMaster: Locator;
  readonly patientsSideMenu: Locator;
  readonly patientMenuIcon: Locator;
  readonly administrativeSideMenu: Locator;
  readonly administrativeDocumentManager: Locator;
  readonly userManagement: Locator;
  readonly reviewMasters: Locator;

  constructor(page: Page) {
    this.page = page;
    this.patient = this.page.getByTestId("patients-menu-icon");
    this.createPatient = this.page.locator("[href='/patients/add']");
    this.patientMaster = this.page.locator("[href='/patients']");
    this.patientsSideMenu = this.page.getByText("PATIENTS");
    this.patientMenuIcon = this.page.getByTestId("patients-menu-icon");
    this.administrativeSideMenu = this.page.getByTestId(
      "administrative-menu-icon"
    );
    this.administrativeDocumentManager = this.page.getByRole("link", {
      name: "Document Manager",
    });
    this.userManagement = this.page.getByRole("link", {
      name: "User Management",
    });
    this.reviewMasters = this.page.getByRole("link", {
      name: "Review Masters",
    });
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

  async openAdministrativeDocumentManager() {
    await this.administrativeSideMenu.hover();
    await this.administrativeDocumentManager.click();
  }

  async validateOptionsUnderAdministrative() {
    await this.administrativeSideMenu.hover();
    await this.reviewMasters.waitFor();
    expect(this.userManagement).toBeVisible();
    expect(this.reviewMasters).toBeVisible();
    expect(this.administrativeDocumentManager).toBeVisible();
  }
}
