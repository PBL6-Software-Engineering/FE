describe('Test update info hospital', () => {
  before(() => {
    // cy.loginHospital();
  });

  beforeEach(() => {
    cy.loginHospital();
  });

  it('Test case 1: Tên bị để trống', () => {
    cy.visit('/admin/account-setting/update-info/hospital');
    cy.wait(10000);

    cy.get('#name').clear();
    cy.get('button[type="submit"]').click();

    cy.get('#name')
      .focus()
      .blur()
      .next()
      .children('.error-msg')
      .should('contain', 'Trường này bắt buộc');
  });

  it('Test case 2: Tên chứa chuỗi khoảng trắng', () => {
    cy.visit('/admin/account-setting/update-info/hospital');
    cy.wait(10000);

    cy.get('#name').clear();
    cy.get('#name').type('   ');
    cy.get('button[type="submit"]').click();

    cy.get('#name')
      .focus()
      .blur()
      .next()
      .children('.error-msg')
      .should('contain', 'Trường này bắt buộc');
  });
});
