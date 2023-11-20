import { test } from "@playwright/test";
import { CreatePatient } from "../locators/create-patient";
import { PatientMaster } from "../locators/patient-master";

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

test("User should be able to clear data from all the fields", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterFirstName();
  await createPatient.enterMiddleName();
  await createPatient.enterLastName();
  await createPatient.selectDateOfBirth();
  await createPatient.enterSSN();
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
  patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterDataIntoOptionalFields();
  await createPatient.clickOnCheckButton();
  await createPatient.clickOnCreateButton();
  await createPatient.validateEmptyMandatoryFieldsErrorMessages();
});

test("User should be able to use the pagination", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  patientMaster.clickOnCreateButton();
  await patientMaster.closePatientMasterTab();
  const createPatient = new CreatePatient(page);
  await createPatient.openCreateFromSideMenu();
  await createPatient.enterDataIntoMandatoryFields();
  await createPatient.clickOnCheckButton();
  await createPatient.validatePagination();
});

test("User should get search result with relevant patients record at top before creating", async ({
  page,
  baseURL,
}) => {
  test.setTimeout(120000);
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  patientMaster.clickOnCreateButton();
  await patientMaster.closePatientMasterTab();
  const createPatient = new CreatePatient(page);
  await createPatient.openCreateFromSideMenu();
  await createPatient.enterDataIntoMandatoryFields();
  await createPatient.clickOnCheckButton();
  await createPatient.validateDefaultSort();
});
