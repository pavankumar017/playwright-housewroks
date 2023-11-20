import { Browser, Page, chromium } from "@playwright/test";
import { LoginPage } from "./locators/login_page";

async function globalSetup({ baseURL }) {
  const browser: Browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto("https://staging-emr.houseworksinc.co/login");
  const login = new LoginPage(page);
  await login.enterUsername("anaFrozen");
  await login.clickOnContinueButton();
  await login.enterPassword("Rucheta@123");
  await login.clickLoginBtn();
  await login.validateSuccessfulLogin();

  await page.context().storageState({ path: "./LoginAuth.json" });

  await browser.close();
}

// test("Login", async ({ page }) => {
//   await page.goto("https://staging-emr.houseworksinc.co/login");
//   const login = new LoginPage(page);
//   await login.enterUsername("anaFrozen");
//   await login.clickOnContinueButton();
//   await login.enterPassword("Rucheta@123");
//   await login.clickLoginBtn();
//   await login.validateSuccessfulLogin();

//   await page.context().storageState({ path: "./LoginAuth.json" });
// });

export default globalSetup;
