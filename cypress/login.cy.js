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
    it('sign in by invalid email and valid password', () => {
        cy.visit(loginhelper.URL.UI_LOGIN)
        loginhelper.uiLogin(INVALID_CREDENTIALS.email, VALID_CREDENTIALS.password)
    })
    it('sign in by invalid passworrd and valid email', () => {
        cy.visit(loginhelper.URL.UI_LOGIN)
        loginhelper.uiLogin(VALID_CREDENTIALS.email, INVALID_CREDENTIALS.password)
    })
    it('sign in by valid email and valid password', () => {
        loginhelper.apiLogin(VALID_CREDENTIALS.email, VALID_CREDENTIALS.password)
    })


    // it('test',()=>{
    //     cy.request({
    //         method: "POST",
    //         url: 'https://prod-warmachine.talent500.co/api/users/candidate/signin/',
    //         body: {
    //             email: "hudhudameed@gmail.com",
    //             password: 'ameed0595',
    //         },
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     }).then((response) => {
    //         expect(response.status).to.eq(200);
    //         expect(response.body.message).to.include('Verified'); 
    //         cy.log(response.body.token)
    //         cy.setCookie('authToken', `JWT ${response.body.token}`)
    //     });
    // })
})
