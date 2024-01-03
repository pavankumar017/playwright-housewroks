import { Locator, Page, expect } from "@playwright/test";
export class LoginPage {
  readonly page: Page;
  readonly user_name: Locator;
  readonly contBtn: Locator;
  readonly pwd: Locator;
  readonly lockScreenText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.user_name = this.page.getByPlaceholder("Enter username");
    this.contBtn = this.page.getByRole("button", { name: "Continue" });
    this.pwd = this.page.getByTestId("auth-login-password");
    this.lockScreenText = this.page.getByText("Lock screen");
  }
  async enterUsername(strUser: string) {
    await this.user_name.fill(strUser);
  }
  async enterPassword(strPwd: string) {
    await this.pwd.fill(strPwd);
  }
  async clickLoginBtn() {
    await this.contBtn.click();
  }
  async clickOnContinueButton() {
    await this.contBtn.click();
  }
  async validateSuccessfulLogin() {
    await this.page.waitForTimeout(5000);
    await expect(
      this.lockScreenText,
      "Patient Master text not visible after login"
    ).toBeVisible();
  }
}
