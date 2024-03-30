export const experience = [
     '0 - 1 years',
     '1 - 3 years',
     '3 - 6 years',
     '6 - 10 years'
]

export const redirectToInformationPage = (locator) => {
    cy.get(locator).then(($el) => {
        const url = $el.prop('href');
        cy.visit(url); 
      });
}
export const verifyInformation = (value, locator) => {
    // Check if the value is an array
    if (Array.isArray(value)) {
      // Iterate over each value in the array
      value.forEach(val => {
        // Use Cypress command to verify each value
        cy.get(locator).should('contain', val);
      });
    } else {
      // If the value is not an array, directly verify it
      cy.get(locator).should('contain', value);
    }
  };
export const clickButton = (locator) => {
    cy.get(locator).click();
}
export const selectMenu = (menu,information) => {
    clickButton(menu)
    cy.contains(information).click();
} 
export const verifyCompany = (locator,name) => {
    cy.get(locator).then((input) => {
        expect(input.attr("name")).to.equal(name);
      });
}