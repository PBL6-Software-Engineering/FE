describe('Test change password FULL', () => {
  before(() => {
    cy.loginUser();
  });

  beforeEach(() => {
    cy.intercept({
      method: 'POST',
      url: '**/user/change-password',
    }).as('callApiChangePass');
  });

  // it('Test case 1: Test giao diện "Thay đổi mật khẩu"', () => {
  //   cy.visit('/user/password');
  //   cy.get('form').within(() => {
  //     cy.get('.form-input-wrapper').should('have.length', 3);
  //     cy.get('input').should('have.length', 3);
  //     cy.get('.form-input-wrapper')
  //       .eq(0)
  //       .should('be.visible')
  //       .get("label[for='old-password-input']")
  //       .contains('Mật khẩu cũ')
  //       .and('contain', '*')
  //       .should('be.visible')
  //       .next('div')
  //       .children('input')
  //       .should('have.attr', 'placeholder', 'Nhập mật khẩu cũ')
  //       .should('be.visible');
  //     cy.get('.form-input-wrapper')
  //       .eq(1)
  //       .get("label[for='new-password-input']")
  //       .contains('Mật khẩu mới')
  //       .and('contain', '*')
  //       .should('be.visible')
  //       .next(' div')
  //       .children('input')
  //       .should('have.attr', 'placeholder', 'Nhập mật khẩu mới')
  //       .should('be.visible');
  //     cy.get('.form-input-wrapper')
  //       .eq(2)
  //       .get("label[for='confirm-password-input']")
  //       .contains('Xác nhận mật khẩu')
  //       .and('contain', '*')
  //       .should('be.visible')
  //       .next('div')
  //       .children('input')
  //       .should('have.attr', 'placeholder', 'Xác nhận mật khẩu mới')
  //       .should('be.visible');

  //     cy.get('button[type="submit"]').should('contain', 'Đổi mật khẩu');
  //   });
  // });

  // it('Test case 2: "Mật khẩu cũ" trống, các input khác đúng định dạng', () => {
  //   cy.visit('/user/password');
  //   cy.get('#new-password-input').type('abcd@1234');
  //   cy.get('#confirm-password-input').type('abcd@1234');
  //   cy.get('button[type="submit"]').click();

  //   cy.get('#old-password-input')
  //     .focused()
  //     .blur()
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should('contain', 'Trường này bắt buộc');
  // });

  // it('Test case 3: "Mật khẩu mới" trống, các input khác đúng định dạng', () => {
  //   cy.visit('/user/password');
  //   cy.get('#old-password-input').type('abcd@1234');
  //   cy.get('#confirm-password-input').type('abcd@1234');
  //   cy.get('button[type="submit"]').click();
  //   cy.wait(500);

  //   cy.get('#new-password-input')
  //     .focused()
  //     .blur()
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should('contain', 'Trường này bắt buộc');

  //   cy.get('#confirm-password-input')
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should('contain', 'Mật khẩu không trùng khớp');
  // });

  // it('Test case 4: "Xác nhận mật khẩu" trống, các input khác đúng định dạng', () => {
  //   cy.visit('/user/password');
  //   cy.get('#old-password-input').type('abcd@1234');
  //   cy.get('#new-password-input').type('abcd@1234');
  //   cy.get('button[type="submit"]').click();
  //   cy.wait(500);

  //   cy.get('#confirm-password-input')
  //     .focused()
  //     .blur()
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should('contain', 'Mật khẩu không trùng khớp');
  // });

  // it('Test case 5: Mật khẩu cũ thiếu chữ cái có chiều dài từ 8 - 20', () => {
  //   cy.visit('/user/password');
  //   cy.get('#old-password-input').type('123123123@');
  //   cy.wait(50);

  //   cy.get('#old-password-input')
  //     .focused()
  //     .blur()
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should(
  //       'contain',
  //       'Mật khẩu có chiều dài từ 8-20 kí tự bao gồm ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt',
  //     );
  // });

  // it('Test case 6: Mật khẩu cũ thiếu chữ số có chiều dài từ 8 - 20', () => {
  //   cy.visit('/user/password');
  //   cy.get('#old-password-input').type('abcabcabc@');
  //   cy.wait(50);

  //   cy.get('#old-password-input')
  //     .focused()
  //     .blur()
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should(
  //       'contain',
  //       'Mật khẩu có chiều dài từ 8-20 kí tự bao gồm ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt',
  //     );
  // });

  // it('Test case 7: Mật khẩu cũ thiếu tí tự dặc biệt có chiều dài từ 8 - 20', () => {
  //   cy.visit('/user/password');
  //   cy.get('#old-password-input').type('abcabcabc1');
  //   cy.wait(50);

  //   cy.get('#old-password-input')
  //     .focused()
  //     .blur()
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should(
  //       'contain',
  //       'Mật khẩu có chiều dài từ 8-20 kí tự bao gồm ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt',
  //     );
  // });

  // it('Test case 8: Mật khẩu mới thiếu chữ cái có chiều dài từ 8 - 20', () => {
  //   cy.visit('/user/password');
  //   cy.get('#new-password-input').type('123123123@');
  //   cy.wait(50);

  //   cy.get('#new-password-input')
  //     .focused()
  //     .blur()
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should(
  //       'contain',
  //       'Mật khẩu có chiều dài từ 8-20 kí tự bao gồm ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt',
  //     );
  // });

  // it('Test case 9: Mật khẩu mới thiếu chữ số có chiều dài từ 8 - 20', () => {
  //   cy.visit('/user/password');
  //   cy.get('#new-password-input').type('abcabcabc@');
  //   cy.wait(50);

  //   cy.get('#new-password-input')
  //     .focused()
  //     .blur()
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should(
  //       'contain',
  //       'Mật khẩu có chiều dài từ 8-20 kí tự bao gồm ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt',
  //     );
  // });

  // it('Test case 10: Mật khẩu mới thiếu tí tự dặc biệt có chiều dài từ 8 - 20', () => {
  //   cy.visit('/user/password');
  //   cy.get('#new-password-input').type('abcabcabc1');
  //   cy.wait(50);

  //   cy.get('#new-password-input')
  //     .focused()
  //     .blur()
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should(
  //       'contain',
  //       'Mật khẩu có chiều dài từ 8-20 kí tự bao gồm ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt',
  //     );
  // });

  // it('Test case 11: Mật khẩu cũ đúng định dạng có ít nhất 1 chữ số, 1 chữ cái và 1 kí tự đặc biệt, có chiều dài là 7', () => {
  //   cy.visit('/user/password');
  //   cy.get('#old-password-input').type('abc@123');
  //   cy.wait(50);

  //   cy.get('#old-password-input')
  //     .focused()
  //     .blur()
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should(
  //       'contain',
  //       'Mật khẩu có chiều dài từ 8-20 kí tự bao gồm ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt',
  //     );
  // });

  // it('Test case 12: Mật khẩu cũ đúng định dạng có ít nhất 1 chữ số, 1 chữ cái và 1 kí tự đặc biệt, có chiều dài là 21', () => {
  //   cy.visit('/user/password');
  //   cy.get('#old-password-input').type('abc123@@@abc123@@@abc');
  //   cy.wait(50);

  //   cy.get('#old-password-input')
  //     .focused()
  //     .blur()
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should(
  //       'contain',
  //       'Mật khẩu có chiều dài từ 8-20 kí tự bao gồm ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt',
  //     );
  // });

  // it('Test case 13: Mật khẩu mới đúng định dạng có ít nhất 1 chữ số, 1 chữ cái và 1 kí tự đặc biệt, có chiều dài là 7', () => {
  //   cy.visit('/user/password');
  //   cy.get('#new-password-input').type('abc@123');
  //   cy.wait(50);

  //   cy.get('#new-password-input')
  //     .focused()
  //     .blur()
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should(
  //       'contain',
  //       'Mật khẩu có chiều dài từ 8-20 kí tự bao gồm ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt',
  //     );
  // });

  // it('Test case 14: Mật khẩu mới đúng định dạng có ít nhất 1 chữ số, 1 chữ cái và 1 kí tự đặc biệt, có chiều dài là 21', () => {
  //   cy.visit('/user/password');
  //   cy.get('#new-password-input').type('abc123@@@abc123@@@abc');
  //   cy.wait(50);

  //   cy.get('#new-password-input')
  //     .focused()
  //     .blur()
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should(
  //       'contain',
  //       'Mật khẩu có chiều dài từ 8-20 kí tự bao gồm ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt',
  //     );
  // });

  // it('Test case 15: Xác nhận mật khẩu không khớp với mật khẩu mới', () => {
  //   cy.visit('/user/password');
  //   cy.get('#new-password-input').type('abcd1234@');
  //   cy.get('#confirm-password-input').type('abcd123@');
  //   cy.wait(50);

  //   cy.get('#confirm-password-input')
  //     .focused()
  //     .blur()
  //     .parent()
  //     .next()
  //     .children('.error-msg')
  //     .should('contain', 'Mật khẩu không trùng khớp');
  // });

  // it('Test case 16: Mật khẩu cũ không đúng', () => {
  //   cy.visit('/user/password');
  //   cy.get('#old-password-input').type('abcd@12345');
  //   cy.get('#new-password-input').type('abcd@1234');
  //   cy.get('#confirm-password-input').type('abcd@1234');
  //   cy.get('button[type="submit"]').click();
  //   cy.get('.toast-message', { timeout: 10000 }).contains(
  //     'Mật khẩu không chính xác !',
  //   );
  // });

  // it('Test case 18: Mật khẩu mới trùng với mật khẩu cũ', () => {
  //   cy.visit('/user/password');
  //   cy.get('#old-password-input').type('abcd@123');
  //   cy.get('#new-password-input').type('abcd@123');
  //   cy.get('#confirm-password-input').type('abcd@123');
  //   cy.get('button[type="submit"]').click();
  //   cy.get('.toast-message', { timeout: 5000 }).contains(
  //     'Mật khẩu mới không được trùng với mật khẩu cũ!',
  //   );
  // });

  // it('Test case 19: Đổi mật khẩu thành công', () => {
  //   cy.visit('/user/password');
  //   cy.get('#old-password-input').type('abcd@1234');
  //   cy.get('#new-password-input').type('abcd@123');
  //   cy.get('#confirm-password-input').type('abcd@123');
  //   cy.get('button[type="submit"]').click();
  //   cy.get('.toast-message', { timeout: 10000 }).contains(
  //     'Đổi mật khẩu thành công!',
  //   );
  // });
});
