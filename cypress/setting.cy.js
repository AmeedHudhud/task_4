import { apiLogin } from "./support/loginhelper";
let x
const VALID_CREDENTIALS = {
    email: "hudhudameed@gmail.com",
    password: "ameed0595",
};
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
    it('change password',()=>{
        cy.contains('Change Password').click()
        cy.get('[placeholder="old password"]').clear().type('ameed0595')
        cy.get('[placeholder="new password"]').clear().type('ameed')
        cy.get('[placeholder="confirm password"]').clear().type('ameed')
    })
})