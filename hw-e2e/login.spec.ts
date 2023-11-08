import { test, expect } from "@playwright/test";

import { LoginPage } from "../locators/login_page.ts";
import exp from "constants";
import { log } from "console";
import path from "path";
test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Login | House Wasdasdorks/);
});

test("Test User name field", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await page.goto("/");
  await expect(loginPage.user_name).toBeEnabled();
  await expect(loginPage.user_name).toHaveAttribute(
    "placeholder",
    "Enter username"
  );

  //when
  await loginPage.user_name.fill("PavanKumar");

  //then
  await expect(loginPage.contBtn).toBeEnabled();
});

test("Login", async ({ page }) => {
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

test("Error in Usr name", async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.enterUsername("asdasd");
  await login.clickLoginBtn();

  await expect(login.user_name_error_txt).toBeVisible();
});

test("Error in Password", async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);
  await login.enterUsername("PavanKumar");
  await login.clickLoginBtn();
  await login.enterPassword("asdasd");
  await page.keyboard.press("Enter");
  await expect(login.pwd_error_txt).toBeVisible();
});

test("To verify Forgot Password link", async ({ page }) => {
  await page.goto("/");
  const login = new LoginPage(page);

  //when
  await login.forgot_pwd_link.click();

  //then
  await expect(page.getByText("Request a Password Reset")).toBeVisible();
  await expect(login.forgotPageUsername).toBeVisible();
});

test("To verify Reset Password page", async ({ page }) => {
  //given
  await page.goto("/");
  const login = new LoginPage(page);
  await login.forgot_pwd_link.click();

  //when
  await login.forgotPageUsername.fill("PavanKumar");

  //then
  await expect(login.forgotPageUsername_contBtn).toBeEnabled();
});

test("To verify Set new Password page", async ({ page }) => {
  //given
  await page.goto("/");
  const login = new LoginPage(page);
  await login.forgot_pwd_link.click();

  //when
  await login.forgotPageUsername.fill("PavanKumar");
  await login.forgotPageUsername_contBtn.click();

  //then
  await expect(login.resetCode).toBeVisible();
});
