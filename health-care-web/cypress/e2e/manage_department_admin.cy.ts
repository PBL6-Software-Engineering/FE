describe('Test update info hospital', () => {
  before(() => {
    // cy.loginHospital();
  });

  beforeEach(() => {
    cy.loginAdmin();
  });

  it('Thêm CK1: Tên bị để trống', () => {
    cy.visit('/admin/general/department');
    cy.wait(5000);

    cy.get('#btn-add-department').click(); // open model thêm chuyên khoa
    cy.wait(100);
    cy.get('#description-create').type('Khoa nội rất tốt');
    cy.wait(100)
    cy.get('#thumbnailCreate').selectFile('cypress/upload/test.jpg', {
      force: true,
    });
    cy.wait(100);
    cy.get('#btn-create').click();
    cy.get('.toast-message', { timeout: 1000 }).contains(
      'Vui lòng nhập đầy đủ thông tin',
    );

    cy.get('#name-create')
      .focus()
      .blur()
      .next()
      .children('.error-msg')
      .should('contain', 'Trường này bắt buộc');
  });

  it('Thêm CK2: Tên là chuỗi khoảng trắng', () => {
    cy.visit('/admin/general/department');
    cy.wait(5000);

    cy.get('#btn-add-department').click(); // open model thêm chuyên khoa
    cy.wait(100);
    cy.get('#name-create').type('                    ');
    cy.wait(100);
    cy.get('#description-create').type('Khoa nội rất tốt');
    cy.wait(100)
    cy.get('#thumbnailCreate').selectFile('cypress/upload/test.jpg', {
      force: true,
    });
    cy.wait(100);
    cy.get('#btn-create').click();
    cy.get('.toast-message', { timeout: 1000 }).contains(
      'Vui lòng nhập đầy đủ thông tin',
    );

    cy.get('#name-create')
      .focus()
      .blur()
      .next()
      .children('.error-msg')
      .should('contain', 'Trường này bắt buộc');
  });

  it('Thêm CK3: Mô tả bị để trống', () => {
    cy.visit('/admin/general/department');
    cy.wait(5000);

    cy.get('#btn-add-department').click(); // open model thêm chuyên khoa
    cy.wait(100);
    cy.get('#name-create').type('Khoa nội');
    cy.wait(100)
    cy.get('#thumbnailCreate').selectFile('cypress/upload/test.jpg', {
      force: true,
    });
    cy.wait(100);
    cy.get('#btn-create').click();
    cy.get('.toast-message', { timeout: 1000 }).contains(
      'Vui lòng nhập đầy đủ thông tin',
    );
  });

  it('Thêm CK4: Mô tả là chuỗi khoảng trắng', () => {
    cy.visit('/admin/general/department');
    cy.wait(5000);

    cy.get('#btn-add-department').click(); // open model thêm chuyên khoa
    cy.wait(100);
    cy.get('#name-create').type('Khoa nội');
    cy.wait(100);
    cy.get('#description-create').type('        ');
    cy.wait(100)
    cy.get('#thumbnailCreate').selectFile('cypress/upload/test.jpg', {
      force: true,
    });
    cy.wait(100);
    cy.get('#btn-create').click();
    cy.get('.toast-message', { timeout: 1000 }).contains(
      'Vui lòng nhập đầy đủ thông tin',
    );
  });

  it('Thêm CK5: Ảnh bị để trống', () => {
    cy.visit('/admin/general/department');
    cy.wait(5000);

    cy.get('#btn-add-department').click(); // open model thêm chuyên khoa
    cy.wait(100);
    cy.get('#name-create').type('Huyết Học');
    cy.wait(100);
    cy.get('#description-create').type('Khoa nội rất tốt');
    cy.wait(100);
    cy.get('#btn-create').click();
    cy.get('.toast-message', { timeout: 1000 }).contains(
      'Vui lòng nhập đầy đủ thông tin',
    );
  });

  it('Thêm CK6: Thêm chuyên khoa bị trùng tên', () => {
    cy.visit('/admin/general/department');
    cy.wait(5000);

    cy.get('#btn-add-department').click(); // open model thêm chuyên khoa
    cy.get('#name-create').type('Huyết học');
    cy.wait(100);
    cy.get('#description-create').type('Khoa nội rất tốt');
    cy.wait(100);
    cy.get('#thumbnailCreate').selectFile('cypress/upload/test.jpg', {
      force: true,
    });
    cy.get('#btn-create').click();
    cy.get('.toast-message', { timeout: 10000 }).contains(
      'Trường tên đã có trong cơ sở dữ liệu.',
    );
  });

  it('Thêm CK7: Thêm đầy đủ dữ liệu', () => {
    cy.visit('/admin/general/department');
    cy.wait(5000);

    cy.get('#btn-add-department').click(); // open model thêm chuyên khoa
    cy.get('#name-create').type('Test 9h32');
    cy.wait(100);
    cy.get('#description-create').type('Khoa nội rất tốt');
    cy.wait(100);
    cy.get('#thumbnailCreate').selectFile('cypress/upload/test.jpg', {
      force: true,
    });
    cy.get('#btn-create').click();
    cy.get('.toast-message', { timeout: 10000 }).contains('Thêm thành công!');
  });

  it('Sửa CK1: Sửa chuyên khoa với Tên bị để trống', () => {
    cy.visit('/admin/general/department');
    cy.wait(5000);

    cy.get('#btn-edit-department').eq(0).click(); // open modal

    cy.wait(100)
    cy.get('#name-edit').clear();
    cy.wait(100)
    cy.get('#btn-edit').click();

    cy.get('#name-edit')
      .focus()
      .blur()
      .next()
      .children('.error-msg')
      .should('contain', 'Trường này bắt buộc');
    cy.get('.toast-message', { timeout: 1000 }).contains(
      'Vui lòng nhập đầy đủ thông tin',
    );
  });

  it('Sửa CK2: Sửa chuyên khoa với Tên là chuỗi khoảng trắng', () => {
    cy.visit('/admin/general/department');
    cy.wait(5000);

    cy.get('#btn-edit-department').eq(0).click(); // open modal

    cy.wait(100)
    cy.get('#name-edit').clear();
    cy.get('#name-edit').type('                ');
    cy.wait(100)
    cy.get('#btn-edit').click();

    cy.get('#name-edit')
      .focus()
      .blur()
      .next()
      .children('.error-msg')
      .should('contain', 'Trường này bắt buộc');
    cy.get('.toast-message', { timeout: 1000 }).contains(
      'Vui lòng nhập đầy đủ thông tin',
    );
  });

  it('Sửa CK3: Sửa chuyên khoa với Mô tả bị để trống', () => {
    cy.visit('/admin/general/department');
    cy.wait(5000);

    cy.get('#btn-edit-department').eq(0).click(); // open modal

    cy.wait(100)
    cy.get('#description-edit').clear();
    cy.wait(100)
    cy.get('#btn-edit').click();

    cy.get('.toast-message', { timeout: 1000 }).contains(
      'Vui lòng nhập đầy đủ thông tin',
    );
  });

  it('Sửa CK4: Sửa chuyên khoa với Mô tả là chuỗi khoảng trắng', () => {
    cy.visit('/admin/general/department');
    cy.wait(5000);

    cy.get('#btn-edit-department').eq(0).click(); // open modal

    cy.wait(100)
    cy.get('#description-edit').clear();
    cy.get('#description-edit').type('                     ');
    cy.wait(100)
    cy.get('#btn-edit').click();

    cy.get('.toast-message', { timeout: 1000 }).contains(
      'Vui lòng nhập đầy đủ thông tin',
    );
  });

  it('Sửa CK5: Sửa chuyên khoa đầy đủ thông tin', () => {
    cy.visit('/admin/general/department');
    cy.wait(5000);

    cy.get('#btn-edit-department').eq(0).click(); // open modal

    cy.get('#description-edit').type(' - Sửa chuyên khoa');
    cy.get('#description-edit').type(' - Sửa chuyên khoa');
    cy.wait(100);
    cy.get('#btn-edit').click();

    cy.get('.toast-message', { timeout: 10000 }).contains('Sửa thành công!');
  });
});
