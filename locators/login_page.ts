import { Page, Locator } from "@playwright/test";
export class LoginPage {
  readonly page: Page;
  readonly user_name: Locator;
  readonly contBtn: Locator;
  readonly pwd: Locator;
  readonly user_name_error_txt: Locator;
  readonly pwd_error_txt: Locator;
  readonly forgot_pwd_link: Locator;
  readonly forgotPageUsername: Locator;
  readonly forgotPageUsername_contBtn: Locator;
  readonly resetCode: Locator;

  constructor(page: Page) {
    this.page = page;

    //locators
    this.user_name = this.page.getByPlaceholder("Enter username");
    this.contBtn = this.page.getByRole("button", { name: "Continue" });
    this.pwd = this.page.getByTestId("auth-login-password");
    this.user_name_error_txt = this.page.getByText(
      "Username does not exist or has been disabled."
    );
    this.pwd_error_txt = this.page.getByText(
      "Password must be atleast 8 characters"
    );
    this.forgot_pwd_link = this.page.getByText("Forgot Password");
    this.forgotPageUsername = this.page.getByPlaceholder("Enter username");
    this.forgotPageUsername_contBtn = this.page.getByTestId(
      "forgot-password-get-reset-code-link"
    );
    this.resetCode = this.page.getByTestId("forgot-password-code-from-email");
  }

  //functions
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
