import { test } from "@playwright/test";
import { AdministrativeDocumentManager } from "../locators/administrative-document-manager";
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

test("Validate no preview text on files other than PDF or image", async ({
  page,
  baseURL,
}) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./README.md");
  await administrativeDocumentManager.openUnsupportedFile();
  await administrativeDocumentManager.validateNoPreviewText();
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

test("Validate default preview", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.validateDefaultPreview();
});

test("Validate pdf icon", async ({ page, baseURL }) => {
  await page.goto(`${baseURL}`);
  const sideMenu = new SideMenu(page);
  await sideMenu.openAdministrativeDocumentManager();
  const administrativeDocumentManager = new AdministrativeDocumentManager(page);
  await administrativeDocumentManager.uploadFileFromGivenPath("./Sample.pdf");
  await administrativeDocumentManager.validatePDFIcon();
});
