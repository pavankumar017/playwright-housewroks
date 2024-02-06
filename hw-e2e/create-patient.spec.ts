import { test } from "@playwright/test";
import { CreatePatient } from "../locators/create-patient";
import { PatientMaster } from "../locators/patient-master";
import { SideMenu } from "../locators/side-menu";

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

test("User should be able to open create patient from patient master", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.validateCreatePatientPage();
});

test("Clear button should be enabled in default state", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.validateClearButtonEnabled();
});

// test("Future dates should be disabled in date of birth field", async ({
//   page,
//   baseURL,
// }) => {
//   await page.goto(`${baseURL}`);
//   const patientMaster = new PatientMaster(page);
//   await patientMaster.clickOnCreateButton();
//   const createPatient = new CreatePatient(page);
//   await createPatient.validateCreatePatientPage();
//   await createPatient.validateFutureDateDisabled();
// });

test("User should get results as per last name entered in search field", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterLastNameProvided("test");
  await createPatient.clickOnCheckButton();
  await createPatient.validateNameSearchResult("test");
});

test("User should get results as per first name entered in search field", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterFirstNameProvided("test");
  await createPatient.clickOnCheckButton();
  await createPatient.validateNameSearchResult("test");
});

test("User should get results as per DOB entered in search field", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterDOBProvided("01/02/2024");
  await createPatient.clickOnCheckButton();
  await createPatient.validateDOBSearchResult();
});

test("No data should be displayed when there are no patients available for selected Sex value", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.selectSexValue();
  await createPatient.clickOnCheckButton();
  await createPatient.validateNoDataFound();
});

test("User should be able to clear data from all the fields", async ({
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

test("User should be able to use the pagination", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  const sideMenu = new SideMenu(page);
  await sideMenu.openCreateFromSideMenu();
  await createPatient.enterFirstNameProvided("test");
  await createPatient.enterLastNameProvided("test");
  await createPatient.enterDOBProvided("01/01/2024");
  await createPatient.clickOnCheckButton();
  await createPatient.validatePagination();
});

test("User should get search result with relevant patients record at top before creating", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  const sideMenu = new SideMenu(page);
  await sideMenu.openCreateFromSideMenu();
  await createPatient.enterFirstNameProvided("patient");
  await createPatient.enterDOBProvided("01/01/2024");
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

test("User should be able to create patient", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterDataIntoMandatoryFields();
  await createPatient.enterDataIntoOptionalFields();
  await createPatient.clickOnCheckButton();
  await createPatient.waitTillCreateButtonEnabled();
  await createPatient.clickOnCreateButton();
  await createPatient.validateSuccessfulCreation();
});
