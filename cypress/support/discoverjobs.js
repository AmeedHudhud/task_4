export const LOCATORS = {
  inputFieldSkills:'[placeholder="Search by any field (e.g skills, title, etc.)"]',
  firstJob: '[data-id="job0-first-CTA"]',
  pageRoot: "#root",
  companiesMenu: '[data-id="jobs-DDHeaderWrapper"]',
  experienceRangeMenu: '[data-id="DropdownHero"]',
  inputFieldLocation: '[placeholder="Job location"]',
  remote: '[type="checkbox"]',
  inputFieldCompany: '[placeholder="Search company"]',
  filteredCompanyList: "label input",
  searchButton: "Search",
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
      invalidName : 'qqq'
    },
  },
  EXPERIENCE: {
    RANGE1: "0 - 1 years",
    RANGE2: "1 - 4 years",
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
export const MESSAGE = {
  NO_JOB: "Ah, no jobs for these filters right now.",
};
export const redirectToInformationPage = (locator) => {
  cy.get(locator).then(($el) => {
    const url = $el.prop("href");
    cy.visit(url);
  });
};
export const verifyInformationExistance = (information) =>{
  information.forEach((value)=>{
    if(value.exist){
      cy.get(LOCATORS.pageRoot).should("contain", value.name);
    }else{
      cy.get(LOCATORS.pageRoot).should("not.contain", value.name);
    }
  })
}
export const clickButton = (locator, text = false) => {
  if (!text) {
    cy.get(locator).click({ force: true });
  } else {
    cy.contains(locator).click({ force: true });
  }
};
export const selectFromMenu = (menu, information) => {
  clickButton(menu);
  cy.contains(information).click();
};
export const verifyCompanyExistance = (name,existance=true) => {
  cy.contains(name).should((el)=>{
    if(existance){
      expect(el.length).not.to.equal(0)
    }else{
      expect(el.length).to.equal(0)
    }
    
  })
};
export const verifyTextExist = (value) => {
  cy.get(LOCATORS.pageRoot).should("contain", value);
};