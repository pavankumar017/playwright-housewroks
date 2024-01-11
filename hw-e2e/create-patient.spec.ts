import { test } from "@playwright/test";
import { CreatePatient } from "../locators/create-patient";
import { PatientMaster } from "../locators/patient-master";
import { SideMenu } from "../locators/side-menu";

test("User should be able to create patient", async ({ page, baseURL }) => {
  test.setTimeout(100000);
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterFirstName();
  await createPatient.enterMiddleName();
  await createPatient.enterLastName();
  await createPatient.selectDateOfBirth();
  await createPatient.clickOnCheckButton();
  await createPatient.waitTillCreateButtonOnDisplayed();
  await createPatient.clickOnCreateButton();
});

test.skip("User should be able to clear data from all the fields", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterFirstName();
  await createPatient.enterMiddleName();
  await createPatient.enterLastName();
  await createPatient.selectDateOfBirth();
  await createPatient.clickOnClearButton();
  await createPatient.validateCheckButtonDisabled();
  await createPatient.validateAllFieldsAreEmpty();
});

test("User should get error message for mandatory fields", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterDataIntoOptionalFields();
  await createPatient.clickOnCheckButton();
  await createPatient.clickOnCreateButton();
  await createPatient.validateEmptyMandatoryFieldsErrorMessages();
});

test.skip("User should be able to use the pagination", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  const sideMenu = new SideMenu(page);
  await sideMenu.openCreateFromSideMenu();
  await createPatient.enterDataIntoMandatoryFields();
  await createPatient.clickOnCheckButton();
  await createPatient.validatePagination();
});

test.skip("User should get search result with relevant patients record at top before creating", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  const sideMenu = new SideMenu(page);
  await sideMenu.openCreateFromSideMenu();
  await createPatient.enterDataIntoMandatoryFields();
  await createPatient.clickOnCheckButton();
  await createPatient.validateDefaultSort();
});

test("User should get error message on entering more than 64 character on first name", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterCharacterLimitDataInFirstName();
  await createPatient.validateErrorOnMaximumCharacter();
});

test("User should get error message on entering more than 64 character on middle name", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterCharacterLimitDataInMiddleName();
  await createPatient.validateErrorOnMaximumCharacter();
});

test("User should get error message on entering more than 64 character on last name", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterCharacterLimitDataInLastName();
  await createPatient.validateErrorOnMaximumCharacter();
});

test("User should be able to open create patient from side menu", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openCreateFromSideMenu();
  const createPatient = new CreatePatient(page);
  await createPatient.validateCreatePatientPage();
});
