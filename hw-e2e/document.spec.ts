import { chromium, test, expect, Page, Browser } from "@playwright/test";

//test.describe.configure({ mode: 'serial' });
let expectedFolderName: string | null = ''
let browser: Browser
let page: Page



test.describe('test', async () => {
  
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage(); //Create a new Page instance
  });  

  test("has title", async () => {
      await page.goto("https://staging-emr.houseworksinc.co/login");
    
      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Login | House Works/);
    });

    test("Login", async () => {
      // await page.goto("https://staging-emr.houseworksinc.co/login");
    
      // Click the get started link.
      await page.getByPlaceholder("Enter username").fill("PavanKumar");
    
      await page.getByRole("button", { name: "Continue" }).click();
    
      await page.getByTestId("auth-login-password").fill("Procedure@1");
      await page.keyboard.press("Enter");
      
      await page.waitForURL('https://staging-emr.houseworksinc.co/dashboard')
      await page.click("[data-testid='activity-Administrative']")
      await page.click("[data-testid='pin-menu']")
      await page.click("[data-testid='menu-DocumentManager']")
      await expect(page.locator("[data-testid='document-manager-title']")).toContainText('Documents')


    })

    test("Upload a file", async () => {
      const handle = await page.$(
        'div:nth-child(2) > span > div.ant-upload.ant-upload-select.ant-upload-select-text > span > input[type=file]'
      )
      await handle?.setInputFiles('225_daytona-grey_36393e.jpg')
      await page.click('//div[contains(text(),"Press cancel to cancel upload.")]/following-sibling::div/div[2]/div/div/div')
      await page.waitForTimeout(2000) //To load the drop down values for Folder
      await page.keyboard.press('ArrowDown')
      await page.keyboard.press('Enter')
      const expectedFolderInnerText = await page.innerText(
        '//div[contains(text(),"Press cancel to cancel upload.")]/following-sibling::div/div[2]/div/div/div/div/span/following-sibling::span'
      )
      const expectedFolderNameArray = expectedFolderInnerText.split('\n')
      expectedFolderName = expectedFolderNameArray[1]
      await page.click('//div/button[2]/span')
      await page.waitForTimeout(2000)
      await page.waitForSelector('//span[@class="text-success"]')
      const imageUploaded = await page.innerText('//span[@class="text-success"]')
      
      expect(imageUploaded).toBe('Complete')
    })
  
  });