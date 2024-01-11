import { Browser, Page, chromium } from "@playwright/test";
import { LoginPage } from "./locators/login_page";

async function globalSetup() {
  const browser: Browser = await chromium.launch({
    headless: false,
  });
  const context = await browser.newContext();
  const page: Page = await context.newPage();

  await page.goto("https://staging.rbp.houseworksinc.co/login");
  const login = new LoginPage(page);
  await login.enterUsername("rucheta19");
  await login.clickOnContinueButton();
  await login.enterPassword("Rucheta@123");
  await login.clickLoginBtn();
  await login.validateSuccessfulLogin();

  await page.context().storageState({ path: "./LoginAuth.json" });

  await browser.close();
}

export default globalSetup;
