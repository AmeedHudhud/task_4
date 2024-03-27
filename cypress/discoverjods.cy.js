import { apiLogin } from "./support/loginhelper";
let x
const VALID_CREDENTIALS = {
    email: "hudhudameed@gmail.com",
    password: "ameed0595",
};

describe('discover jobs',()=>{
    before(()=>{
        apiLogin(VALID_CREDENTIALS.email, VALID_CREDENTIALS.password).then((cookie)=>{
            x=cookie
        });
    })
    beforeEach(()=>{
        cy.setCookie('authToken', x);
        cy.visit('https://talent500.co/jobs');
        cy.wait(3000)
    })
    it('Verify the ability to filter jobs by input search field', () => {
        cy.get('[placeholder="Search by any field (e.g skills, title, etc.)"]').clear().type('QA');
        cy.contains('Search').click();
        cy.wait(2000)

        cy.get('[data-id="job6-first-CTA"]').then(($el) => {
          const url = $el.prop('href');
          cy.visit(url); 
        });
        cy.wait(3000)
        cy.get('#root').should('contain','QA')
      });

      it('Verify the ability to filter jobs by comapany',()=>{
        cy.get('[data-id="jobs-DDHeaderWrapper"]').click()
        cy.get('#0b822ec7-8a03-4c56-9bfd-4ec7ad73eeee').click()
        cy.wait(2000)
        cy.get('[data-id="job0-first-CTA"]').then(($el) => {
            const url = $el.prop('href');
            cy.visit(url); 
          });
          cy.wait(3000)
          cy.get('#root').should('contain','HME')
      })
      it('Verify the ability to filter jobs by Experience',()=>{
        cy.get('[data-id="DropdownHero"]').click()
        cy.get('[placeholder="Experience"]').contains('0 - 1 years').click()
        cy.wait(2000)
        cy.get('[data-id="job0-first-CTA"]').then(($el) => {
            const url = $el.prop('href');
            cy.visit(url); 
          });
          cy.wait(3000)
          cy.get('#root').should('contain','1 - 3 years')
      })
      it('Verify the ability to filter jobs by location',()=>{
        cy.get('[placeholder="Job location"]').clear().type('Bengaluru')
        cy.get('[data-id="job1-first-CTA"]').then(($el) => {
            const url = $el.prop('href');
            cy.visit(url); 
          });
          cy.wait(3000)
          cy.get('#root').should('contain','Bengaluru')
      })
      it('test',()=>{
        cy.get('[placeholder="Search by any field (e.g skills, title, etc.)"]').clear().type('java');
        cy.get('[data-id="jobs-DDHeaderWrapper"]').click()
        cy.get('#44d27631-1669-4da8-8524-a71fcb3aaaef').click()
        cy.get('[data-id="DropdownHero"]').click()
        cy.get('[placeholder="Experience"]').contains('0 - 1 years').click()
        cy.get('[placeholder="Job location"]').clear().type('Hyderabad')
        cy.contains('Search').click();

        cy.wait(3000)
        cy.get('[data-id="job0-first-CTA"]').then(($el) => {
            const url = $el.prop('href');
            cy.visit(url); 
          });
          cy.wait(3000)
          cy.get('#root').should('contain','Java').and('contain','FedEx').and('contain','1 - 4 years').and('contain','Hyderabad')
      })
      it.only('remote',()=>{
        cy.get('[type="checkbox"]').check({force: true})
        cy.wait(3000)
        cy.get('[data-id="job0-first-CTA"]').then(($el) => {
            const url = $el.prop('href');
            cy.visit(url); 
          });
          cy.wait(3000)
          cy.get('#root').should('contain','Remote')
      })

     
})