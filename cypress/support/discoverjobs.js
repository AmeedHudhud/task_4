export const LOCATORS = {
  inputFieldSkills:
    '[placeholder="Search by any field (e.g skills, title, etc.)"]',
  firstJob: '[data-id="job0-first-CTA"]',
  pageRoot: "#root",
  companiesMenu: '[data-id="jobs-DDHeaderWrapper"]',
  experienceRangeMenu: '[data-id="DropdownHero"]',
  inputFieldLocation: '[placeholder="Job location"]',
  remote: '[type="checkbox"]',
  inputFieldCompany: '[placeholder="Search company"]',
  filteredCompanyList: "label input",
};
export const INFORMATION = {
  SKILLS: {
    VALID_SKILL: "Java",
    INVALID_SKILL: "nothing",
  },
  COMPANY: {
    withJob: {
      name: "FedEx",
    },
    withoutJob: {
      name: "Talent500.",
    },
  },
  EXPERIENCE: {
    RANGE1: "0 - 1 years",
    RANGE2: "1 - 3 years",
  },
  LOCATION: {
    withJob: {
      name: "Hyderabad",
    },
    withoutJob: {
      name: "Palestine",
    },
  },
  REMOTE: {
    NAME: "Remote",
  },
};
export const TEST_CONSTANTS = {
  searchButton: "Search",
};
export const MESSAGE = {
  NO_JOB: "Ah, no jobs for these filters right now.",
};
export const redirectToInformationPage = (locator) => {
  cy.get(locator).then(($el) => {
    const url = $el.prop("href");
    cy.visit(url);
  });
};
export const verifyInformation = (value) => {
  if (Array.isArray(value)) {
    value.forEach((val) => {
      cy.get(LOCATORS.pageRoot).should("contain", val);
    });
  } else {
    cy.get(LOCATORS.pageRoot).should("contain", value);
  }
};
export const clickButton = (locator, text = false) => {
  if (!text) {
    cy.get(locator).click({ force: true });
  } else {
    cy.contains(locator).click({ force: true });
  }
};
export const selectMenu = (menu, information) => {
  clickButton(menu);
  cy.contains(information).click();
};
export const verifyCompany = (name) => {
  cy.get(LOCATORS.filteredCompanyList).then((input) => {
    expect(input.attr("name")).to.equal(name);
  });
};
export const verifyTextExist = (value) => {
  cy.get(LOCATORS.pageRoot).should("contain", value);
};
