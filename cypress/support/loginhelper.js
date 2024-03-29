export const URL = {
    API_LOGIN: 'https://prod-warmachine.talent500.co/api/users/candidate/signin/',
    UI_LOGIN: 'https://talent500.co/auth/signin'
}
export const LOCATOR = {
    email:'[placeholder="Email"]',
    password:'[placeholder="Password"]',
    login:'[data-id="submit-login-btn"]'
}
export const MESSAGE = {
    INVALID_CREDENTIALS:'Unable to login',
    VALIDATION_MESSAGE:'Please fill out this field.'

}
export const apiLogin = (email, password) => {
   return cy.request({
        method: "POST",
        url: URL.API_LOGIN,
        body: {
            email: email,
            password: password,
        },
        headers: {
            "Content-Type": "application/json",
        },
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.message).to.include('Verified');
        return `JWT ${response.body.token}`
        // cy.setCookie('authToken', `JWT ${response.body.token}`)
    });
};
export const enterFieldValue = (value, locator) => {
    if(value==""){
        cy.get(locator).clear().invoke('val',value);
    }else{
        cy.get(locator).clear().type(value);
    }
};
export const uiLogin = (email, password) => {
    enterFieldValue(email,LOCATOR.email)
    enterFieldValue(password,LOCATOR.password)
    cy.get(LOCATOR.login).click()
    if(email==""){
        cy.get(`${LOCATOR.email}:invalid`).invoke('prop','validationMessage').should('equal','Please fill out this field.')
        
    }else if(password==""){
        cy.get(`${LOCATOR.password}:invalid`).invoke('prop','validationMessage').should('equal','Please fill out this field.')
    }
    else{
        cy.contains(MESSAGE.INVALID_CREDENTIALS).should("exist");
    }
}
