describe('Test update info hospital', () => {
  before(() => {
    // cy.loginHospital();
  });

  beforeEach(() => {
    cy.loginHospital();
  });

  it('Thêm Bác sĩ 1: Tên bị để trống', () => {
    cy.visit('/admin/doctor');
    cy.wait(5000);

    cy.get('#btn-add-doctor').click();
    cy.wait(100);
    cy.get('#email').type('thaovy@yopmail.com');
    cy.wait(100);
    cy.get('ng-select[formControlName="id_department"]').click();
    cy.get('ng-option').eq(1).should('be.visible').click();
    cy.wait(100);
    cy.get('ng-select[formControlName="province_code"]').click();
    cy.get('ng-option').eq(1).click();
    cy.wait(100);
    // Add training process
    cy.get('[formArrayName="training_process"] .btn-primary-1').click();
    cy.get(
      '[formArrayName="training_process"] input[formControlName="title"]',
    ).type('Training Title');
    cy.get(
      '[formArrayName="training_process"] input[formControlName="subtitle"]',
    ).type('Training Subtitle');
    cy.wait(100);

    // Add prominent
    cy.get('[formArrayName="prominent"] .btn-primary-1').click();
    cy.get('[formArrayName="prominent"] input[formControlName="title"]').type(
      'Prominent Title',
    );
    cy.get(
      '[formArrayName="prominent"] input[formControlName="subtitle"]',
    ).type('Prominent Subtitle');
    cy.wait(100);

    // Add strengths
    cy.get('[formArrayName="strengths"] .btn-primary-1').click();
    cy.get('[formArrayName="strengths"] input[formControlName="title"]').type(
      'Strengths Title',
    );
    cy.get(
      '[formArrayName="strengths"] input[formControlName="subtitle"]',
    ).type('Strengths Subtitle');
    cy.wait(100);

    // Add work experience
    cy.get('[formArrayName="work_experience"] .btn-primary-1').click();
    cy.get(
      '[formArrayName="work_experience"] input[formControlName="title"]',
    ).type('Experience Title');
    cy.get(
      '[formArrayName="work_experience"] input[formControlName="subtitle"]',
    ).type('Experience Subtitle');
    cy.wait(100);

    cy.get('#btn-create').click();
    cy.get('.toast-message', { timeout: 1000 }).contains(
      'Vui lòng nhập đầy đủ thông tin',
    );

    cy.get('#name')
      .focus()
      .blur()
      .next()
      .children('.error-msg')
      .should('contain', 'Trường này bắt buộc');
  });

  // it('Thêm CK2: Tên là chuỗi khoảng trắng', () => {
  //   cy.visit('/admin/general/department');
  //   cy.wait(5000);

  //   cy.get('#btn-add-department').click(); // open model thêm chuyên khoa
  //   cy.wait(100);
  //   cy.get('#name-create').type('                    ');
  //   cy.wait(100);
  //   cy.get('#description-create').type('Khoa nội rất tốt');
  //   cy.wait(100);
  //   cy.get('#thumbnailCreate').selectFile('cypress/upload/test.jpg', {
  //     force: true,
  //   });
  //   cy.wait(100);
  //   cy.get('#btn-create').click();
  //   cy.get('.toast-message', { timeout: 1000 }).contains(
  //     'Vui lòng nhập đầy đủ thông tin',
  //   );

  //   cy.get('#name-create')
  //     .focus()
  //     .blur()
  //     .next()
  //     .children('.error-msg')
  //     .should('contain', 'Trường này bắt buộc');
  // });

  // it('Thêm CK3: Mô tả bị để trống', () => {
  //   cy.visit('/admin/general/department');
  //   cy.wait(5000);

  //   cy.get('#btn-add-department').click(); // open model thêm chuyên khoa
  //   cy.wait(100);
  //   cy.get('#name-create').type('Khoa nội');
  //   cy.wait(100);
  //   cy.get('#thumbnailCreate').selectFile('cypress/upload/test.jpg', {
  //     force: true,
  //   });
  //   cy.wait(100);
  //   cy.get('#btn-create').click();
  //   cy.get('.toast-message', { timeout: 1000 }).contains(
  //     'Vui lòng nhập đầy đủ thông tin',
  //   );
  // });

  // it('Thêm CK4: Mô tả là chuỗi khoảng trắng', () => {
  //   cy.visit('/admin/general/department');
  //   cy.wait(5000);

  //   cy.get('#btn-add-department').click(); // open model thêm chuyên khoa
  //   cy.wait(100);
  //   cy.get('#name-create').type('Khoa nội');
  //   cy.wait(100);
  //   cy.get('#description-create').type('        ');
  //   cy.wait(100);
  //   cy.get('#thumbnailCreate').selectFile('cypress/upload/test.jpg', {
  //     force: true,
  //   });
  //   cy.wait(100);
  //   cy.get('#btn-create').click();
  //   cy.get('.toast-message', { timeout: 1000 }).contains(
  //     'Vui lòng nhập đầy đủ thông tin',
  //   );
  // });

  // it('Thêm CK5: Ảnh bị để trống', () => {
  //   cy.visit('/admin/general/department');
  //   cy.wait(5000);

  //   cy.get('#btn-add-department').click(); // open model thêm chuyên khoa
  //   cy.wait(100);
  //   cy.get('#name-create').type('Huyết Học');
  //   cy.wait(100);
  //   cy.get('#description-create').type('Khoa nội rất tốt');
  //   cy.wait(100);
  //   cy.get('#btn-create').click();
  //   cy.get('.toast-message', { timeout: 1000 }).contains(
  //     'Vui lòng nhập đầy đủ thông tin',
  //   );
  // });

  // it('Thêm CK6: Thêm chuyên khoa bị trùng tên', () => {
  //   cy.visit('/admin/general/department');
  //   cy.wait(5000);

  //   cy.get('#btn-add-department').click(); // open model thêm chuyên khoa
  //   cy.get('#name-create').type('Huyết học');
  //   cy.wait(100);
  //   cy.get('#description-create').type('Khoa nội rất tốt');
  //   cy.wait(100);
  //   cy.get('#thumbnailCreate').selectFile('cypress/upload/test.jpg', {
  //     force: true,
  //   });
  //   cy.get('#btn-create').click();
  //   cy.get('.toast-message', { timeout: 10000 }).contains(
  //     'Trường tên đã có trong cơ sở dữ liệu.',
  //   );
  // });

  // it('Thêm CK7: Thêm đầy đủ dữ liệu', () => {
  //   cy.visit('/admin/general/department');
  //   cy.wait(5000);

  //   cy.get('#btn-add-department').click(); // open model thêm chuyên khoa
  //   cy.get('#name-create').type('Test 9h32');
  //   cy.wait(100);
  //   cy.get('#description-create').type('Khoa nội rất tốt');
  //   cy.wait(100);
  //   cy.get('#thumbnailCreate').selectFile('cypress/upload/test.jpg', {
  //     force: true,
  //   });
  //   cy.get('#btn-create').click();
  //   cy.get('.toast-message', { timeout: 10000 }).contains('Thêm thành công!');
  // });

  // it('Sửa CK1: Sửa chuyên khoa với Tên bị để trống', () => {
  //   cy.visit('/admin/general/department');
  //   cy.wait(5000);

  //   cy.get('#btn-edit-department').eq(0).click(); // open modal

  //   cy.wait(100);
  //   cy.get('#name-edit').clear();
  //   cy.wait(100);
  //   cy.get('#btn-edit').click();

  //   cy.get('#name-edit')
  //     .focus()
  //     .blur()
  //     .next()
  //     .children('.error-msg')
  //     .should('contain', 'Trường này bắt buộc');
  //   cy.get('.toast-message', { timeout: 1000 }).contains(
  //     'Vui lòng nhập đầy đủ thông tin',
  //   );
  // });

  // it('Sửa CK2: Sửa chuyên khoa với Tên là chuỗi khoảng trắng', () => {
  //   cy.visit('/admin/general/department');
  //   cy.wait(5000);

  //   cy.get('#btn-edit-department').eq(0).click(); // open modal

  //   cy.wait(100);
  //   cy.get('#name-edit').clear();
  //   cy.get('#name-edit').type('                ');
  //   cy.wait(100);
  //   cy.get('#btn-edit').click();

  //   cy.get('#name-edit')
  //     .focus()
  //     .blur()
  //     .next()
  //     .children('.error-msg')
  //     .should('contain', 'Trường này bắt buộc');
  //   cy.get('.toast-message', { timeout: 1000 }).contains(
  //     'Vui lòng nhập đầy đủ thông tin',
  //   );
  // });

  // it('Sửa CK3: Sửa chuyên khoa với Mô tả bị để trống', () => {
  //   cy.visit('/admin/general/department');
  //   cy.wait(5000);

  //   cy.get('#btn-edit-department').eq(0).click(); // open modal

  //   cy.wait(100);
  //   cy.get('#description-edit').clear();
  //   cy.wait(100);
  //   cy.get('#btn-edit').click();

  //   cy.get('.toast-message', { timeout: 1000 }).contains(
  //     'Vui lòng nhập đầy đủ thông tin',
  //   );
  // });

  // it('Sửa CK4: Sửa chuyên khoa với Mô tả là chuỗi khoảng trắng', () => {
  //   cy.visit('/admin/general/department');
  //   cy.wait(5000);

  //   cy.get('#btn-edit-department').eq(0).click(); // open modal

  //   cy.wait(100);
  //   cy.get('#description-edit').clear();
  //   cy.get('#description-edit').type('                     ');
  //   cy.wait(100);
  //   cy.get('#btn-edit').click();

  //   cy.get('.toast-message', { timeout: 1000 }).contains(
  //     'Vui lòng nhập đầy đủ thông tin',
  //   );
  // });

  // it('Sửa CK5: Sửa chuyên khoa đầy đủ thông tin', () => {
  //   cy.visit('/admin/general/department');
  //   cy.wait(5000);

  //   cy.get('#btn-edit-department').eq(0).click(); // open modal

  //   cy.get('#description-edit').type(' - Sửa chuyên khoa');
  //   cy.get('#description-edit').type(' - Sửa chuyên khoa');
  //   cy.wait(100);
  //   cy.get('#btn-edit').click();

  //   cy.get('.toast-message', { timeout: 10000 }).contains('Sửa thành công!');
  // });
});
