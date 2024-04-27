import { Locator, Page, expect } from "@playwright/test";
import { randomInt } from "crypto";

export class AdministrativeDocumentManager {
  readonly page: Page;
  readonly documentCategory: Locator;
  readonly heading: Locator;
  readonly noPreviewText: Locator;
  readonly uploadCategory: Locator;
  readonly categoryOptions: string[];
  readonly uploadModalUploadButton: Locator;
  readonly uploadInput: Locator;
  readonly search: Locator;
  readonly unsupportedFileSearch: Locator;
  readonly openUnsupportedSearchedFile: Locator;
  readonly folderLabel: Locator;
  readonly documentCategorySearch: Locator;
  readonly documentTable: Locator;
  readonly pageNumberCount: Locator;
  readonly table: Locator;
  readonly nextPage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.documentCategory = this.page
      .getByTestId("category-dropdown")
      .locator("div");
    this.heading = this.page.getByRole("heading", { name: "Document Manager" });
    this.noPreviewText = this.page.getByText("No preview available");
    this.uploadCategory = this.page.locator('[data-testid="folder"]');
    this.categoryOptions = ["Inbox", "Audit", "Education", "Administrative"];
    this.uploadModalUploadButton = this.page
      .getByTestId("upload-modal")
      .getByRole("button", { name: "Upload" });
    this.uploadInput = this.page.getByTestId("upload-patient-documents");
    this.search = this.page.getByPlaceholder("Search");
    this.unsupportedFileSearch = this.page.getByText("README.md").first();
    this.openUnsupportedSearchedFile = this.page
      .getByRole("cell", { name: "file-exclamation README.md" })
      .first();
    this.folderLabel = this.page.locator(
      '//*[@data-testid="category-icon"]/following-sibling::span[1]'
    );
    this.documentCategorySearch = this.page.locator(
      '[data-testid="category-dropdown"] input'
    );
    this.documentTable = this.page.getByTestId("list-section");
    this.pageNumberCount = this.page.locator(
      "(//li[@title='Next Page'])/preceding-sibling::li[1]"
    );
    this.table = this.page.locator("table tbody");
    this.nextPage = this.page.locator("(//li[@title='Next Page'])");
  }

  async validateAdministrativeDocumentManagerPage() {
    await expect(
      this.documentCategory,
      "Document Category field is not visible"
    ).toBeVisible();
  }

  async validateHeadingText() {
    await expect(this.heading).toBeVisible();
  }

  async validateHeadingFont() {
    await expect(this.heading).toHaveCSS("font-size", "16px");
  }

  async validateNoPreviewText() {
    expect(this.noPreviewText).toBeVisible();
  }

  async uploadUnsupportedFile() {
    let randomNumber = randomInt(this.categoryOptions.length - 1);
    await this.uploadInput.setInputFiles("./README.md");
    await this.uploadCategory.click();
    await this.page
      .getByTitle(this.categoryOptions[randomNumber])
      .locator("div")
      .click();
    await this.uploadModalUploadButton.click();
  }

  async openUnsupportedFile() {
    await this.search.fill(".md");
    await this.unsupportedFileSearch.click();
    await this.openUnsupportedSearchedFile.click();
  }

  async validateFolderLabel() {
    let labelText = await this.folderLabel.innerText();
    expect(labelText).toMatch("SHOWING FOLDER:");
  }

  async validateDefaultFolderSelected() {
    let defaultFolder = await this.documentCategory.innerText();
    expect(defaultFolder).toMatch("All");
  }

  async validateSearchPlaceholder() {
    await expect(this.search).toBeVisible();
  }

  async validateSearchInFolderCategory() {
    let randomCategory = randomInt(this.categoryOptions.length - 1);
    await this.documentCategory.click();
    await this.documentCategorySearch.fill(
      this.categoryOptions[randomCategory]
    );
    await expect(
      this.page.getByTitle(this.categoryOptions[randomCategory])
    ).toBeVisible();
  }

  async uploadFilesInEachDocumentCategory() {
    for (
      let categoryOptionsIndex = 0;
      categoryOptionsIndex < this.categoryOptions.length;
      categoryOptionsIndex++
    ) {
      await this.uploadInput.setInputFiles("./README.md");
      await this.uploadCategory.click();
      await this.page
        .getByTitle(this.categoryOptions[categoryOptionsIndex])
        .locator("div")
        .click();
      await this.uploadModalUploadButton.click();
    }
  }

  async getFolderNameOfDocuments(){
    
  }

  async validateAllFilesDisplayed() {
    let folderList: string[] = [];

    let pageCount = await this.pageNumberCount.innerText();
    for (let count = Number(pageCount); count > 0; count = count - 1) {
      let tableData = await this.table.innerText();
      let allRecordsArray = tableData.split("\t");
      allRecordsArray.splice(0, 1);
      for (
        let counter = 0;
        counter < allRecordsArray.length - 1;
        counter += 2
      ) {
        folderList.push(allRecordsArray[counter]);
      }
      await this.nextPage.click();
      await this.page.waitForTimeout(2000);
    }
    let uniqueFolderList = folderList.filter(
      (item, index) => folderList.indexOf(item) === index
    );

    let actualSortedFolderList = uniqueFolderList.sort();
    let expectedSortedFolderList = this.categoryOptions.sort();
    expect(expectedSortedFolderList).toEqual(actualSortedFolderList);
  }
}
