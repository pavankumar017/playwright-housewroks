import { test } from "@playwright/test";
import { CreatePatient } from "../locators/create-patient";
import { PatientMaster } from "../locators/patient-master";

const invalidSSNValues = [
  "4352612",
  "000000000",
  "111111111",
  "222222222",
  "333333333",
  "444444444",
  "555555555",
  "666666666",
  "777777777",
  "888888888",
  "999999999",
  "123456789",
  "000789654",
  "666789654",
  "912789654",
  "192789654",
  "129789654",
  "212009654",
  "712780000",
];

test("User should be able to create patient", async ({
  page,
  baseURL,
}) => {
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
  await patientMaster.clickOnCreateButton();
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
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterDataIntoOptionalFields();
  await createPatient.clickOnCheckButton();
  await createPatient.clickOnCreateButton();
  await createPatient.validateEmptyMandatoryFieldsErrorMessages();
});

test("User should be able to use the pagination", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
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
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  await patientMaster.closePatientMasterTab();
  const createPatient = new CreatePatient(page);
  await createPatient.openCreateFromSideMenu();
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

for (const values of invalidSSNValues) {
  test(`User should get error message on entering SSN value ${values}`, async ({
    page,
    baseURL,
  }) => {
    await page.goto(`${baseURL}`);
    const patientMaster = new PatientMaster(page);
    await patientMaster.clickOnCreateButton();
    const createPatient = new CreatePatient(page);
    await createPatient.enterFirstName();
    await createPatient.clickOnCheckButton();
    await createPatient.enterInvalidSSN(values);
    await createPatient.validateInvalidSSN();
  });
}
