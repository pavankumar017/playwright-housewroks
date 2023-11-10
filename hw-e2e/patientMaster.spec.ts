import { test, expect } from "@playwright/test";

import { LoginPage } from "../locators/login_page.ts";
test.beforeEach(async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.enterUsername("PavanKumar");
  await login.clickLoginBtn();
  await login.enterPassword("Procedure@1");
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Patient Master" })
  ).toBeVisible();
});
