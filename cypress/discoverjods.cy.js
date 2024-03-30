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
    enterFieldValue("QA",'[placeholder="Search by any field (e.g skills, title, etc.)"]');
    cy.contains("Search").click();
    cy.wait(2000);
    discoverjobhelper.redirectToInformationPage('[data-id="job6-first-CTA"]');
    cy.wait(3000);
    discoverjobhelper.verifyInformation("QA", "#root");
  });
  it("Verify the ability to filter jobs by comapany", () => {
    discoverjobhelper.selectMenu('[data-id="jobs-DDHeaderWrapper"]','HME')
    cy.wait(2000);
    discoverjobhelper.redirectToInformationPage('[data-id="job0-first-CTA"]');
    cy.wait(3000);
    discoverjobhelper.verifyInformation("HME", "#root");
  });
  it("Verify the ability to filter jobs by Experience", () => {
    discoverjobhelper.selectMenu('[data-id="DropdownHero"]',discoverjobhelper.experience[0])
    cy.wait(2000);
    discoverjobhelper.redirectToInformationPage('[data-id="job0-first-CTA"]');
    cy.wait(3000);
    discoverjobhelper.verifyInformation("1 - 3 years", "#root");
  });
  it("Verify the ability to filter jobs by location", () => {
    enterFieldValue("Bengaluru",'[placeholder="Job location"]');
    discoverjobhelper.redirectToInformationPage('[data-id="job1-first-CTA"]');
    cy.wait(3000);
    discoverjobhelper.verifyInformation("Bengaluru", "#root");
  });
  it("test", () => {
    enterFieldValue("java",'[placeholder="Search by any field (e.g skills, title, etc.)"]');
    discoverjobhelper.selectMenu('[data-id="jobs-DDHeaderWrapper"]','FedEx')
    discoverjobhelper.selectMenu('[data-id="DropdownHero"]',discoverjobhelper.experience[0])
    enterFieldValue("Hyderabad",'[placeholder="Job location"]');
    cy.contains("Search").click();
    cy.wait(3000);
    discoverjobhelper.redirectToInformationPage('[data-id="job0-first-CTA"]')
    cy.wait(3000);
    discoverjobhelper.verifyInformation(["Java","FedEx","1 - 4 years","Hyderabad"],"#root")
  });
  it("remote", () => {
    cy.get('[type="checkbox"]').click({ force: true })
    cy.wait(3000);
    discoverjobhelper.redirectToInformationPage('[data-id="job0-first-CTA"]')
    cy.wait(3000);
    discoverjobhelper.verifyInformation("Remote","#root");
  });
  it("filter company", () => {
    discoverjobhelper.clickButton('[data-id="jobs-DDHeaderWrapper"]')
    enterFieldValue('hme','[placeholder="Search company"]')
    discoverjobhelper.verifyCompany("label input","HME")
  });
  it.only("Searching for something that does not exist//company",()=>{
    
  })
  it.only("Searching for something that does not exist//input search",()=>{
    
  })

});
