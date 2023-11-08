import { test } from "@playwright/test";
import { LoginPage } from "../locators/login_page";

test("Login", async ({ page, baseURL }) => {
  const login = new LoginPage(page);
  await page.goto(`${baseURL}`);
  login.enterUsername("anaFrozen");
  login.enterPassword("Rucheta@123");
  login.clickLoginBtn();
});
