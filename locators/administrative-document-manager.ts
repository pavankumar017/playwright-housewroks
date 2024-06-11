/// <reference lib="dom" />
import { Locator, Page, expect } from "@playwright/test";
import { randomInt } from "crypto";
import { readFileSync } from "fs";

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
  firstRecordFileName: string;
  readonly noDataListView: Locator;
  readonly noDataSearchValue: string;
  readonly emptyPreview: Locator;
  readonly defaultPreviewText: Locator;
  readonly PDFIcon: Locator;
  readonly PDFFilePath: string;
  readonly firstRecordName: Locator;
  readonly firstRecordIcon: Locator;
  readonly iIcon: Locator;
  readonly tooltip: Locator;
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
  readonly iIconInPreview: Locator;
  readonly fullScreen: Locator;
  readonly downloadButton: Locator;
  readonly fileNameFromPreview: Locator;
  readonly editButton: Locator;
  readonly updateButton: Locator;
  readonly editModalHeading: Locator;
  readonly editModalHelpText: Locator;
  readonly modalDocumentHeading: Locator;
  readonly editFileName: Locator;
  readonly cancelButton: Locator;
  readonly alert: Locator;
  readonly deleteModalHeading: Locator;
  readonly deleteButton: Locator;
  readonly deleteModalContent: Locator;
  readonly confirmButton: Locator;
  readonly helpTextDragAndDrop: Locator;
  readonly fileNameInUploadModal: Locator;
  readonly uploadModalHeading: Locator;
  readonly uploadModalSubHeading: Locator;
  readonly xButtonForDocument: Locator;
  readonly uploadButton: Locator;

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
    this.tooltip = this.page.getByRole("tooltip");
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
    this.iIconInPreview = this.page.getByTestId("info");
    this.fullScreen = this.page.locator(
      "//*[@data-testid='fullscreen']/parent::div"
    );
    this.downloadButton = this.page.locator("[data-icon='download']");
    this.fileNameFromPreview = this.page
      .getByTestId("document-header")
      .locator("span")
      .first();
    this.editButton = this.page.getByText("Edit");
    this.updateButton = this.page.getByRole("button", { name: "Update" });
    this.editModalHeading = this.page.locator("h4").getByText("Edit Folder");
    this.editModalHelpText = this.page.getByText(
      "Please select a folder to add the selected document(s)."
    );
    this.modalDocumentHeading = this.page.getByText("SELECTED DOCUMENT(S)");
    this.editFileName = this.page.getByTestId("edit-file");
    this.cancelButton = this.page.getByRole("button", { name: "Cancel" });
    this.alert = this.page.locator("//*[@role='alert']");
    this.deleteModalHeading = this.page.getByText("Delete file");
    this.deleteButton = this.page.getByText("Delete");
    this.deleteModalContent = this.page.locator(".ant-modal-confirm-content");
    this.confirmButton = this.page.getByRole("button", { name: "Confirm" });
    this.helpTextDragAndDrop = this.page.getByText(
      "Drop your files here to upload"
    );
    this.fileNameInUploadModal = this.page.locator(
      "[data-testid*='rc-upload']"
    );
    this.uploadModalHeading = this.page
      .locator("h4")
      .getByText("Select a Folder");
    this.uploadModalSubHeading = this.page.getByText(
      "Please select a folder to add the selected document(s)."
    );
    this.xButtonForDocument = this.fileNameInUploadModal.locator("svg");
    this.uploadButton = this.page
      .getByTestId("upload-modal")
      .getByRole("button", { name: "Upload" });
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
    await this.waitForLoaderToShow();
    await this.waitForLoaderToHide();
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
      await this.waitForLoaderToShow();
      await this.waitForLoaderToHide();
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
      await this.waitForLoaderToHide();
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
      await this.waitForLoaderToHide();
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
    await this.waitForLoaderToHide();
  }

  async uploadFileNWithinFolderView(filePath: string) {
    await this.uploadInput.setInputFiles(filePath);
    await this.uploadModalUploadButton.click();
    await this.waitForLoaderToShow();
    await this.waitForLoaderToHide();
  }

  async searchInListView(fileName: string) {
    await this.search.fill(fileName);
    await this.waitForLoaderToHide();
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
      await this.waitForLoaderToHide();
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
    await this.waitForLoaderToHide();
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
    await this.waitForLoaderToShow();
    await this.waitForLoaderToHide();
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

  async hoverOnIIconInListView() {
    await this.iIcon.first().hover();
  }

  async validateIIconData() {
    let tooltipData = await this.tooltip.innerText();
    let todayDate = this.formatDateToMMDDYYYY();
    let currentTime = this.getCurrentTime();
    let expectedTooltipData =
      "Uploaded by Gogte, Rucheta on " + todayDate + " at " + currentTime;
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
      await this.waitForLoaderToShow();
      await this.waitForLoaderToHide();
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
    await this.waitForLoaderToHide();
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
    await this.waitForLoaderToShow();
    await this.waitForLoaderToHide();
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
    await expect(
      this.firstRow,
      "Background colour on hover any row is not as expected"
    ).toHaveAttribute("background-color", "rgba(242, 246, 255)");
  }

  async hoverOnIIconInPreview() {
    await this.iIconInPreview.hover();
  }

  async clickOnFullScreen() {
    await this.fullScreen.click();
  }
  async validateExitFullScreenDisplayed() {
    expect(
      await this.fullScreen.innerText(),
      "Exit fullscreen is not displayed"
    ).toEqual("Exit Fullscreen");
  }

  async validateEnterFullScreenDisplayed() {
    expect(
      await this.fullScreen.innerText(),
      "Fullscreen is not displayed"
    ).toEqual("Fullscreen");
  }

  async validateListViewNotDisplayed() {
    await expect(this.uploadInput, "List view is displayed").toBeHidden();
  }

  async validateDownloadButtonVisible() {
    await expect(
      this.downloadButton,
      "Download button is not displayed"
    ).toBeVisible();
  }

  async getFileNameOfFirstRecord() {
    let filteredFileNameList: string[] = [];
    let pageCount = await this.pageNumberCount.innerText();
    let tableData = await this.table.innerText();
    let allRecordsArray = tableData.split("\n");
    filteredFileNameList = allRecordsArray.filter(
      (element) => element.trim() !== "" && !element.includes("\t")
    );
    this.firstRecordFileName = filteredFileNameList[0];
  }

  async validateFileNameInPreview() {
    expect(
      await this.fileNameFromPreview.innerText(),
      "File name in preview is not as expected"
    ).toMatch(this.firstRecordFileName);
  }

  async validateListViewDisplayed() {
    await expect(this.uploadInput, "List view is not displayed").toBeVisible();
  }

  async clickOnDownload() {
    await this.downloadButton.click();
  }

  async validateDownload() {
    const downloadPromise = this.page.waitForEvent("download");
    const download = await downloadPromise;
    await download.createReadStream();
  }

  async validateLoaderDisplayed() {
    await expect(this.loader, "Loader is not displayed").toBeVisible();
  }

  async clickOnEditButton() {
    await this.editButton.click();
  }

  async validateUpdateButtonDisplayed() {
    await expect(
      this.updateButton,
      "Update button is not displayed"
    ).toBeVisible();
  }

  async validateHeadingOfEditModal() {
    await expect(
      this.editModalHeading,
      "Heading of the edit modal is not as expected"
    ).toBeVisible();
  }

  async validateHelpTextOfEditModal() {
    await expect(
      this.editModalHelpText,
      "Help text of the edit modal is not as expected"
    ).toBeVisible();
  }

  async validateFolderInEditModal() {
    expect(
      await this.uploadCategory.innerText(),
      "Folder is not as same as file uploaded"
    ).toMatch(this.categoryOptions[this.randomCategory]);
  }

  async validateModalDocumentHeading() {
    await expect(
      this.modalDocumentHeading,
      "Heading of the document of the edit modal is not as expected"
    ).toBeVisible();
  }

  async validateBackgroundColourOfFileName() {
    await expect(
      this.editFileName,
      "Background colour of the file name in edit modal is not as expected"
    ).toHaveAttribute("background-color", "rgb(230, 244, 255)");
  }

  async validateCancelButtonVisible() {
    await expect(
      this.cancelButton,
      "Cancel button is not visible"
    ).toBeVisible();
  }

  async clickOnCancelButton() {
    await this.cancelButton.click();
  }

  async validateModalIsClosed() {
    await expect(this.cancelButton, "Edit modal is not closed").toBeHidden();
  }

  async validateBackgroundColourOfUpdateButton() {
    await expect(
      this.updateButton,
      "Background colour of the update button in edit modal is not as expected"
    ).toHaveAttribute("background-color", "rgb(47, 84, 235)");
  }

  async changeFolder() {
    await this.page
      .getByText(this.categoryOptions[this.randomCategory], { exact: true })
      .first()
      .click();
  }

  async clickOnUpdateButton() {
    await this.updateButton.click();
  }

  async validateFolderInListView() {
    let folderList: string[] = [];
    let filteredList: string[] = [];
    let tableData = await this.table.innerText();
    let allRecordsArray = tableData.split("\n");
    allRecordsArray.splice(0, 1);
    folderList = allRecordsArray.filter((element) => element.includes("\t"));
    for (let counter = 0; counter < folderList.length - 1; counter++) {
      filteredList.push(folderList[counter].replace("\t", ""));
    }
    await this.loader.first().waitFor();
    await this.waitForLoaderToHide();
    expect(filteredList[0], "Folder is not displayed as edited").toEqual(
      this.categoryOptions[this.randomCategory]
    );
  }

  async validateUpdateToastMessage() {
    expect(
      await this.alert.innerText(),
      "Update success toast message is not as expected"
    ).toEqual("Success\nDocument updated successfully");
  }

  async clickOnDeleteButton() {
    this.deleteButton.click();
  }

  async validateDeleteModalHeading() {
    await expect(
      this.deleteModalHeading,
      "Delete modal heading is not visible"
    ).toBeVisible();
  }

  async validateDeleteConfirmText() {
    expect(await this.deleteModalContent.innerText()).toEqual(
      "Are you sure you want to delete " + this.firstRecordFileName + "?"
    );
  }

  async validateConfirmButtonVisible() {
    await expect(
      this.confirmButton,
      "Confirm button is not visible"
    ).toBeVisible();
  }

  async validateBackgroundColourOfConfirmButton() {
    await expect(
      this.updateButton,
      "Background colour of the confirm button in delete modal is not as expected"
    ).toHaveAttribute("background-color", "rgb(219, 44, 102)");
  }

  async clickOnConfirmButton() {
    await this.confirmButton.click();
  }

  async waitForLoaderToShow() {
    await this.loader.waitFor();
  }

  async waitForLoaderToHide() {
    await this.loader.waitFor({ state: "hidden" });
  }

  async validateDeleteToastMessage() {
    expect(
      await this.alert.innerText(),
      "Delete success toast message is not as expected"
    ).toEqual("Success\nFile deleted successfully");
  }

  async validateHelpTextOnDragAndDrop() {
    await expect(
      this.helpTextDragAndDrop,
      "Help text for drag and drop is not visible"
    ).toBeVisible();
  }

  async dragAndDropFile() {
    // Read your file into a buffer.
    const buffer = readFileSync("./Sample.pdf");

    // Create the DataTransfer and File
    const dataTransfer = await this.page.evaluateHandle((data) => {
      const dt = new DataTransfer();
      // Convert the buffer to a hex array
      const file = new File([data.toString("hex")], "Sample.pdf", {
        type: "application/pdf",
      });
      dt.items.add(file);
      return dt;
    }, buffer);

    // Now dispatch
    await this.page.dispatchEvent("[data-testid='empty-detail']", "drop", {
      dataTransfer,
    });
  }

  async openUploadModal(filePath: string) {
    await this.uploadInput.setInputFiles(filePath);
  }

  async validateFileNameInUploadModal(fileName: string) {
    expect(
      await this.fileNameInUploadModal.innerText(),
      "File name is not displayed in upload modal"
    ).toMatch(fileName);
  }

  async validateHeadingInUploadModal() {
    await expect(
      this.uploadModalHeading,
      "Heading of the upload modal is not as expected"
    ).toBeVisible();
  }

  async validateSubHeadingInUploadModal() {
    await expect(
      this.uploadModalSubHeading,
      "Sub heading of the upload modal is not as expected"
    ).toBeVisible();
  }

  async validateNoDefaultFolderSelected() {
    expect(
      await this.uploadCategory.innerText(),
      "By default no folder selected state is invalid"
    ).toEqual("Select a folder");
  }

  async validateXButtonToRemoveDocument() {
    await expect(
      this.xButtonForDocument,
      "X button is not visible for document"
    ).toBeVisible();
  }

  async removeFile() {
    await this.xButtonForDocument.click();
  }

  async validateFileRemoved(fileName: string) {
    await expect(
      this.fileNameInUploadModal,
      "File is not removed"
    ).toBeHidden();
  }

  async validateUploadButtonDisabled() {
    await expect(
      this.uploadButton,
      "Upload button is not disabled"
    ).toBeDisabled();
  }

  async validateUploadButtonEnabled() {
    await expect(
      this.uploadButton,
      "Upload button is not enabled"
    ).toBeEnabled();
  }

  async selectRandomFolder() {
    await this.uploadCategory.click();
    await this.page
      .getByTitle(this.categoryOptions[this.randomCategory])
      .locator("div")
      .click();
  }
}
