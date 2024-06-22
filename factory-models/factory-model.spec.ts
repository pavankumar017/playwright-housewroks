import test from "@playwright/test";
import { SideMenu } from "../locators/side-menu";
import { contactPeopleFactoryModel } from "./contact-people";

test("Create contact person with only mandatory fields", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const contactPerson = new contactPeopleFactoryModel(page);
  const sideMenu = new SideMenu(page);
  await sideMenu.openContactPerson();
  const contactPeople = new contactPeopleFactoryModel(page);
  await contactPeople.openCreateForm();
  await contactPeople.enterMandatoryFields();
  await contactPeople.clickOnCreateButton();
  await contactPeople.validateDetailView();
});

test("Create contact person with all fields", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const contactPerson = new contactPeopleFactoryModel(page);
  const sideMenu = new SideMenu(page);
  await sideMenu.openContactPerson();
  const contactPeople = new contactPeopleFactoryModel(page);
  await contactPeople.openCreateForm();
  await contactPeople.enterMandatoryFields();
  await contactPeople.enterOptionalFields();
  await contactPeople.clickOnCreateButton();
  await contactPeople.validateDetailView();
});
