import { Page, Locator } from "@playwright/test";
export class LoginPage {
  readonly page: Page;
  readonly user_name: Locator;
  readonly contBtn: Locator;
  readonly pwd: Locator;

  constructor(page: Page) {
    this.page = page;
    this.user_name = this.page.getByPlaceholder("Enter username");
    this.contBtn = this.page.getByRole("button", { name: "Continue" });
    this.pwd = this.page.getByTestId("auth-login-password");
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
}
