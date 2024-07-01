import test from "@playwright/test";
import { ContactPeople } from "../locators/contact-people";
import { CreatePatient } from "../locators/create-patient";
import { PatientMaster } from "../locators/patient-master";
import { SideMenu } from "../locators/side-menu";
import { Users } from "../locators/users";

test("Create contact person with only mandatory fields", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openContactPerson();
  const contactPeople = new ContactPeople(page);
  await contactPeople.openCreateForm();
  await contactPeople.enterMandatoryFields();
  await contactPeople.clickOnCreateButton();
  await contactPeople.validateDetailView();
});

test("Create contact person with all fields", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openContactPerson();
  const contactPeople = new ContactPeople(page);
  await contactPeople.openCreateForm();
  await contactPeople.enterMandatoryFields();
  await contactPeople.enterOptionalFields();
  await contactPeople.clickOnCreateButton();
  await contactPeople.validateDetailView();
});

//patient
test("Create patient with only mandatory fields", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnCreateButton();
  const createPatient = new CreatePatient(page);
  await createPatient.enterDataIntoMandatoryFields();
  await createPatient.clickOnCheckButton();
  await createPatient.waitTillCreateButtonEnabled();
  await createPatient.clickOnCreateButton();
  await createPatient.validateSuccessfulCreation();
});

test("Create patient with all fields", async ({ page, baseURL }) => {
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

test("Create user", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openUserManagement();
  const users = new Users(page);
  await users.clickOnCreateButton();
  await users.enterFirstName();
  await users.enterLastName();
  await users.selectSex();
  await users.enterEmail();
  await users.clickOnAutoGenerateUsername();
  await users.selectUserType();
  console.log("Pass");
});
