import * as loginhelper from './support/loginhelper'
export const VALID_CREDENTIALS = {
    email: "hudhudameed@gmail.com",
    password: "ameed0595",
};
const INVALID_CREDENTIALS = {
    email: "ameedhudhud@gmail.com",
    password: "ameed",
};
describe('login', () => {
    it.only('test',()=>{
        cy.visit(loginhelper.URL.UI_LOGIN)
        cy.get('[placeholder="Email"]').type('qqq')
        cy.get('[placeholder="Password"]').type('qqq')
        cy.get('[data-id="submit-login-btn"]').click({force:true})

        cy.get('[placeholder="Email"]').invoke('prop','validationMessage').should('equal',"Please include an '@' in the email address. 'qqq' is missing an '@'.")
    })
    it('login by invalid email and valid password', () => {
        cy.visit(loginhelper.URL.UI_LOGIN)
        loginhelper.uiLogin(INVALID_CREDENTIALS.email, VALID_CREDENTIALS.password)
    })
    it('login by invalid passworrd and valid email', () => {
        cy.visit(loginhelper.URL.UI_LOGIN)
        loginhelper.uiLogin(VALID_CREDENTIALS.email, INVALID_CREDENTIALS.password)
    })
    it('login by only fill password',()=>{
        cy.visit(loginhelper.URL.UI_LOGIN)
        loginhelper.uiLogin("", INVALID_CREDENTIALS.password)
    })
    it('login by only fill email',()=>{
        cy.visit(loginhelper.URL.UI_LOGIN)
        loginhelper.uiLogin(VALID_CREDENTIALS.email, "")
    })
    it('login by valid email and valid password', () => {
        loginhelper.apiLogin(VALID_CREDENTIALS.email, VALID_CREDENTIALS.password)
    })
})
