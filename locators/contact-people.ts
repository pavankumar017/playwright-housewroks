import { Locator, Page, expect } from "@playwright/test";
import { randomInt } from "crypto";
import { names, uniqueNamesGenerator } from "unique-names-generator";

export class ContactPeople {
  readonly page: Page;
  readonly randomFirstName: string;
  readonly randomLastName: string;
  readonly randomTenDigitNumber: string;
  readonly personType: string[];
  readonly title: string[];
  readonly randomMiddleName: string;
  readonly suffixDropdown: string[];
  readonly primarySpecialityDropdown: string[];
  readonly streetNumberList: string[];
  readonly streetNameList: string[];
  readonly cityNameList: string[];
  readonly stateNameList: string[];
  readonly zipCodeList: string[];
  readonly countryDropdown: string[];
  readonly createButton: Locator;
  readonly firstName: Locator;
  readonly middleName: Locator;
  readonly lastName: Locator;
  readonly type: Locator;
  readonly phoneNumber: Locator;
  readonly email: Locator;
  readonly editButton: Locator;
  readonly titleInput: Locator;
  readonly suffix: Locator;
  readonly suffixInput: Locator;
  readonly NPI: Locator;
  readonly primarySpecialityInput: Locator;
  readonly primarySpeciality: Locator;
  readonly otherSpeciality: Locator;
  readonly otherSpecialityInput: Locator;
  readonly fax: Locator;
  readonly addressLine1: Locator;
  readonly addressLine2: Locator;
  readonly city: Locator;
  readonly country: Locator;
  readonly stateCode: Locator;
  readonly zipCode: Locator;
  readonly organization: Locator;
  readonly organizationInput: Locator;
  readonly designation: Locator;
  readonly designationText: string;
  readonly linkButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.randomFirstName = uniqueNamesGenerator({
      dictionaries: [names],
    });
    this.randomLastName = uniqueNamesGenerator({
      dictionaries: [names],
    });
    this.randomTenDigitNumber = (
      Math.floor(Math.random() * 9000000000) + 1000000000
    ).toString();
    this.personType = [
      "Provider",
      "Social Worker",
      "Case Manager",
      "Office Administrator",
      "Nurse",
    ];
    this.title = [
      "Mx.",
      "Mr.",
      "Mrs.",
      "Miss.",
      "Ms.",
      "Mstr.",
      "Dr.",
      "Prof.",
      "Rev.",
      "Sir",
      "Sister",
    ];
    this.randomMiddleName = uniqueNamesGenerator({
      dictionaries: [names],
    });
    this.suffixDropdown = [
      "I",
      "II",
      "III",
      "IV",
      "V",
      "Jr",
      "Sr",
      "DDS",
      "Esq",
      "PhD",
      "Ret",
      "RN",
      "DO",
      "MD",
    ];
    this.primarySpecialityDropdown = [
      "Psychiatry",
      "Endocrinology",
      "Chiropractic",
      "Otolaryngology",
      "Nephrology",
      "Family Practice",
      "Cardiovascular Disease (cardiology)",
      "Physical Therapy",
    ];
    this.streetNumberList = [
      "25489",
      "87459",
      "35478",
      "15975",
      "95125",
      "78965",
    ];
    this.streetNameList = [
      "A street",
      "B street",
      "C street",
      "D street",
      "E street",
      "F street",
    ];
    this.cityNameList = [
      "Riyadh",
      "Dammam",
      "Jedda",
      "Tabouk",
      "Makka",
      "Maddena",
      "Haiel",
    ];
    this.stateNameList = [
      "Qassem State",
      "North State",
      "East State",
      "South State",
      "West State",
    ];
    this.zipCodeList = ["28889", "96459", "35748", "15005", "99625", "71465"];
    this.countryDropdown = [
      "Afghanistan",
      "Albania",
      "Algeria",
      "American Samoa",
      "Andorra",
      "Angola",
      "Anguilla",
      "Antarctica",
      "Antigua and Barbuda",
      "Argentina",
      "Armenia",
      "Aruba",
      "Australia",
      "Austria",
      "Azerbaijan",
      "Bahamas (the)",
      "Bahrain",
      "Bangladesh",
      "Barbados",
      "Belarus",
      "Belgium",
      "Belize",
      "Benin",
      "Bermuda",
      "Bhutan",
      "Bolivia (Plurinational State of)",
      "Bonaire, Sint Eustatius and Saba",
      "Bosnia and Herzegovina",
      "Botswana",
      "Bouvet Island",
      "Brazil",
      "British Indian Ocean Territory (the)",
      "Brunei Darussalam",
      "Bulgaria",
      "Burkina Faso",
      "Burundi",
      "Cabo Verde",
      "Cambodia",
      "Cameroon",
      "Canada",
      "Cayman Islands (the)",
      "Central African Republic (the)",
      "Chad",
      "Chile",
      "China",
      "Christmas Island",
      "Cocos (Keeling) Islands (the)",
      "Colombia",
      "Comoros (the)",
      "Congo (the Democratic Republic of the)",
      "Congo (the)",
      "Cook Islands (the)",
      "Costa Rica",
      "Croatia",
      "Cuba",
      "Curaçao",
      "Cyprus",
      "Czechia",
      "Côte d'Ivoire",
      "Denmark",
      "Djibouti",
      "Dominica",
      "Dominican Republic (the)",
      "Ecuador",
      "Egypt",
      "El Salvador",
      "Equatorial Guinea",
      "Eritrea",
      "Estonia",
      "Eswatini",
      "Ethiopia",
      "Falkland Islands (the) [Malvinas]",
      "Faroe Islands (the)",
      "Fiji",
      "Finland",
      "France",
      "French Guiana",
      "French Polynesia",
      "French Southern Territories (the)",
      "Gabon",
      "Gambia (the)",
      "Georgia",
      "Germany",
      "Ghana",
      "Gibraltar",
      "Greece",
      "Greenland",
      "Grenada",
      "Guadeloupe",
      "Guam",
      "Guatemala",
      "Guernsey",
      "Guinea",
      "Guinea-Bissau",
      "Guyana",
      "Haiti",
      "Heard Island and McDonald Islands",
      "Holy See (the)",
      "Honduras",
      "Hong Kong",
      "Hungary",
      "Iceland",
      "India",
      "Indonesia",
      "Iran (Islamic Republic of)",
      "Iraq",
      "Ireland",
      "Isle of Man",
      "Israel",
      "Italy",
      "Jamaica",
      "Japan",
      "Jersey",
      "Jordan",
      "Kazakhstan",
      "Kenya",
      "Kiribati",
      "Korea (the Democratic People's Republic of)",
      "Korea (the Republic of)",
      "Kuwait",
      "Kyrgyzstan",
      "Lao People's Democratic Republic (the)",
      "Latvia",
      "Lebanon",
      "Lesotho",
      "Liberia",
      "Libya",
      "Liechtenstein",
      "Lithuania",
      "Luxembourg",
      "Macao",
      "Madagascar",
      "Malawi",
      "Malaysia",
      "Maldives",
      "Mali",
      "Malta",
      "Marshall Islands (the)",
      "Martinique",
      "Mauritania",
      "Mauritius",
      "Mayotte",
      "Mexico",
      "Micronesia (Federated States of)",
      "Moldova (the Republic of)",
      "Monaco",
      "Mongolia",
      "Montenegro",
      "Montserrat",
      "Morocco",
      "Mozambique",
      "Myanmar",
      "Namibia",
      "Nauru",
      "Nepal",
      "Netherlands (the)",
      "New Caledonia",
      "New Zealand",
      "Nicaragua",
      "Niger (the)",
      "Nigeria",
      "Niue",
      "Norfolk Island",
      "North Macedonia",
      "Northern Mariana Islands (the)",
      "Norway",
      "Oman",
      "Pakistan",
      "Palau",
      "Palestine, State of",
      "Panama",
      "Papua New Guinea",
      "Paraguay",
      "Peru",
      "Philippines (the)",
      "Pitcairn",
      "Poland",
      "Portugal",
      "Puerto Rico",
      "Qatar",
      "Romania",
      "Russian Federation (the)",
      "Rwanda",
      "Réunion",
      "Saint Barthélemy",
      "Saint Helena, Ascension and Tristan da Cunha",
      "Saint Kitts and Nevis",
      "Saint Lucia",
      "Saint Martin (French part)",
      "Saint Pierre and Miquelon",
      "Saint Vincent and the Grenadines",
      "Samoa",
      "San Marino",
      "Sao Tome and Principe",
      "Saudi Arabia",
      "Senegal",
      "Serbia",
      "Seychelles",
      "Sierra Leone",
      "Singapore",
      "Sint Maarten (Dutch part)",
      "Slovakia",
      "Slovenia",
      "Solomon Islands",
      "Somalia",
      "South Africa",
      "South Georgia and the South Sandwich Islands",
      "South Sudan",
      "Spain",
      "Sri Lanka",
      "Sudan (the)",
      "Suriname",
      "Svalbard and Jan Mayen",
      "Sweden",
      "Switzerland",
      "Syrian Arab Republic (the)",
      "Taiwan (Province of China)",
      "Tajikistan",
      "Tanzania, the United Republic of",
      "Thailand",
      "Timor-Leste",
      "Togo",
      "Tokelau",
      "Tonga",
      "Trinidad and Tobago",
      "Tunisia",
      "Turkey",
      "Turkmenistan",
      "Turks and Caicos Islands (the)",
      "Tuvalu",
      "Uganda",
      "Ukraine",
      "United Arab Emirates (the)",
      "United Kingdom of Great Britain and Northern Ireland (the)",
      "United States Minor Outlying Islands (the)",
      "United States of America (the)",
      "Uruguay",
      "Uzbekistan",
      "Vanuatu",
      "Venezuela (Bolivarian Republic of)",
      "Viet Nam",
      "Virgin Islands (British)",
      "Virgin Islands (U.S.)",
      "Wallis and Futuna",
      "Western Sahara*",
      "Yemen",
      "Zambia",
      "Zimbabwe",
      "Åland Islands",
    ];
    this.createButton = this.page.getByRole("button", { name: "Create" });
    this.firstName = this.page.getByLabel("First Name");
    this.middleName = this.page.getByLabel("Middle Name");
    this.lastName = this.page.getByLabel("Last Name");
    this.type = this.page.getByLabel("Type");
    this.phoneNumber = this.page.getByLabel("Phone Number");
    this.email = this.page.getByLabel("Email");
    this.editButton = this.page.getByRole("button", { name: "Edit" });
    this.titleInput = this.page.locator("[data-testid='title'] input");
    this.suffix = this.page.locator("[data-testid='suffix']");
    this.suffixInput = this.page.locator("[data-testid='suffix'] input");
    this.NPI = this.page.getByLabel("NPI");
    this.primarySpecialityInput = this.page.locator(
      "[data-testid='primary_speciality_id'] input"
    );
    this.primarySpeciality = this.page.locator(
      "[data-testid='primary_speciality_id']"
    );
    this.otherSpeciality = this.page.locator(
      "[data-testid='other_specialities_ids']"
    );
    this.otherSpecialityInput = this.page.locator(
      "[data-testid='other_specialities_ids'] input"
    );
    this.fax = this.page.getByLabel("Fax");
    this.addressLine1 = this.page.getByLabel("Address Line 1");
    this.addressLine2 = this.page.getByLabel("Address Line 2");
    this.city = this.page.getByLabel("City");
    this.country = this.page.getByLabel("Country");
    this.stateCode = this.page.getByLabel("State Code");
    this.zipCode = this.page.getByLabel("Zip Code");
    this.organization = this.page.getByTestId("organization-select");
    this.organizationInput = this.page.locator(
      "[data-testid='organization-select'] input"
    );
    this.designation = this.page.getByLabel("Designation");
    this.designationText = "Test Engineer Analyst";
    this.linkButton = this.page.getByRole("button", { name: "Link" });
  }

  async randomDropdownSelection(dropdown: string[]) {
    return dropdown[randomInt(0, dropdown.length - 1)].toString();
  }

  async openCreateForm() {
    await this.createButton.click();
  }

  async enterFirstName() {
    await this.firstName.fill(this.randomFirstName);
  }

  async enterMiddleName() {
    await this.middleName.fill(this.randomMiddleName);
  }

  async enterLastName() {
    await this.lastName.fill(this.randomLastName);
  }

  async selectType() {
    await this.type.click();
    await this.page
      .getByText(await this.randomDropdownSelection(this.personType), {
        exact: true,
      })
      .click();
  }

  async enterPhoneNumber() {
    await this.phoneNumber.fill(this.randomTenDigitNumber);
  }

  async enterEmail() {
    await this.email.fill(
      this.randomFirstName + this.randomLastName + "@gmail.com"
    );
  }

  async clickOnCreateButton() {
    await this.createButton.click();
  }

  async validateDetailView() {
    await this.editButton.waitFor();
    await expect(this.editButton, "Edit button is not visible").toBeVisible();
  }

  async enterMandatoryFields() {
    await this.enterFirstName();
    await this.enterLastName();
    await this.selectType();
    await this.enterPhoneNumber();
    await this.enterEmail();
  }

  async selectTitle() {
    let randomTitle = this.randomDropdownSelection(this.title);
    await this.titleInput.fill(await randomTitle);
    await this.page.getByText(await randomTitle, { exact: true }).click();
  }

  async selectSuffix() {
    let randomSuffix = this.randomDropdownSelection(this.suffixDropdown);
    await this.suffix.click();
    await this.suffixInput.fill(await randomSuffix);
    await this.page.getByText(await randomSuffix, { exact: true }).click();
  }

  async enterNPI() {
    await this.NPI.fill(this.randomTenDigitNumber);
  }

  async selectPrimarySpeciality() {
    let randomPrimarySpeciality = this.randomDropdownSelection(
      this.primarySpecialityDropdown
    );
    await this.primarySpeciality.click();
    await this.primarySpecialityInput.fill(
      (await randomPrimarySpeciality).toString()
    );
    await this.page
      .getByText(await randomPrimarySpeciality, { exact: true })
      .click();
  }

  async selectOtherSpeciality() {
    let randomOtherSpeciality = this.randomDropdownSelection(
      this.primarySpecialityDropdown
    );
    await this.otherSpeciality.click();
    await this.otherSpecialityInput.fill(await randomOtherSpeciality);
    await this.otherSpeciality.press("Enter");
  }

  async enterFax() {
    await this.fax.fill(this.randomTenDigitNumber);
  }

  async enterAddress() {
    let randomCountry = this.randomDropdownSelection(this.countryDropdown);

    await this.addressLine1.fill(
      await this.randomDropdownSelection(this.streetNameList)
    );
    await this.addressLine2.fill(
      await this.randomDropdownSelection(this.streetNumberList)
    );
    await this.city.fill(await this.randomDropdownSelection(this.cityNameList));
    await this.country.fill(await randomCountry);
    await this.page.getByText(await randomCountry, { exact: true }).click();
    await this.stateCode.fill(
      await this.randomDropdownSelection(this.stateNameList)
    );
    await this.zipCode.fill(
      await this.randomDropdownSelection(this.zipCodeList)
    );
  }

  async waitForLoaderToShow() {
    await this.page.locator(".ant-spin").first().waitFor();
  }

  async waitForLoaderToHide() {
    await this.page.locator(".ant-spin").first().waitFor({ state: "hidden" });
  }

  async linkOrganization() {
    await this.organization.click();
    await this.organizationInput.fill("a");
    await this.waitForLoaderToShow();
    await this.waitForLoaderToHide();
    await this.organization.press("ArrowDown");
    await this.organization.press("Enter");
    await this.designation.fill(this.designationText);
    await this.linkButton.click();
  }

  async enterOptionalFields() {
    await this.selectTitle();
    await this.enterMiddleName();
    await this.selectSuffix();
    await this.enterNPI();
    await this.selectPrimarySpeciality();
    await this.selectOtherSpeciality();
    await this.enterFax();
    await this.enterAddress();
    await this.linkOrganization();
  }
}
