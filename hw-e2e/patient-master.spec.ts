import { test } from "@playwright/test";
import { PatientMaster } from "../locators/patient-master";

test("Test to verify patient Master page is displyed", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.heading.isVisible();
});

test("Test to verify search patient in patient master ", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.heading.isVisible();
  await patientMaster.searchEnter("james");
  await patientMaster.verifySearchResult();
});

test("Test to verify search invalid patient", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.heading.isVisible();
  await patientMaster.searchEnter("ASDASDASDasd");
  await patientMaster.verifyNoDataFound();
});

test("Test to validate list of criterias", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.clickOnFilters();
  await patientMaster.clickOnCriteriaDropdown();
  await patientMaster.verifyCriteriaDropdown();
});

test("Test to validate values of criteria Disease", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.heading.isVisible();
  await patientMaster.clickOnFilters();
  await patientMaster.clickOnCriteriaDropdown();
  await patientMaster.selectCriteriaDropdown("Disease");
  await patientMaster.clickOnSelectDropdown();
  await patientMaster.verifyDiseaseValues();
});

test("Test to validate Organ Values", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.heading.isVisible();
  await patientMaster.clickOnFilters();
  await patientMaster.clickOnCriteriaDropdown();
  await patientMaster.selectCriteriaDropdown("Organ");
  await patientMaster.clickOnSelectDropdown();
  await patientMaster.verifyOrganValues();
});
