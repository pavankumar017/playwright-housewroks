import test, { expect } from "@playwright/test";
import { SideMenu } from "../locators/side-menu";
import { factoryModel } from "./factory-model";

test("Create contact person with only mandatory fields", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const contactPerson = new factoryModel(page);
  const sideMenu = new SideMenu(page);
  await sideMenu.openContactPerson();
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByLabel("First Name").click();
  await page.getByLabel("First Name").fill(contactPerson.randomFirstName);
  await page.getByLabel("Last Name").click();
  await page.getByLabel("Last Name").fill(contactPerson.randomLastName);
  await page.getByLabel("Type").click();
  let randomType = contactPerson.randomDropdownSelection(
    contactPerson.personType
  );
  await page.getByText(await randomType, { exact: true }).click();
  await page.getByLabel("Phone Number").click();
  await page
    .getByLabel("Phone Number")
    .fill(contactPerson.randomTenDigitNumber);
  await page.getByLabel("Email").click();
  await page
    .getByLabel("Email")
    .fill(
      contactPerson.randomFirstName +
        contactPerson.randomLastName +
        "@gmail.com"
    );
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByRole("button", { name: "Edit" }).waitFor();
  await expect(page.getByRole("button", { name: "Edit" })).toBeVisible();
});

test("Create contact person with all fields", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const contactPerson = new factoryModel(page);
  const sideMenu = new SideMenu(page);
  await sideMenu.openContactPerson();
  await page.getByRole("button", { name: "Create" }).click();
  let randomTitle = contactPerson.randomDropdownSelection(contactPerson.title);
  await page.locator("[data-testid='title'] input").fill(await randomTitle);
  await page.getByText(await randomTitle, { exact: true }).click();
  await page.getByLabel("First Name").fill(contactPerson.randomFirstName);
  await page.getByLabel("Middle Name").fill(contactPerson.randomMiddleName);
  await page.getByLabel("Last Name").fill(contactPerson.randomLastName);
  await page.locator("[data-testid='suffix']").click();
  let randomSuffix = contactPerson.randomDropdownSelection(
    contactPerson.suffix
  );
  await page.locator("[data-testid='suffix'] input").fill(await randomSuffix);
  await page.getByText(await randomSuffix, { exact: true }).click();
  let randomType = contactPerson.randomDropdownSelection(
    contactPerson.personType
  );
  await page.getByLabel("Type").click();
  await page.getByText(await randomType, { exact: true }).click();
  await page.getByLabel("NPI").fill(contactPerson.randomTenDigitNumber);
  let randomPrimarySpeciality = contactPerson.randomDropdownSelection(
    contactPerson.primarySpeciality
  );
  await page.locator("[data-testid='primary_speciality_id'] input").click();
  await page.getByText(await randomPrimarySpeciality, { exact: true }).click();

  let randomOtherSpeciality = contactPerson.randomDropdownSelection(
    contactPerson.primarySpeciality
  );
  await page.locator("[data-testid='other_specialities_ids']").click();
  await page
    .locator("[data-testid='other_specialities_ids'] input")
    .fill(await randomOtherSpeciality);
  await page.locator("[data-testid='other_specialities_ids']").press("Enter");
  await page
    .getByLabel("Phone Number")
    .fill(contactPerson.randomTenDigitNumber);
  await page
    .getByLabel("Email")
    .fill(
      contactPerson.randomFirstName +
        contactPerson.randomLastName +
        "@gmail.com"
    );
  await page.getByLabel("Fax").fill(contactPerson.randomTenDigitNumber);
  await page
    .getByLabel("Address line 1")
    .fill(
      await contactPerson.randomDropdownSelection(contactPerson.streetName)
    );
  await page
    .getByLabel("Address line 2")
    .fill(
      await contactPerson.randomDropdownSelection(contactPerson.streetName)
    );
  await page
    .getByLabel("City")
    .fill(await contactPerson.randomDropdownSelection(contactPerson.cityName));
  let randomCountry = contactPerson.randomDropdownSelection(
    contactPerson.country
  );
  await page.getByLabel("Country").fill(await randomCountry);
  await page.getByText(await randomCountry, { exact: true }).click();
  await page
    .getByLabel("State Code")
    .fill(await contactPerson.randomDropdownSelection(contactPerson.stateName));
  await page
    .getByLabel("Zip Code")
    .fill(await contactPerson.randomDropdownSelection(contactPerson.zipCode));
  await page.waitForTimeout(2000);
  await page.getByTestId("organization-select").click();
  await page.locator("[data-testid='organization-select'] input").fill("a");
  await page.locator(".ant-spin").first().waitFor();
  await page.locator(".ant-spin").first().waitFor({ state: "hidden" });
  await page.getByTestId("organization-select").press("ArrowDown");
  await page.getByTestId("organization-select").press("Enter");
  await page.getByLabel("Designation").fill("Test Engineer Analyst");
  await page.getByRole("button", { name: "Link" }).click();
    await page.getByRole("button", { name: "Create" }).click();
    await page.getByRole("button", { name: "Edit" }).waitFor();
    await expect(page.getByRole("button", { name: "Edit" })).toBeVisible();
});
