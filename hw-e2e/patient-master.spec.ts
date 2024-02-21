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
  await patientMaster.search_enter("james");
  await patientMaster.verify_search_result();
});

test("Test to verify search invalid patient", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.heading.isVisible();
  await patientMaster.search_enter("ASDASDASDasd");
  await patientMaster.verify_no_data_found();
});

test("Test to validate list of criterias", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.click_on_filters();
  await patientMaster.click_on_criteria_dropdown();
  await patientMaster.verify_criteria_dropdown();
});

test("Test to validate values of criteria Disease", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.heading.isVisible();
  await patientMaster.click_on_filters();
  await patientMaster.click_on_criteria_dropdown();
  await patientMaster.select_criteria_dropdown("Disease");
  await patientMaster.click_on_select_dropdown();
  await patientMaster.verify_disease_values();
});

test("Test to validate Organ Values", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const patientMaster = new PatientMaster(page);
  await patientMaster.heading.isVisible();
  await patientMaster.click_on_filters();
  await patientMaster.click_on_criteria_dropdown();
  await patientMaster.select_criteria_dropdown("Organ");
  await patientMaster.click_on_select_dropdown();
  await patientMaster.verify_organ_values();
});
