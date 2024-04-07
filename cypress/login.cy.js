/*
*   test case for login page "https://talent500.co/auth/signin?redirect_to=jobs"
*/
import * as loginhelper from './support/loginhelper'
export const VALID_CREDENTIALS = {
    email: "ameedhudhud676@gmail.com",
    password: "ameed059",
};
const INVALID_CREDENTIALS = {
    email: "ameedhudhud@gmail.com",
    password: "ameed",
    wrongemail : 'without special charactor'
};
describe('login', () => {
    it('login with an invalid email and valid password', () => {
        cy.visit(loginhelper.URL.UI_LOGIN)
        loginhelper.uiLogin(INVALID_CREDENTIALS.email, VALID_CREDENTIALS.password)
    })
    it('login with an invalid password and valid email', () => {
        cy.visit(loginhelper.URL.UI_LOGIN)
        loginhelper.uiLogin(VALID_CREDENTIALS.email, INVALID_CREDENTIALS.password)
    })
    it('login with only the password field filled',()=>{
        cy.visit(loginhelper.URL.UI_LOGIN)
        loginhelper.uiLogin("", INVALID_CREDENTIALS.password)
    })
    it('login with only the email field filled',()=>{
        cy.visit(loginhelper.URL.UI_LOGIN)
        loginhelper.uiLogin(VALID_CREDENTIALS.email, "")
    })
    it('login with an email that does not include the "@" symbol',()=>{
        cy.visit(loginhelper.URL.UI_LOGIN)
        loginhelper.uiLogin(INVALID_CREDENTIALS.wrongemail, VALID_CREDENTIALS.password)
    })
    it('login without entering email and password',()=>{
        cy.visit(loginhelper.URL.UI_LOGIN)
        loginhelper.uiLogin("", "")
    })
    it('login with a valid email and password', () => {
        loginhelper.apiLogin(VALID_CREDENTIALS.email, VALID_CREDENTIALS.password)
    })
})
