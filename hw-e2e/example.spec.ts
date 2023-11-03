import { test, expect } from "@playwright/test";

import { LoginPage } from "../locators/login_page.ts";
test("has title", async ({ page }) => {
  await page.goto("https://staging-emr.houseworksinc.co/login");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Login | House Wasdasdorks/);
});

test("Login", async ({ page }) => {
  await page.goto("https://staging-emr.houseworksinc.co/login");
  const login = new LoginPage(page);
  await login.enterUsername("PavanKumar");
  await login.clickLoginBtn();
  await login.enterPassword("Procedure@1");
  await page.keyboard.press("Enter");

  // // Click the get started link.
  // await page.getByPlaceholder("Enter username").fill("PavanKumar");

  // await page.getByRole("button", { name: "Continue" }).click();

  // await page.getByTestId("auth-login-password").fill("Procedure@1");

  // // await expect(page.getByText("Patient Master")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Patient Master" })
  ).toBeVisible();
});
