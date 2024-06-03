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
  readonly unsupportedFile: Locator;
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
  readonly iIcon: Locator;
  readonly uploadedByTooltip: Locator;
  readonly activePageNumber: Locator;
  readonly totalItems: Locator;
  readonly recordsPerPage: Locator;
  readonly paginationOptions: Locator;
  readonly imagePreview: Locator;
  readonly pdfPreview: Locator;
  readonly noDataSearchEmptyPreviewText: string;
  expectedPageNumber: string;
  readonly previousPage: Locator;
  readonly highlightedRow: Locator;
  readonly firstRow: Locator;

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
    this.unsupportedFile = this.page.getByText("README.md").first();
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
    this.iIcon = this.page.locator("[data-icon='info-circle']");
    this.uploadedByTooltip = this.page.getByRole("tooltip");
    this.activePageNumber = this.page.locator(
      "[class*='ant-pagination-item-active']"
    );
    this.totalItems = this.page.getByText("item(s)");
    this.recordsPerPage = this.page.locator(
      "(//li[@title='Next Page'])/following-sibling::li[1]"
    );
    this.paginationOptions = this.page.getByRole("option");
    this.imagePreview = this.page.locator("img[alt='document image']");
    this.pdfPreview = this.page
      .getByTestId("pdf-document")
      .locator("canvas")
      .first();
    this.noDataSearchEmptyPreviewText =
      "Document Manager\nDrag and drop your documents anywhere on this screen or click on ‘Upload’ button on top to upload.\nOrganise all your uploaded documents into relevant pre-defined folders.\nPreview, edit, download or delete your documents in just a click.";
    this.previousPage = this.page.locator("(//li[@title='Previous Page'])");
    this.highlightedRow = this.page
      .locator("tbody [class*='ant-table-cell-row-hover']")
      .first();
    this.firstRow = this.table.locator("tr").first();
  }

  formatDateToMMDDYYYY() {
    let date = new Date();
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() is zero-based
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }

  getCurrentTime(): string {
    const now = new Date();
    let hours = now.getHours();
    const minutes: string = now.getMinutes().toString().padStart(2, "0");
    const hrFormat = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 12-hour clock

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")} ${hrFormat}`;
    return formattedTime;
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
    await this.unsupportedFile.click();
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

  async searchInFolderCategory() {
    await this.documentCategory.click();
    await this.documentCategorySearch.fill(
      this.categoryOptions[this.randomCategory]
    );
  }

  async validateSearchInFolderCategory() {
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

  async searchInListView(fileName: string) {
    await this.search.fill(fileName);
    await this.loader.waitFor({ state: "hidden" });
  }

  async validateSearchInListView(fileName: string) {
    let filteredFileNameList: string[] = [];
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
    expect(actualFileName[0], "Search in list view is not as expected").toMatch(
      fileName
    );
  }

  async noDataSearchInListView() {
    await this.search.fill(this.noDataSearchValue);
    await this.loader.waitFor({ state: "hidden" });
  }

  async validateNoDataSearchInListView() {
    await expect(
      this.noDataListView,
      "No data search text in list view is not visible"
    ).toBeVisible();
    await expect(
      this.emptyPreview,
      "Empty preview is not visible"
    ).toBeVisible();
    expect(await this.emptyPreview.innerText()).toEqual(
      this.noDataSearchEmptyPreviewText
    );
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

  async uploadMultipleFiles(filePath: string[]) {
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

  async validateImageIcon() {
    await expect(
      this.firstRecordIcon,
      "Image file icon not displayed for image file"
    ).toHaveAttribute("data-testid", "image-icon");
  }

  async validateUnknownIcon() {
    await expect(
      this.firstRecordIcon,
      "Image file icon not displayed for unsupported file"
    ).toHaveAttribute("data-testid", "unknown");
  }

  async validateEllipsis(fileName: string) {
    let ellipsis = this.page
      .locator("[class*='ant-typography-single-line']")
      .getByText(fileName);
    expect(ellipsis, "Ellipsis is not displayed for long name").toBeVisible();
  }

  async validateIIconData() {
    await this.iIcon.first().hover();
    let tooltipData = await this.uploadedByTooltip.innerText();
    let todayDate = this.formatDateToMMDDYYYY();
    let currentTime = this.getCurrentTime();
    let expectedTooltipData =
      "Uploaded by Gogte, Rucheta A on " + todayDate + " at " + currentTime;
    expect(expectedTooltipData, "i icon data is not as expected").toMatch(
      tooltipData
    );
  }

  async navigateToNextPage() {
    await this.nextPage.click();
  }

  async validateFirstPageIsActive() {
    let activePageNumberValue = await this.activePageNumber.innerText();
    expect(activePageNumberValue, "First page is not active").toBe("1");
  }

  async validateTotalItemsIsVisible() {
    let regularExpression = /Total (\d+) item\(s\)/;
    await expect(this.totalItems, "Total items are not visible").toBeVisible();
    expect(
      (await this.totalItems.innerText()).toString(),
      "Total items text is incorrect"
    ).toEqual(expect.stringMatching(regularExpression));
  }

  async validatePagination() {
    await this.totalItems.isVisible();
    let totalItemsText = (await this.totalItems.innerText()).toString();
    let totalItemsTextArray = totalItemsText.split(" ");
    let totalItemsCount = totalItemsTextArray[1];
    let recordsPerPageOption = ["20", "50", "100"];
    let expectedPageCount = Math.ceil(Number(totalItemsCount) / 10);
    let actualPageCount = (await this.pageNumberCount.innerText()).toString();
    expect(expectedPageCount.toString(), "Page count is incorrect").toEqual(
      actualPageCount
    );
    for (const recordsPerPageValue of recordsPerPageOption) {
      await this.recordsPerPage.click();
      await this.page
        .locator("//*[@title='" + recordsPerPageValue + " / page']")
        .click();
      await this.loader.waitFor();
      await this.loader.waitFor({ state: "hidden" });
      let expectedPageCount = Math.ceil(
        Number(totalItemsCount) / Number(recordsPerPageValue)
      );
      let actualPageCount = (await this.pageNumberCount.innerText()).toString();
      expect(expectedPageCount.toString(), "Page count is incorrect").toEqual(
        actualPageCount
      );
    }
  }

  async validateDefaultSort(fileName: string) {
    let filteredFileNameList: string[] = [];
    let pageCount = await this.pageNumberCount.innerText();
    let tableData = await this.table.innerText();
    let allRecordsArray = tableData.split("\n");
    filteredFileNameList = allRecordsArray.filter(
      (element) => element.trim() !== "" && !element.includes("\t")
    );
    await this.nextPage.click();
    await this.loader.waitFor({ state: "hidden" });
    expect(
      filteredFileNameList[0],
      "Search in list view is not as expected"
    ).toMatch(fileName);
  }

  async validateImagePreview() {
    await expect(
      this.imagePreview,
      "Image preview is not displayed"
    ).toBeVisible();
  }

  async openMentionedFile(fileName: string) {
    this.page.getByText(fileName).first().click();
  }

  async validatePDFPreview() {
    await expect(this.pdfPreview, "PDF preview is not displayed").toBeVisible();
  }

  async changeActivePage(expectedPageNumber: string) {
    await this.nextPage.waitFor();
    if (!this.nextPage.isEnabled()) {
      console.log(
        "Only one page exists in administrative document manager list view"
      );
    } else {
      await this.nextPage.click();
      await this.page.waitForTimeout(2000);
    }
  }

  async validateActivePage(expectedPageNumber: string) {
    let activePageNumberValue = await this.activePageNumber.innerText();
    expect(activePageNumberValue, "First page is not active").toBe(
      expectedPageNumber
    );
  }

  async validatePreviousPageDisabled() {
    await this.previousPage.waitFor();
    expect(
      this.previousPage.isDisabled(),
      "Previous page button is not disabled"
    ).toBeTruthy();
  }

  async validatePreviousPageEnabled() {
    await this.loader.waitFor();
    await this.loader.waitFor({ state: "hidden" });
    expect(
      this.previousPage.isEnabled(),
      "Previous page button is not enabled"
    ).toBeTruthy();
  }

  async goToLastPage() {
    await this.pageNumberCount.click();
  }

  async validateNextPageDisabled() {
    expect(
      this.nextPage.isDisabled(),
      "Previous page button is not disabled"
    ).toBeTruthy();
  }

  async validateNextPageEnabled() {
    expect(
      await this.nextPage.isEnabled(),
      "Next page button is not enabled"
    ).toBeTruthy();
  }

  async hoverOnFirstRecord() {
    await this.firstRow.hover();
  }

  async clickOnFirstRecord() {
    await this.firstRow.click();
  }

  async validateHighlightedRow() {
    await expect(this.firstRow).toHaveAttribute(
      "background-color",
      "rgba(242, 246, 255)"
    );
  }
}
