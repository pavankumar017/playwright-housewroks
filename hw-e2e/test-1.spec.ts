import { test, expect } from "@playwright/test";

test("Loginbyrecord", async ({ page }) => {
  await page.goto("https://staging-emr.houseworksinc.co/login");
  await page.getByTestId("auth-username-username").click();
  await page.getByTestId("auth-username-username").press("CapsLock");
  await page.getByTestId("auth-username-username").fill("Pavan");
  await page.getByTestId("auth-username-username").press("CapsLock");
  await page.getByTestId("auth-username-username").fill("PavanKumar");
  await page.getByTestId("auth-username-username").press("Enter");
  await page.getByTestId("auth-login-password").click();
  await page.getByTestId("auth-login-password").press("CapsLock");
  await page.getByTestId("auth-login-password").fill("Procedure@1");
  await page.getByTestId("auth-login-continue").click();
});

test("Dashboard", async ({ page }) => {
  await page.getByRole("heading", { name: "Patient Master" }).isVisible();
});
