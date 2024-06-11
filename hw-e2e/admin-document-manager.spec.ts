import { test } from "@playwright/test";
import { AdministrativeDocumentManager } from "../locators/administrative-document-manager";
import { CreatePatient } from "../locators/create-patient";
import { SideMenu } from "../locators/side-menu";

test("User should be able to see all options under administrative side menu", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.validateOptionsUnderAdministrative();
});

test("User should be able to open administrative document manager from side menu", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.validateAdministrativeDocumentManagerPage();
});

test("User should be able to see heading as 'Document Manager'", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.validateHeadingText();
});

test("Heading 'Document Manager' should have H5 font", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.validateHeadingFont();
});

test("Validate default preview", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.validateDefaultPreview();
});

test("Validate 'SHOWING FOLDER' label", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.validateFolderLabel();
});

test("Validate default folder selected should be 'All'", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.validateDefaultFolderSelected();
});

test("Validate the search placeholder in search bar", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.searchInFolderCategory();
  await administrativeDocumentManager.validateSearchPlaceholder();
});

test("Validate search in folder category", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.searchInFolderCategory();
  await administrativeDocumentManager.validateSearchInFolderCategory();
});

test("Validate all files are displayed when 'All' folder is selected", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFilesInEachDocumentCategory(
    "./Sample.pdf"
  );
  await administrativeDocumentManager.validateAllFilesDisplayed();
});

test("Validate files are displayed of selected folder", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.selectRandomCategory();
  await administrativeDocumentManager.uploadFileNWithinFolderView(
    "./Sample.pdf"
  );
  await administrativeDocumentManager.validateOnlySelectedFolderFilesDisplayed();
});

test("Validate search in list view", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.searchInListView("Sample.pdf");
  await administrativeDocumentManager.validateSearchInListView("Sample.pdf");
});

test("Validate no data search in list view", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.noDataSearchInListView();
  await administrativeDocumentManager.validateNoDataSearchInListView();
});

test("Validate pdf icon", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.validatePDFIcon();
});

test("Validate image icon", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadMultipleFiles([
    "./image1.png",
    "./image2.jpeg",
    "./image3.jpg",
  ]);
  await administrativeDocumentManager.searchInListView(".png");
  await administrativeDocumentManager.validateImageIcon();
  await administrativeDocumentManager.searchInListView(".jpeg");
  await administrativeDocumentManager.validateImageIcon();
  await administrativeDocumentManager.searchInListView(".jpg");
  await administrativeDocumentManager.validateImageIcon();
});

test("Validate unknown icon", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./README.md");
  await administrativeDocumentManager.validateUnknownIcon();
});

test("Validate ellipsis on long name", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath(
    "./Scenarios_-_List_2de599dac50a4b6cb3e7eeab89461e7f.md"
  );
  await administrativeDocumentManager.searchInListView(
    "Scenarios - List 2de599dac50a4b6cb3e7eeab89461e7f.md"
  );
  await administrativeDocumentManager.validateEllipsis(
    "Scenarios - List 2de599dac50a4b6cb3e7eeab89461e7f.md"
  );
});

test("Validate i icon data in list view", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.hoverOnIIconInListView();
  await administrativeDocumentManager.validateIIconData();
});

test("Validate search when user is on page other than page 1 ", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.navigateToNextPage();
  await administrativeDocumentManager.searchInListView("Sample.pdf");
  await administrativeDocumentManager.validateFirstPageIsActive();
  await administrativeDocumentManager.validateSearchInListView("Sample.pdf");
});

test("Validate page 1 should be displayed on change folder", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.navigateToNextPage();
  await administrativeDocumentManager.selectRandomCategory();
  await administrativeDocumentManager.validateFirstPageIsActive();
});

test("Validate total items in the footer", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.validateTotalItemsIsVisible();
});

test("Validate default pagination 10/page", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  const createPatient = new CreatePatient(page);
  await createPatient.validateDefaultPagination();
});

test("Validate pagination options", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  const createPatient = new CreatePatient(page);
  await createPatient.validatePaginationOptions();
});

test("Validate pagination", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.validatePagination();
});

test("Validate default sort", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.validateIIconData();
  await administrativeDocumentManager.validateDefaultSort("Sample.pdf");
});

test("Validate image preview", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./image1.png");
  await administrativeDocumentManager.openMentionedFile("image1.png");
  await administrativeDocumentManager.validateImagePreview();
});

test("Validate PDF preview", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.openMentionedFile("Sample.pdf");
  await administrativeDocumentManager.validatePDFPreview();
});

test("Validate no preview text on files other than PDF or image", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./README.md");
  await administrativeDocumentManager.searchInListView(".md");
  await administrativeDocumentManager.openUnsupportedFile();
  await administrativeDocumentManager.validateNoPreviewText();
});

test("Validate navigating to other page by clicking on page number", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.changeActivePage("2");
  await administrativeDocumentManager.validateActivePage("2");
});

test("'<' should be disabled when on first page", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.validatePreviousPageDisabled();
});

test("‘<’ should be enabled when user not on page 1 ", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.navigateToNextPage();
  await administrativeDocumentManager.validatePreviousPageEnabled();
});

test("'>’ should be disabled when user on the last page", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.goToLastPage();
  await administrativeDocumentManager.validateNextPageDisabled();
});

test("'>’ should be enabled to navigate user on the next page", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.validateNextPageEnabled();
});

test.skip("Validate background colour on hover any file", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.hoverOnFirstRecord();
  await administrativeDocumentManager.validateHighlightedRow();
});

test.skip("Validate background colour on click any file", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.validateHighlightedRow();
});

test("Validate i icon data in preview for image", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./image1.png");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.hoverOnIIconInPreview();
  await administrativeDocumentManager.validateIIconData();
});

test("Validate full screen hides list view for image", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./image1.png");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnFullScreen();
  await administrativeDocumentManager.validateExitFullScreenDisplayed();
  await administrativeDocumentManager.validateListViewNotDisplayed();
});

test("Validate download button should be visible in the preview", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.validateDownloadButtonVisible();
});

test("Validate filename in the preview", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.getFileNameOfFirstRecord();
  await administrativeDocumentManager.validateFileNameInPreview();
});

test("Validate i icon data in preview for PDF", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.hoverOnIIconInPreview();
  await administrativeDocumentManager.validateIIconData();
});

test("Validate full screen hides list view for PDF", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnFullScreen();
  await administrativeDocumentManager.validateExitFullScreenDisplayed();
  await administrativeDocumentManager.validateListViewNotDisplayed();
});

test("Validate exit full screen for PDF", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnFullScreen();
  await administrativeDocumentManager.validateEnterFullScreenDisplayed();
  await administrativeDocumentManager.validateListViewDisplayed();
});

test("Validate download button functionality", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnDownload();
  await administrativeDocumentManager.validateDownload();
});

test("Validate loader displayed before preview", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.validateLoaderDisplayed();
});

test("Validate edit modal should be displayed on click edit button", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnEditButton();
  await administrativeDocumentManager.validateUpdateButtonDisplayed();
});

test("Validate heading of the edit modal", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnEditButton();
  await administrativeDocumentManager.validateHeadingOfEditModal();
});

test("Validate help text in the edit modal", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnEditButton();
  await administrativeDocumentManager.validateHelpTextOfEditModal();
});

test("Validate folder selected should be same as file uploaded", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnEditButton();
  await administrativeDocumentManager.validateFolderInEditModal();
});

test("Validate heading of the selected documents in edit modal", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnEditButton();
  await administrativeDocumentManager.validateModalDocumentHeading();
});

test.skip("Validate colour of the file name in eit modal", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnEditButton();
  await administrativeDocumentManager.validateBackgroundColourOfFileName();
});

test("Validate cancel button text in edit modal", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnEditButton();
  await administrativeDocumentManager.validateCancelButtonVisible();
});

test("Validate edit modal is closed on click cancel button", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnEditButton();
  await administrativeDocumentManager.clickOnCancelButton();
  await administrativeDocumentManager.validateModalIsClosed();
});

test("Validate text of update button", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnEditButton();
  await administrativeDocumentManager.validateUpdateButtonDisplayed();
});

test.skip("Validate background colour of the update button in edit modal", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnEditButton();
  await administrativeDocumentManager.validateBackgroundColourOfUpdateButton();
});

test("Validate folder value on changing folder in list view", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnEditButton();
  await administrativeDocumentManager.changeFolder();
  await administrativeDocumentManager.clickOnUpdateButton();
  await administrativeDocumentManager.validateFolderInListView();
});

test("Validate success toast message after updating folder", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnEditButton();
  await administrativeDocumentManager.changeFolder();
  await administrativeDocumentManager.clickOnUpdateButton();
  await administrativeDocumentManager.validateUpdateToastMessage();
});

test("Validate delete modal is displayed on click delete", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnDeleteButton();
  await administrativeDocumentManager.validateDeleteModalHeading();
});

test("Validate content of the delete modal", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.getFileNameOfFirstRecord();
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnDeleteButton();
  await administrativeDocumentManager.validateDeleteConfirmText();
});

test("Validate text of the cancel button", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.getFileNameOfFirstRecord();
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnDeleteButton();
  await administrativeDocumentManager.validateCancelButtonVisible();
});

test("Validate edit modal should be closed on click cancel button", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.getFileNameOfFirstRecord();
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnDeleteButton();
  await administrativeDocumentManager.clickOnCancelButton();
  await administrativeDocumentManager.validateModalIsClosed();
});

test("Validate text of the confirm button on delete modal", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.getFileNameOfFirstRecord();
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnDeleteButton();
  await administrativeDocumentManager.validateConfirmButtonVisible();
});

test("Validate deletion of file", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath(
    "./temporaryFile.pdf"
  );
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnDeleteButton();
  await administrativeDocumentManager.clickOnConfirmButton();
  await administrativeDocumentManager.waitForLoaderToShow();
  await administrativeDocumentManager.waitForLoaderToHide();
  await administrativeDocumentManager.searchInListView("temporaryFile.pdf");
  await administrativeDocumentManager.validateNoDataSearchInListView();
});

test("Validate success toast message after deletion of file", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath(
    "./temporaryFile.pdf"
  );
  await administrativeDocumentManager.clickOnFirstRecord();
  await administrativeDocumentManager.clickOnDeleteButton();
  await administrativeDocumentManager.clickOnConfirmButton();
  await administrativeDocumentManager.waitForLoaderToShow();
  await administrativeDocumentManager.waitForLoaderToHide();
  await administrativeDocumentManager.validateDeleteToastMessage();
});

test.skip("Validate help text on drag and drop file upload", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.dragAndDropFile();
  await administrativeDocumentManager.validateHelpTextOnDragAndDrop();
});

test("Validate file name in file upload modal", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.openUploadModal("./image1.png");
  await administrativeDocumentManager.validateFileNameInUploadModal(
    "image1.png"
  );
});

test("Validate heading in the upload modal", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.openUploadModal("./image1.png");
  await administrativeDocumentManager.validateHeadingInUploadModal();
});

test("Validate sub heading in the upload modal", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.openUploadModal("./image1.png");
  await administrativeDocumentManager.validateSubHeadingInUploadModal();
});

test("Validate no folder should be selected be default in the upload modal", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.openUploadModal("./image1.png");
  await administrativeDocumentManager.validateNoDefaultFolderSelected();
});

test("Validate heading of the selected files in upload modal", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.openUploadModal("./image1.png");
  await administrativeDocumentManager.validateModalDocumentHeading();
});

test("Validate 'x' displayed for file in upload modal", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.openUploadModal("./image1.png");
  await administrativeDocumentManager.validateXButtonToRemoveDocument();
});

test("Validate file is removed on click 'x' button in upload modal", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.openUploadModal("./image1.png");
  await administrativeDocumentManager.removeFile();
  await administrativeDocumentManager.validateFileRemoved("image1.png");
});

test("Validate cancel button text in upload modal", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.openUploadModal("./image1.png");
  await administrativeDocumentManager.validateCancelButtonVisible();
});

test("Validate upload modal should be closed on click cancel button", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.openUploadModal("./image1.png");
  await administrativeDocumentManager.clickOnCancelButton();
  await administrativeDocumentManager.validateModalIsClosed();
});

test("Validate upload button should be disabled be default", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.openUploadModal("./image1.png");
  await administrativeDocumentManager.validateUploadButtonDisabled();
});

test("Validate upload button should be enabled after selecting the folder", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.openUploadModal("./image1.png");
  await administrativeDocumentManager.selectRandomFolder();
  await administrativeDocumentManager.validateUploadButtonEnabled();
});
