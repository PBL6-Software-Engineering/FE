describe('Test change password FULL', () => {
  before(() => {});

  beforeEach(() => {
    cy.loginUser();
  });

  it('Test case 16: Mật khẩu cũ không đúng', () => {
    cy.visit('/user/password');
    cy.get('#old-password-input').type('abcd@12345');
    cy.wait(100);
    cy.get('#new-password-input').type('abcd@1234');
    cy.wait(100);
    cy.get('#confirm-password-input').type('abcd@1234');
    cy.wait(100);
    cy.get('button[type="submit"]').click();
    cy.get('.toast-message', { timeout: 10000 }).contains(
      'Mật khẩu không chính xác !',
    );
  });

  it('Test case 17: Mật khẩu mới trùng với mật khẩu cũ', () => {
    cy.visit('/user/password');
    cy.get('#old-password-input').type('abcd@123');
    cy.wait(100);
    cy.get('#new-password-input').type('abcd@123');
    cy.wait(100);
    cy.get('#confirm-password-input').type('abcd@123');
    cy.wait(100);
    cy.get('button[type="submit"]').click();
    cy.get('.toast-message', { timeout: 5000 }).contains(
      'Mật khẩu mới không được trùng với mật khẩu cũ!',
    );
  });

  it('Test case 18: Đổi mật khẩu thành công', () => {
    cy.visit('/user/password');
    cy.get('#old-password-input').type('abcd@1234');
    cy.wait(100);
    cy.get('#new-password-input').type('abcd@123');
    cy.wait(100);
    cy.get('#confirm-password-input').type('abcd@123');
    cy.wait(100);
    cy.get('button[type="submit"]').click();
    cy.get('.toast-message', { timeout: 10000 }).contains(
      'Đổi mật khẩu thành công!',
    );
  });
});
