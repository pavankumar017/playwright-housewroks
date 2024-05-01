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
  randomCategory: number;
  readonly loader: Locator;
  readonly fileName: string;
  readonly noDataListView: Locator;
  readonly noDataSearchValue: string;
  readonly emptyPreview: Locator;
  readonly defaultPreviewText: Locator;
  readonly PDFIcon: Locator;
  readonly PDFFilePath: string;
  readonly firstRecordName: Locator;
  readonly firstRecordIcon: Locator;

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
    this.randomCategory = randomInt(this.categoryOptions.length - 1);
    this.loader = this.page.locator(".ant-spin");
    this.fileName = "README.md";
    this.noDataListView = this.page.getByText("No document(s) uploaded");
    this.noDataSearchValue = "fhjgxzjvbgxzjkvgxzj";
    this.emptyPreview = this.page.getByTestId("empty-view");
    this.defaultPreviewText = this.page.getByText(
      "Select a file from the list for preview"
    );
    this.PDFIcon = this.page.getByTestId("pdf-icon");
    this.PDFFilePath = "./Sample.pdf";
    this.firstRecordName = this.page.locator("table tbody td").first();
    this.firstRecordIcon = this.page.locator("table tbody td span").first();
  }

  async validateAdministrativeDocumentManagerPage() {
    await expect(
      this.documentCategory,
      "Document Category field is not visible"
    ).toBeVisible();
  }

  async validateHeadingText() {
    await expect(this.heading, "Heading is not visible").toBeVisible();
  }

  async validateHeadingFont() {
    await expect(
      this.heading,
      "Heading font is not as per the design"
    ).toHaveCSS("font-size", "16px");
  }

  async validateNoPreviewText() {
    expect(this.noPreviewText, "Preview text is not visible").toBeVisible();
  }

  async uploadFileFromGivenPath(filePath: string) {
    await this.uploadInput.setInputFiles(filePath);
    await this.uploadCategory.click();
    await this.page
      .getByTitle(this.categoryOptions[this.randomCategory])
      .locator("div")
      .click();
    await this.uploadModalUploadButton.click();
    await this.loader.waitFor();
    await this.loader.waitFor({ state: "hidden" });
  }

  async openUnsupportedFile() {
    await this.search.fill(".md");
    await this.unsupportedFileSearch.click();
    await this.openUnsupportedSearchedFile.click();
  }

  async validateFolderLabel() {
    let labelText = await this.folderLabel.innerText();
    expect(labelText, "Label text is not as per the design").toMatch(
      "SHOWING FOLDER:"
    );
  }

  async validateDefaultFolderSelected() {
    let defaultFolder = await this.documentCategory.innerText();
    expect(defaultFolder, "Default folder is not selected as 'All'").toMatch(
      "All"
    );
  }

  async validateSearchPlaceholder() {
    await expect(
      this.search,
      "Search placeholder is not as expected"
    ).toBeVisible();
  }

  async validateSearchInFolderCategory() {
    await this.documentCategory.click();
    await this.documentCategorySearch.fill(
      this.categoryOptions[this.randomCategory]
    );
    await expect(
      this.page.getByTitle(this.categoryOptions[this.randomCategory]),
      "Result of search inside folder dropdown is not as expected"
    ).toBeVisible();
  }

  async uploadFilesInEachDocumentCategory(filePath) {
    for (
      let categoryOptionsIndex = 0;
      categoryOptionsIndex < this.categoryOptions.length;
      categoryOptionsIndex++
    ) {
      await this.uploadInput.setInputFiles(filePath);
      await this.uploadCategory.click();
      await this.page
        .getByTitle(this.categoryOptions[categoryOptionsIndex])
        .locator("div")
        .click();
      await this.uploadModalUploadButton.click();
      await this.loader.waitFor();
      await this.loader.waitFor({ state: "hidden" });
    }
  }

  async validateAllFilesDisplayed() {
    let folderList: string[] = [];
    let filteredList: string[] = [];
    let pageCount = await this.pageNumberCount.innerText();
    for (let count = Number(pageCount); count > 0; count = count - 1) {
      let tableData = await this.table.innerText();
      let allRecordsArray = tableData.split("\n");
      allRecordsArray.splice(0, 1);
      folderList = allRecordsArray.filter((element) => element.includes("\t"));
      for (let counter = 0; counter < folderList.length - 1; counter++) {
        filteredList.push(folderList[counter].replace("\t", ""));
      }
      await this.nextPage.click();
      await this.loader.waitFor({ state: "hidden" });
    }
    let uniqueFolderList = filteredList.filter(
      (item, index) => filteredList.indexOf(item) === index
    );
    let actualSortedFolderList = uniqueFolderList.sort();
    let expectedSortedFolderList = this.categoryOptions.sort();
    expect(
      actualSortedFolderList,
      "All files are not displayed when 'All' folder is selected"
    ).toEqual(expectedSortedFolderList);
  }

  async validateOnlySelectedFolderFilesDisplayed() {
    let folderList: string[] = [];
    let filteredList: string[] = [];
    let pageCount = await this.pageNumberCount.innerText();
    for (let count = Number(pageCount); count > 0; count = count - 1) {
      let tableData = await this.table.innerText();
      let allRecordsArray = tableData.split("\n");
      allRecordsArray.splice(0, 1);
      folderList = allRecordsArray.filter((element) => element.includes("\t"));
      for (let counter = 0; counter < folderList.length - 1; counter++) {
        filteredList.push(folderList[counter].replace("\t", ""));
      }
      await this.nextPage.click();
      await this.loader.waitFor({ state: "hidden" });
    }
    let actualFolderValue = filteredList.filter(
      (item, index) => filteredList.indexOf(item) === index
    );
    expect(
      this.categoryOptions[this.randomCategory],
      "Files with folder other than selected are displayed"
    ).toMatch(actualFolderValue[0]);
  }

  async selectRandomCategory() {
    await this.documentCategory.click();
    await this.page
      .getByTitle(this.categoryOptions[this.randomCategory])
      .click();
    await this.loader.waitFor({ state: "hidden" });
  }

  async uploadFileNWithinFolderView(filePath) {
    await this.uploadInput.setInputFiles(filePath);
    await this.uploadModalUploadButton.click();
    await this.loader.waitFor();
    await this.loader.waitFor({ state: "hidden" });
  }

  async validateSearchInListView(fileName: string) {
    let filteredFileNameList: string[] = [];
    await this.search.fill(fileName);
    await this.loader.waitFor({ state: "hidden" });
    let pageCount = await this.pageNumberCount.innerText();
    for (let count = Number(pageCount); count > 0; count = count - 1) {
      let tableData = await this.table.innerText();
      let allRecordsArray = tableData.split("\n");
      filteredFileNameList = allRecordsArray.filter(
        (element) => element.trim() !== "" && !element.includes("\t")
      );
      await this.nextPage.click();
      await this.loader.waitFor({ state: "hidden" });
    }
    let actualFileName = filteredFileNameList.filter(
      (item, index) => filteredFileNameList.indexOf(item) === index
    );
    expect(
      actualFileName[0].trim(),
      "Search in list view is not as expected"
    ).toMatch(fileName);
  }

  async validateNoDataSearchInListView() {
    await this.search.fill(this.noDataSearchValue);
    await this.loader.waitFor({ state: "hidden" });
    await expect(
      this.noDataListView,
      "No data search text in list view is not visible"
    ).toBeVisible();
    await expect(
      this.emptyPreview,
      "No data search text in preview is not visible"
    ).toBeVisible();
  }

  async validateDefaultPreview() {
    await expect(
      this.defaultPreviewText,
      "Default preview text is not visible"
    ).toBeVisible();
  }

  async validatePDFIcon() {
    expect(
      (await this.firstRecordName.innerText()).toString(),
      "File is not PDF"
    ).toContain(".pdf");
    await expect(
      this.firstRecordIcon,
      "PDF file icon not displayed for PDF file"
    ).toHaveAttribute("data-testid", "pdf-icon");
  }
}
