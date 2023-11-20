// import { test, expect } from "@playwright/test";

import { test as base, expect } from "@playwright/test";

import { LoginPage } from "../locators/login_page.ts";
// test.beforeEach(async ({ page }) => {
//   await page.goto("/");
//   const login = new LoginPage(page);
//   await login.enterUsername("PavanKumar");
//   await login.clickLoginBtn();
//   await login.enterPassword("Procedure@1");
//   await page.keyboard.press("Enter");
//   await expect(
//     page.getByRole("heading", { name: "Patient Master" })
//   ).toBeVisible();
// });

//fixture creation
const test = base.extend({
  login: async ({ page }, use) => {
    const login = new LoginPage(page);
    await login.loginpage();
    await login.enterUsername("PavanKumar");
    await login.clickLoginBtn();
    await login.enterPassword("Procedure@1");
    await page.keyboard.press("Enter");

    await use(login);
  },
});

test("should login ", async ({ login, page }) => {
  await login.loginpage();
  await expect(page).toHaveTitle(/Login | House Works/);
  // ...
});

test("should enterusername", async ({ login, page }) => {
  await login.loginpage();
  await login.enterUsername("PavanKumar");
  await expect(login.contBtn).toBeEnabled();
});
