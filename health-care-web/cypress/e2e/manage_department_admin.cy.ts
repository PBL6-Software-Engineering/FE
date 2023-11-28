describe('Test update info hospital', () => {
  before(() => {
    // cy.loginHospital();
  });

  beforeEach(() => {
    cy.loginAdmin();
  });

  it('Test case 1: Ảnh bị để trống', () => {
    cy.visit('/admin/general/department');
    cy.wait(5000);

    cy.get('#btn-add-department').click(); // open model thêm chuyên khoa
    cy.get('#name').type('Khoa nội');
    cy.wait(50);
    cy.get('#description').type('Khoa nội rất tốt');
    cy.wait(50);
    cy.get('#btn-create').click();
    cy.get('.toast-message', { timeout: 1000 }).contains(
      'Vui lòng nhập đầy đủ thông tin',
    );
  });
});
