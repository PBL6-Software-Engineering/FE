describe('Test update info hospital', () => {
  before(() => {
    // cy.loginHospital();
  });

  beforeEach(() => {
    cy.loginHospital();
  });

  //   it('Test case 1: Tên bị để trống', () => {
  //     cy.visit('/admin/account-setting/update-info/hospital');
  //     cy.wait(10000);

  //     cy.get('#name').clear();
  //     cy.get('button[type="submit"]').click();

  //     cy.get('#name')
  //       .focus()
  //       .blur()
  //       .next()
  //       .children('.error-msg')
  //       .should('contain', 'Trường này bắt buộc');
  //   });

  //   it('Test case 2: Tên chứa chuỗi khoảng trắng', () => {
  //     cy.visit('/admin/account-setting/update-info/hospital');
  //     cy.wait(10000);

  //     cy.get('#name').clear();
  //     cy.get('#name').type('   ');
  //     cy.get('button[type="submit"]').click();

  //     cy.get('#name')
  //       .focus()
  //       .blur()
  //       .next()
  //       .children('.error-msg')
  //       .should('contain', 'Trường này bắt buộc');
  //   });

  it('Test case 3: Email không đúng định dạng', () => {
    cy.visit('/admin/account-setting/update-info/hospital');
    cy.wait(10000);

    cy.get('#email').clear();
    cy.get('#email').type('test email');
    cy.get('button[type="submit"]').click();

    cy.get('#email')
      .focus()
      .blur()
      .next()
      .children('.error-msg')
      .should('contain', 'Email không hợp lệ');
  });

  it('Test case 4: Số điện thoại không đúng định dạng', () => {
    cy.visit('/admin/account-setting/update-info/hospital');
    cy.wait(10000);

    cy.get('#phone').clear();
    cy.get('#phone').type('123');
    cy.get('button[type="submit"]').click();

    cy.get('#phone')
      .focus()
      .blur()
      .next()
      .children('.error-msg')
      .should('contain', 'Số điện thoại không hợp lệ');
  });
});
