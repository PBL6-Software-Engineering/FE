describe('My First Test', () => {
  it('Visit page login', () => {
    cy.visit('/auth/sign-in');

    // login to system
    cy.get('input[name="username"]').type('khanhlinh999@yopmail.com');
    cy.get('input[name="password"]').type('123456');
    cy.get('#btn-login').click();

    // go to component change password
    cy.wait(5000);
    cy.get('#open-header-info').click();
    cy.get('#manage-account').click();
    cy.get('#setting-account').click();
    cy.get('#change-password').click();

    // change password
  });
});
