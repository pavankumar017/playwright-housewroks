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

test("Validate i icon data", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
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
