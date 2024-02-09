import { test } from "@playwright/test";
import { CreatePatient } from "../locators/create-patient";
import { PatientMaster } from "../locators/patient-master";
import { SideMenu } from "../locators/side-menu";
import { assert } from "console";
import { TIMEOUT } from "dns";

test("Test to verify patient Master page is displyed", async ({
  page,
  baseURL,
}) => {
  const patientMaster = new PatientMaster(page);
  await patientMaster.heading.isVisible();
});

test("Test to verify search patient in patient master ", async ({
  page,
  baseURL,
}) => {
  const patientMaster = new PatientMaster(page);
  await patientMaster.heading.isVisible();
  await page.waitForTimeout(1000);
  await patientMaster.search_enter();
  await patientMaster.verify_search_result();
});

test("Test to validate criterias", async ({ page, baseURL }) => {
  const patientMaster = new PatientMaster(page);
  await patientMaster.click_on_filters();
  await patientMaster.click_on_criteria_dropdown();
  await patientMaster.verify_criteria_dropdown();
});

test("Test to validate values of criteria Disease", async ({
  page,
  baseURL,
}) => {});

test("Test to validate Organ Values", async ({ page, baseURL }) => {});

test("Test to validate values of criteria Phase", async ({
  page,
  baseURL,
}) => {});

test("Test to validate values of Criteria Status", async ({
  page,
  baseURL,
}) => {});
