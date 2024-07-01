import test from "@playwright/test";
import { SideMenu } from "../locators/side-menu";
import { Users } from "../locators/users";

test("Create user", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openUserManagement();
  const users = new Users(page);
  await users.clickOnCreateButton();
  await users.selectSex();
  await users.clickOnAutoGenerateUsername();
  console.log("Pass");
});
