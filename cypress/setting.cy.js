import { apiLogin } from "./support/loginhelper";
import { VALID_CREDENTIALS } from './login.cy'
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
    it.only('verify from email',()=>{
        cy.contains('Logged in as').siblings().should('contain',VALID_CREDENTIALS.email)
    })

    it('change password',()=>{
        cy.contains('Change Password').click()
        cy.get('[placeholder="old password"]').clear().type('ameed059')
        cy.get('[placeholder="new password"]').clear().type('ameed0595')
        cy.get('[placeholder="confirm password"]').clear().type('ameed0595')
        cy.get('button').contains('Save').click()
        cy.contains('Password has been Changed successfully. This will be used for Sign in.');
    })
    it('change email',()=>{
        cy.contains('Change Email').click()
        cy.get('[placeholder="New Email"]').clear().type('ameedhudhud2003@gmail.com')
        cy.get('[placeholder="Password"]').clear().type('ameed0595')
        cy.get('button').contains('Change Email').click()
        // cy.contains('Confirm').click()
        // cy.contains('Change email confirmation').should('be.visable')
    })
})