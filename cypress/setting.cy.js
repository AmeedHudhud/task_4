import { apiLogin,enterFieldValue } from "./support/loginhelper";
// import { VALID_CREDENTIALS } from './login.cy'
import * as settinghelper from "./support/setting"
export const VALID_CREDENTIALS = {
    email: "ameedhudhud0@gmail.com",
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
        cy.contains(settinghelper.TEST_CONSTANTS.LOGIN).siblings().should('contain',VALID_CREDENTIALS.email)
    })
    it('change password // current password mismatch',()=>{
        cy.contains(settinghelper.TEST_CONSTANTS.CHANGE_PASSWORD).click()
        cy.get(settinghelper.LOCATORS.oldPasswordField).clear().type('ameed059')
        cy.get(settinghelper.LOCATORS.newPasswordField).clear().type('ameed059500')
        cy.get(settinghelper.LOCATORS.confirmPasswordField).clear().type('ameed059500')
        cy.get(settinghelper.LOCATORS.Button).contains(settinghelper.TEST_CONSTANTS.SAVE_PASSWORD).click();
        settinghelper.verifyMessage(settinghelper.MESSAGE.mismatchOldPassword)
        // cy.get('#root').should('contain',settinghelper.MESSAGE.mismatchOldPassword)

    })
    it('change password // new password mismatch',()=>{
        cy.contains(settinghelper.TEST_CONSTANTS.CHANGE_PASSWORD).click()
        cy.get(settinghelper.LOCATORS.oldPasswordField).clear().type('ameed0595')
        cy.get(settinghelper.LOCATORS.newPasswordField).clear().type('ameed05950')
        cy.get(settinghelper.LOCATORS.confirmPasswordField).clear().type('ameed059500')
        cy.get(settinghelper.LOCATORS.Button).contains(settinghelper.TEST_CONSTANTS.SAVE_PASSWORD).click();
        settinghelper.verifyMessage(settinghelper.MESSAGE.mismatchNewPassword)
    })
    it('change password // new password less than 8 char',()=>{
        cy.contains(settinghelper.TEST_CONSTANTS.CHANGE_PASSWORD).click()
        cy.get(settinghelper.LOCATORS.oldPasswordField).clear().type('ameed0595')
        cy.get(settinghelper.LOCATORS.newPasswordField).clear().type('123')
        cy.get(settinghelper.LOCATORS.confirmPasswordField).clear().type('123')
        cy.get(settinghelper.LOCATORS.Button).contains(settinghelper.TEST_CONSTANTS.SAVE_PASSWORD).click();
        settinghelper.verifyMessage(settinghelper.MESSAGE.shortPassword)

        // cy.get('#root').should('contain','Ensure this field has at least 8 characters.')
    })
    it('change password ',()=>{
        cy.contains(settinghelper.TEST_CONSTANTS.CHANGE_PASSWORD).click()
        enterFieldValue('ameed0595',settinghelper.LOCATORS.oldPasswordField)
        // cy.get(settinghelper.LOCATORS.oldPasswordField).clear().type('ameed05953')
        cy.get(settinghelper.LOCATORS.newPasswordField).clear().type('ameed059')
        cy.get(settinghelper.LOCATORS.confirmPasswordField).clear().type('ameed059')
        cy.get(settinghelper.LOCATORS.Button).contains(settinghelper.TEST_CONSTANTS.SAVE_PASSWORD).click()
        cy.contains(settinghelper.MESSAGE.changePassword).should('exist')
        // settinghelper.verifyMessage(settinghelper.MESSAGE.changePassword)
    })

    // it.only('change email //new email',()=>{
    //     // settinghelper.changeEmail('ameedhudhud200020@gmail.com','ameed0595')
    //     //     cy.request({
    //     //     method: "POST",
    //     //     url: 'https://prod-warmachine.talent500.co/api/users/change_email/',
    //     //     body: {
    //     //         email: 'ameedhudhud200020@gmail.com',
    //     //         password: 'ameed0595',
    //     //     },
    //     //     headers: {
    //     //         "Content-Type": "application/json",
    //     //         "Authorization": x
    //     //     },
    //     // }).then((response) => {
    //     //     expect(response.body).to.include('Verification email sent');
    //     // });
    // })
    // it('change email // same email',()=>{
    //     cy.request({
    //         method: "POST",
    //         url: 'https://prod-warmachine.talent500.co/api/users/change_email/',
    //         body: {
    //             email: 'ameedhudhud2000@gmail.com',
    //             password: 'ameed0595',
    //         },
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": x
    //         },
    //         failOnStatusCode: false,    
    //     }).then((response) => {
    //         expect(response.body).to.include('Already raise change request for this email');
    //     });

    // })
    // it('change email // error more than 3 time',()=>{
    //     cy.request({
    //         method: "POST",
    //         url: 'https://prod-warmachine.talent500.co/api/users/change_email/',
    //         body: {
    //             email: 'ameedhudhud2000@gmail.com',
    //             password: 'ameed0595',
    //         },
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": x
    //         },
    //         failOnStatusCode: false,    
    //     }).then((response) => {
    //         expect(response.body).to.include('  ');
    //     });

    // })
})

