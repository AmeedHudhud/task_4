import { apiLogin } from "./support/loginhelper";
// import { VALID_CREDENTIALS } from './login.cy'
export const VALID_CREDENTIALS = {
    email: "hudhudameed@gmail.com",
    password: "ameed0595",
};
let x
describe('setting',()=>{
    before(()=>{
        apiLogin(VALID_CREDENTIALS.email, VALID_CREDENTIALS.password).then((cookie)=>{
            x=cookie
        });
    })
    beforeEach(()=>{
        cy.setCookie('authToken', x);
        cy.visit('https://talent500.co/account-settings');
        cy.wait(3000)
    })
    it('verify from email',()=>{
        cy.contains('Logged in as').siblings().should('contain',VALID_CREDENTIALS.email)
    })
    
    it('change password // current password mismatch',()=>{
        cy.contains('Change Password').click()
        cy.get('[placeholder="old password"]').clear().type('ameed059')
        cy.get('[placeholder="new password"]').clear().type('ameed059500')
        cy.get('[placeholder="confirm password"]').clear().type('ameed059500')
        cy.get('button').contains('Save').click();
        cy.contains('The password you entered is incorrect. Please try again.').should('exist');
    })
    it('change password // new password mismatch',()=>{
        cy.contains('Change Password').click()
        cy.get('[placeholder="old password"]').clear().type('ameed0595')
        cy.get('[placeholder="new password"]').clear().type('ameed05950')
        cy.get('[placeholder="confirm password"]').clear().type('ameed059500')
        cy.get('button').contains('Save').click();
        cy.get('#root').should('contain','Password Mismatch')
    })
    it('change password // new password less than 8 char',()=>{
        cy.contains('Change Password').click()
        cy.get('[placeholder="old password"]').clear().type('ameed0595')
        cy.get('[placeholder="new password"]').clear().type('123')
        cy.get('[placeholder="confirm password"]').clear().type('123')
        cy.get('button').contains('Save').click();
        cy.get('#root').should('contain','Ensure this field has at least 8 characters.')
    })
    it('change password ',()=>{
        cy.contains('Change Password').click()
        cy.get('[placeholder="old password"]').clear().type('ameed059500')
        cy.get('[placeholder="new password"]').clear().type('ameed0595')
        cy.get('[placeholder="confirm password"]').clear().type('ameed0595')
        cy.get('button').contains('Save').click();
        cy.get('#root').should('contain','Password has been Changed successfully. This will be used for Sign in..')
    })
    it.only('change email',()=>{
        cy.contains('Change Email').click()
        cy.get('[placeholder="New Email"]').clear().type('ameedhudhud676@gmail.com')
        cy.get('[placeholder="Password"]').clear().type(`ameed0595`)
        cy.get('button').contains('Change Email').click()
        cy.contains('You have submitted a request to change your email ID to ameedhudhud676@gmail.com.').should('exist');
    })
    
})