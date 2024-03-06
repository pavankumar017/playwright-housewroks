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

test("Future dates should be disabled in date of birth field", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.validateCreatePatientPage();
  await createPatient.validateFutureDateDisabled("01/01/2030");
});

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
  await createPatient.enterDOBProvided("01/08/2000");
  await createPatient.clickOnCheckButton();
  await createPatient.validateDOBSearchResult("01/07/2000");
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
  await createPatient.enterFirstNameProvided("test");
  await createPatient.enterLastNameProvided("test");
  await createPatient.enterDOBProvided("01/01/2024");
  await createPatient.clickOnCheckButton();
  await createPatient.validatePagination();
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

test("Match score should be 1 for exact match", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterFirstName();
  await createPatient.enterMiddleName();
  await createPatient.enterLastName();
  await createPatient.selectDateOfBirth();
  await createPatient.selectSexValueProvided("Male");
  await createPatient.selectDiseaseTypeProvided("Cancer");
  await createPatient.selectAffectedOrganProvided("Stomach");
  await createPatient.enterDataIntoOptionalFields();
  await createPatient.clickOnCheckButton();
  await createPatient.waitTillCreateButtonEnabled();
  await createPatient.clickOnCreateButton();
  await createPatient.validateSuccessfulCreation();
  const sideMenu = new SideMenu(page);
  await sideMenu.openCreateFromSideMenu();
  await createPatient.enterFirstName();
  await createPatient.enterMiddleName();
  await createPatient.enterLastName();
  await createPatient.selectDateOfBirth();
  await createPatient.selectSexValueProvided("Male");
  await createPatient.selectDiseaseTypeProvided("Cancer");
  await createPatient.selectAffectedOrganProvided("Stomach");
  await createPatient.clickOnCheckButton();
  await createPatient.validateSamePatientRank();
});

test("Create button should change to check after updating first name value", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterFirstNameProvided("test");
  await createPatient.clickOnCheckButton();
  await createPatient.enterFirstName();
  await createPatient.validateCheckButtonDisplayed();
});

test("Create button should change to check after updating middle name value", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterMiddleNameProvided("test");
  await createPatient.clickOnCheckButton();
  await createPatient.enterMiddleName();
  await createPatient.validateCheckButtonDisplayed();
});

test("Create button should change to check after updating last name value", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterLastNameProvided("test");
  await createPatient.clickOnCheckButton();
  await createPatient.enterLastName();
  await createPatient.validateCheckButtonDisplayed();
});

test("Create button should change to check after updating date of birth", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterDOBProvided("01/01/2024");
  await createPatient.clickOnCheckButton();
  await createPatient.enterDOBProvided("01/01/2023");
  await createPatient.validateCheckButtonDisplayed();
});

test("Create button should change to check after updating Sex value", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.selectSexValue();
  await createPatient.clickOnCheckButton();
  await createPatient.selectSexValue();
  await createPatient.validateCheckButtonDisplayed();
});

test("Create button should change to check after updating disease type value", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.selectDiseaseTypeProvided("Cancer");
  await createPatient.clickOnCheckButton();
  await createPatient.selectDiseaseTypeProvided("Organ Failure");
  await createPatient.validateCheckButtonDisplayed();
});

test("Create button should change to check after updating affected organ value", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.selectDiseaseTypeProvided("Cancer");
  await createPatient.selectAffectedOrganBasedOnDiseaseType("Cancer");
  await createPatient.clickOnCheckButton();
  await createPatient.selectDiseaseTypeProvided("Organ Failure");
  await createPatient.selectAffectedOrganBasedOnDiseaseType("Organ Failure");
  await createPatient.validateCheckButtonDisplayed();
});

test("On value change, the current page should reset to first page", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterDOBProvided("01/01/2024");
  await createPatient.clickOnCheckButton();
  await createPatient.clickOnNextButton();
  await createPatient.clearDOB();
  await createPatient.enterDOBProvided("02/02/2024");
  await createPatient.clickOnCheckButton();
  await createPatient.validateFirstPageIsActive();
});

test("User should be able to see total number of items", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterFirstNameProvided("test");
  await createPatient.clickOnCheckButton();
  await createPatient.validateTotalItemsIsVisible();
});

test("User should be able to see all fields", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.validateUIFields();
});

test("Mandatory fields should have mandatory marks", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterMiddleNameProvided("A");
  await createPatient.clickOnCheckButton();
  await createPatient.validateMandatoryMark();
});

test("DOB date format should be MM/DD/YYYY", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterDOBProvided("01/01/2023");
  await createPatient.clickOnCheckButton();
  await createPatient.validateDateFormat("12/31/2022");
});

test("Verify label of disease type field", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.verifyDiseaseTypeLabel();
});

test("Verify values of disease type field", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.verifyDiseaseTypeOptions();
});

test("Verify disease type is radio button", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.verifyDiseaseTypeIsRadio();
});

test("Verify label of Affected Organ", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.verifyAffectedOrganLabel();
});

test("Verify dropdown values of Affected Organ - Cancer", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.selectDiseaseTypeProvided("Cancer");
  await createPatient.validateAffectedOrganValuesForCancer();
});

test("Verify dropdown values of Affected Organ - Organ failure", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.selectDiseaseTypeProvided("Organ Failure");
  await createPatient.validateAffectedOrganValuesForOrganFailure();
});

test("Verify dropdown value sets to null after changing the disease type", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.selectDiseaseTypeProvided("Organ Failure");
  await createPatient.selectAffectedOrganBasedOnDiseaseType("Organ Failure");
  await createPatient.selectDiseaseTypeProvided("Cancer");
  await createPatient.validateAffectedOrganResets();
});

test("Create button should be displayed in disabled state on click check button", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.selectDateOfBirth();
  await createPatient.clickOnCheckButton();
  await createPatient.validateCreateButtonIsDisabled();
});

test("User should be able to see all the columns for possible matches table", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterMiddleNameProvided("test");
  await createPatient.clickOnCheckButton();
  await createPatient.validateColumnsOfPossibleMatchesTable();
});

test("Patient ID should be displayed as 8 digit number", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterFirstNameProvided("test");
  await createPatient.clickOnCheckButton();
  await createPatient.validatePatientIDFormat();
});

test("Name format should be as expected", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterFirstName();
  await createPatient.enterMiddleName();
  await createPatient.enterLastName();
  await createPatient.selectDateOfBirth();
  await createPatient.selectSexValueProvided("Male");
  await createPatient.selectDiseaseTypeProvided("Cancer");
  await createPatient.selectAffectedOrganProvided("Stomach");
  await createPatient.enterDataIntoOptionalFields();
  await createPatient.clickOnCheckButton();
  await createPatient.waitTillCreateButtonEnabled();
  await createPatient.clickOnCreateButton();
  await createPatient.validateSuccessfulCreation();
  const sideMenu = new SideMenu(page);
  await sideMenu.openCreateFromSideMenu();
  await createPatient.enterFirstName();
  await createPatient.enterMiddleName();
  await createPatient.enterLastName();
  await createPatient.selectDateOfBirth();
  await createPatient.selectSexValueProvided("Male");
  await createPatient.selectDiseaseTypeProvided("Cancer");
  await createPatient.selectAffectedOrganProvided("Stomach");
  await createPatient.clickOnCheckButton();
  await createPatient.validateNameFormat();
});

test("DOB should be displayed in DD/MM/YYYY", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterFirstNameProvided("test");
  await createPatient.clickOnCheckButton();
  await createPatient.validateDOBFormat();
});

test("User should get search result with relevant patients record at top before creating", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterFirstNameProvided("patient");
  await createPatient.enterDOBProvided("01/01/2024");
  await createPatient.clickOnCheckButton();
  await createPatient.validateDefaultSort();
});

test("Create button should be enabled immediately when sex is selected", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.selectSexValue();
  await createPatient.clickOnCheckButton();
  await createPatient.validateCreateButtonIsEnabled();
});

test("All possible matches should have more than 0.1 match score", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterFirstNameProvided("test");
  await createPatient.clickOnCheckButton();
  await createPatient.validateRankMoreThanThreshold();
});

test("Patient table should disappear on click clear button", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterDataIntoMandatoryFields();
  await createPatient.enterDataIntoOptionalFields();
  await createPatient.clickOnCheckButton();
  await createPatient.clickOnClearButton();
  await createPatient.validatePossibleMatchesHelpTextDisplayed();
});

test("Mandatory mark should disappear on click clear button", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterDataIntoMandatoryFields();
  await createPatient.enterDataIntoOptionalFields();
  await createPatient.clickOnCheckButton();
  await createPatient.validateMandatoryMark();
  await createPatient.clickOnClearButton();
  await createPatient.validateNoMandatoryMark();
});

test("Latest created patient should be displayed at the top in patient master", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterDataIntoMandatoryFields();
  await createPatient.enterDataIntoOptionalFields();
  await createPatient.clickOnCheckButton();
  await createPatient.clickOnCreateButton();
  await patientMaster.validateLatestCreatedAtTop(
    createPatient.randomFirstName,
    createPatient.randomMiddleName,
    createPatient.randomLastName
  );
});

test("On click next page active page should change to next page", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterDOBProvided("02/07/2024");
  await createPatient.clickOnCheckButton();
  await createPatient.changeAndValidateActivePage();
});

test("Create patient side menu should be displayed under Patients", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.validateCreatePatientDisplayedUnderPatients();
});

test("Title of patients side menu should be 'PATIENTS'", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.validateSideMenuPatientsTitle();
});

test("Background color of clear button should be white", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.validateBackgroundColorOfClearButton();
});

test("Background color of check button when disabled should be grey", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.validateBackgroundColorOfDisabledCheckButton();
});

test.skip("Background color of check button should be blue", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterMiddleName();
  await createPatient.validateBackgroundColorOfCheckButton();
});

test.skip("Background color of create button when disabled should be grey", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterMiddleName();
  await createPatient.clickOnCheckButton();
  await createPatient.validateBackgroundColorOfDisabledCreateButton();
});
