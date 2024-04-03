import { apiLogin } from "./support/loginhelper";
import { enterFieldValue } from "./support/loginhelper";
import * as discoverjobhelper from "./support/discoverjobs";
import { VALID_CREDENTIALS } from "./login.cy";
let x;

describe("discover jobs", () => {
  before(() => {
    apiLogin(VALID_CREDENTIALS.email, VALID_CREDENTIALS.password).then(
      (cookie) => {
        x = cookie;
      }
    );
  });
  beforeEach(() => {
    cy.setCookie("authToken", x);
    cy.visit("https://talent500.co/jobs");
    cy.wait(3000);
  });
  
  it("Verify the ability to filter jobs by input search field", () => {
    enterFieldValue(discoverjobhelper.INFORMATION.SKILLS.VALID_SKILL,discoverjobhelper.LOCATORS.inputFieldSkills);
    discoverjobhelper.clickButton(discoverjobhelper.TEST_CONSTANTS.searchButton,true)
    cy.wait(2000);
    discoverjobhelper.redirectToInformationPage(discoverjobhelper.LOCATORS.firstJob);
    cy.wait(3000);
    discoverjobhelper.verifyInformation(discoverjobhelper.INFORMATION.SKILLS.VALID_SKILL);
  });
  it("Verify the ability to filter jobs by comapany", () => {
    discoverjobhelper.selectMenu(discoverjobhelper.LOCATORS.companiesMenu,discoverjobhelper.INFORMATION.COMPANY.withJob.name)
    cy.wait(2000);
    discoverjobhelper.redirectToInformationPage(discoverjobhelper.LOCATORS.firstJob);
    cy.wait(3000);
    discoverjobhelper.verifyInformation(discoverjobhelper.INFORMATION.COMPANY.withJob.name);
  });
  it("Verify the ability to filter jobs by Experience", () => {
    discoverjobhelper.selectMenu(discoverjobhelper.LOCATORS.experienceRangeMenu,discoverjobhelper.INFORMATION.EXPERIENCE.RANGE1);
    cy.wait(2000);
    discoverjobhelper.redirectToInformationPage(discoverjobhelper.LOCATORS.firstJob);
    cy.wait(3000);
    discoverjobhelper.verifyInformation(discoverjobhelper.INFORMATION.EXPERIENCE.RANGE2);
  });
  it("Verify the ability to filter jobs by location", () => {
    enterFieldValue(discoverjobhelper.INFORMATION.LOCATION.withJob.name,discoverjobhelper.LOCATORS.inputFieldLocation);
    cy.wait(2000);
    discoverjobhelper.redirectToInformationPage(discoverjobhelper.LOCATORS.firstJob);
    cy.wait(3000);
    discoverjobhelper.verifyInformation(discoverjobhelper.INFORMATION.LOCATION.withJob.name);
  });
  it("test", () => {
    enterFieldValue(discoverjobhelper.INFORMATION.SKILLS.VALID_SKILL,discoverjobhelper.LOCATORS.inputFieldSkills);
    discoverjobhelper.selectMenu(discoverjobhelper.LOCATORS.companiesMenu,discoverjobhelper.INFORMATION.COMPANY.withJob.name)
    discoverjobhelper.selectMenu(discoverjobhelper.LOCATORS.experienceRangeMenu,discoverjobhelper.INFORMATION.EXPERIENCE.RANGE1)
    enterFieldValue(discoverjobhelper.INFORMATION.LOCATION.withJob.name,discoverjobhelper.LOCATORS.inputFieldLocation);
    discoverjobhelper.clickButton(discoverjobhelper.TEST_CONSTANTS.searchButton,true)
    cy.wait(3000);
    discoverjobhelper.redirectToInformationPage(discoverjobhelper.LOCATORS.firstJob)
    cy.wait(3000);
    discoverjobhelper.verifyInformation([discoverjobhelper.INFORMATION.SKILLS.VALID_SKILL,discoverjobhelper.INFORMATION.COMPANY.withJob.name,discoverjobhelper.INFORMATION.EXPERIENCE.RANGE2,discoverjobhelper.INFORMATION.LOCATION.withJob.name])
  });
  it("remote", () => {
    discoverjobhelper.clickButton(discoverjobhelper.LOCATORS.remote)
    cy.wait(3000);
    discoverjobhelper.redirectToInformationPage(discoverjobhelper.LOCATORS.firstJob)
    cy.wait(3000);
    discoverjobhelper.verifyInformation(discoverjobhelper.INFORMATION.REMOTE.NAME);
  });
  it("filter company", () => {
    discoverjobhelper.clickButton(discoverjobhelper.LOCATORS.companiesMenu)
    enterFieldValue(discoverjobhelper.INFORMATION.COMPANY.withJob.name,discoverjobhelper.LOCATORS.inputFieldCompany)
    discoverjobhelper.verifyCompany(discoverjobhelper.INFORMATION.COMPANY.withJob.name)
  });
  it("Searching for something that does not exist//company",()=>{
    discoverjobhelper.selectMenu(discoverjobhelper.LOCATORS.companiesMenu,discoverjobhelper.INFORMATION.COMPANY.withoutJob.name)
    discoverjobhelper.verifyTextExist(discoverjobhelper.MESSAGE.NO_JOB)
  })
  it("Searching for something that does not exist//input search",()=>{
    enterFieldValue(discoverjobhelper.INFORMATION.SKILLS.INVALID_SKILL,discoverjobhelper.LOCATORS.inputFieldSkills);
    discoverjobhelper.clickButton(discoverjobhelper.TEST_CONSTANTS.searchButton,true)
    discoverjobhelper.verifyTextExist(discoverjobhelper.MESSAGE.NO_JOB)
  })
  it("Searching for something that does not exist//location",()=>{
    enterFieldValue(discoverjobhelper.INFORMATION.LOCATION.withoutJob.name,discoverjobhelper.LOCATORS.inputFieldLocation);
    discoverjobhelper.verifyTextExist(discoverjobhelper.MESSAGE.NO_JOB)
  })
});
