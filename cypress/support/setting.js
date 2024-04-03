export const LOCATORS = {
    oldPasswordField : '[placeholder="old password"]',
    newPasswordField : '[placeholder="new password"]',
    confirmPasswordField : '[placeholder="confirm password"]',
    Button : 'button'


    // '[placeholder="confirm password"]'
}
export const TEST_CONSTANTS = {
    LOGIN : 'Logged in as',
    CHANGE_PASSWORD : 'Change Password',
    SAVE_PASSWORD : 'Save'

}
export const MESSAGE = {
    mismatchOldPassword : 'The password you entered is incorrect. Please try again.',
    mismatchNewPassword : 'Password Mismatch',
    shortPassword : 'Ensure this field has at least 8 characters.',
    changePassword : 'Join our network of 1.6 million+ professionals and access curated roles designed for global centers.'
}

export const verifyMessage = (message) => {
    cy.get('#root').should('contain',message)
}

export const changeEmail = (email,password,status=true) => {
    cy.request({
        method: "POST",
        url: 'https://prod-warmachine.talent500.co/api/users/change_email/',
        body: {
            email: email,
            password: password,
        },
        headers: {
            "Content-Type": "application/json",
            "Authorization": x
        },
        failOnStatusCode: status,
    }).then((response) => {

        expect(response.body).to.include('Verification email sent');
    });
} 