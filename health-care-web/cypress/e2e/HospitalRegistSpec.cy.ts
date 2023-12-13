import 'cypress-file-upload';
describe('Đăng nhập', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/auth/sign-up/hospital');
  });
  it('Nên hiện ra lỗi khi không nhập tên bệnh viện', () => {
    // cy.get('#hospital-name').type('Bệnh viện hoàn mỹ');
    cy.get('#email').type('nguyen@gmail.com');
    cy.get('#phone').type('0923102938');
    cy.get('#address').type('HLL');
    cy.get('#code').type('53');
    cy.get('#xOr').type('10');
    cy.get('#yOr').type('13');
    cy.get('#infrastructure').type('Máy đo nhịp tim');
    cy.get('#add').click();
    cy.get('#username').type('hoanmy');
    cy.get('#description').type('het suc hoan my');
    cy.get('#password').type('asdjhasd');
    cy.get('#confirm').type('asdjhasd');

    cy.get('#btn-login').click();

    cy.get('#hospital-name-w')
      .invoke('text')
      .should('eq', ' Bạn phải nhập tên. ');
  });
  it('Nên hiện ra lỗi khi không email', () => {
    cy.get('#hospital-name').type('Bệnh viện hoàn mỹ');
    // cy.get('#email').type('nguyen@gmail.com');
    cy.get('#phone').type('0923102938');
    cy.get('#address').type('HLL');
    cy.get('#code').type('53');
    cy.get('#xOr').type('10');
    cy.get('#yOr').type('13');
    cy.get('#infrastructure').type('Máy đo nhịp tim');
    cy.get('#add').click();
    cy.get('#username').type('hoanmy');
    cy.get('#description').type('het suc hoan my');
    cy.get('#password').type('asdjhasd');
    cy.get('#confirm').type('asdjhasd');

    cy.get('#btn-login').click();

    cy.get('#email-w').invoke('text').should('eq', ' Bạn phải nhập email. ');
  });
  it('Nên hiện ra lỗi khi không nhập đúng email', () => {
    cy.get('#hospital-name').type('Bệnh viện hoàn mỹ');
    cy.get('#email').type('nguyen');
    cy.get('#phone').type('0923102938');
    cy.get('#address').type('HLL');
    cy.get('#code').type('53');
    cy.get('#xOr').type('10');
    cy.get('#yOr').type('13');
    cy.get('#infrastructure').type('Máy đo nhịp tim');
    cy.get('#add').click();
    cy.get('#username').type('hoanmy');
    cy.get('#description').type('het suc hoan my');
    cy.get('#password').type('asdjhasd');
    cy.get('#confirm').type('asdjhasd');

    cy.get('#btn-login').click();

    cy.get('#email-w2').invoke('text').should('eq', ' Hãy nhập email hợp lệ. ');
  });
  it('Nên hiện ra lỗi khi không nhập số điện thoại', () => {
    cy.get('#hospital-name').type('Bệnh viện hoàn mỹ');
    cy.get('#email').type('nguyen@gmail.com');
    //   cy.get('#phone').type('0923102938');
    cy.get('#address').type('HLL');
    cy.get('#code').type('53');
    cy.get('#xOr').type('10');
    cy.get('#yOr').type('13');
    cy.get('#infrastructure').type('Máy đo nhịp tim');
    cy.get('#add').click();
    cy.get('#username').type('hoanmy');
    cy.get('#description').type('het suc hoan my');
    cy.get('#password').type('asdjhasd');
    cy.get('#confirm').type('asdjhasd');

    cy.get('#btn-login').click();

    cy.get('#phone-w')
      .invoke('text')
      .should('eq', ' Bạn phải nhập số điện thoại. ');
  });
  it('Nên hiện ra lỗi khi không nhập địa chỉ', () => {
    cy.get('#hospital-name').type('Bệnh viện hoàn mỹ');
    cy.get('#email').type('hoanmi@gmail.com');
    cy.get('#phone').type('0923102938');
    //   cy.get('#address').type('HLL');
    cy.get('#code').type('53');
    cy.get('#xOr').type('10');
    cy.get('#yOr').type('13');
    cy.get('#infrastructure').type('Máy đo nhịp tim');
    cy.get('#add').click();
    cy.get('#username').type('hoanmy');
    cy.get('#description').type('het suc hoan my');
    cy.get('#password').type('asdjhasd');
    cy.get('#confirm').type('asdjhasd');

    cy.get('#btn-login').click();

    cy.get('#address-w')
      .invoke('text')
      .should('eq', ' Bạn phải nhập địa chỉ. ');
  });
  it('Nên hiện ra lỗi khi không mã tỉnh , thành phố', () => {
    cy.get('#hospital-name').type('Bệnh viện hoàn mỹ');
    cy.get('#email').type('hoanmi@gmail.com');
    cy.get('#phone').type('0923102938');
    cy.get('#address').type('HLL');
    //   cy.get('#code').type('53');
    cy.get('#xOr').type('10');
    cy.get('#yOr').type('13');
    cy.get('#infrastructure').type('Máy đo nhịp tim');
    cy.get('#add').click();
    cy.get('#username').type('hoanmy');
    cy.get('#description').type('het suc hoan my');
    cy.get('#password').type('asdjhasd');
    cy.get('#confirm').type('asdjhasd');

    cy.get('#btn-login').click();

    cy.get('#address-w')
      .invoke('text')
      .should('eq', ' Bạn phải nhập địa chỉ. ');
  });
  it('Nên hiện ra lỗi khi không nhập mô tả', () => {
    cy.get('#hospital-name').type('Bệnh viện hoàn mỹ');
    cy.get('#email').type('hoanmi@gmail.com');
    cy.get('#phone').type('0923102938');
    cy.get('#address').type('HLL');
    cy.get('#code').type('53');
    cy.get('#xOr').type('10');
    cy.get('#yOr').type('13');
    cy.get('#infrastructure').type('Máy đo nhịp tim');
    cy.get('#add').click();
    cy.get('#username').type('hoanmy');
    //   cy.get('#description').type('het suc hoan my');
    cy.get('#password').type('asdjhasd');
    cy.get('#confirm').type('asdjhasd');

    cy.get('#btn-login').click();

    cy.get('#description-w')
      .invoke('text')
      .should('eq', ' Bạn phải nhập mô tả. ');
  });
  it('Hiển thị thiết bị đã chọn', () => {
    cy.get('#infrastructure').type('Máy đo nhịp tim');
    cy.get('#add').click();

    cy.get('.tag').invoke('text').should('eq', ' Máy đo nhịp tim ');
  });
  it('Nên hiện ra 1 thiết bị sau khi Xóa  1 thiết', () => {
    cy.get('#infrastructure').type('Máy 1');
    cy.get('#add').click();
    cy.get('#infrastructure').type('Máy 2');
    cy.get('#add').click();

    cy.get('#0').click();
    cy.get('.tag').invoke('text').should('eq', ' Máy 1Máy 2 ');
  });

  it('Nên hiện ra lỗi khi không nhập username', () => {
    cy.get('#hospital-name').type('Bệnh viện hoàn mỹ');
    cy.get('#email').type('hoanmi@gmail.com');
    cy.get('#phone').type('0923102938');
    cy.get('#address').type('HLL');
    cy.get('#code').type('53');
    cy.get('#xOr').type('10');
    cy.get('#yOr').type('13');
    cy.get('#infrastructure').type('Máy đo nhịp tim');
    cy.get('#add').click();
    // cy.get('#username').type('hoanmy');
    cy.get('#description').type('het suc hoan my');
    cy.get('#password').type('asdjhasd');
    cy.get('#confirm').type('asdjhasd');

    cy.get('#btn-login').click();

    cy.get('#username-w')
      .invoke('text')
      .should('eq', ' Bạn phải nhập tên đăng nhập. ');
  });
  it('Nên hiện ra lỗi khi không nhập mật khẩu', () => {
    cy.get('#hospital-name').type('Bệnh viện hoàn mỹ');
    cy.get('#email').type('hoanmi@gmail.com');
    cy.get('#phone').type('0923102938');
    cy.get('#address').type('HLL');
    cy.get('#code').type('53');
    cy.get('#xOr').type('10');
    cy.get('#yOr').type('13');
    cy.get('#infrastructure').type('Máy đo nhịp tim');
    cy.get('#add').click();
    cy.get('#username').type('hoanmy');
    cy.get('#description').type('het suc hoan my');
    //   cy.get('#password').type('asdjhasd');
    cy.get('#confirm').type('asdjhasd');

    cy.get('#btn-login').click();

    cy.get('#password-w')
      .invoke('text')
      .should('eq', ' Bạn phải nhập mật khẩu. ');
  });
  it('Nên hiện ra lỗi khi không xác nhận mật khẩu', () => {
    cy.get('#hospital-name').type('Bệnh viện hoàn mỹ');
    cy.get('#email').type('hoanmi@gmail.com');
    cy.get('#phone').type('0923102938');
    cy.get('#address').type('HLL');
    cy.get('#code').type('53');
    cy.get('#xOr').type('10');
    cy.get('#yOr').type('13');
    cy.get('#infrastructure').type('Máy đo nhịp tim');
    cy.get('#add').click();
    cy.get('#username').type('hoanmy');
    cy.get('#description').type('het suc hoan my');
    cy.get('#password').type('asdjhasd');
    //   cy.get('#confirm').type('asdjhasd');

    cy.get('#btn-login').click();

    cy.get('#confirm-w')
      .invoke('text')
      .should('eq', ' Bạn phải xác nhập mật khẩu. ');
  });
  it('Nên hiện ra lỗi khi không xác nhận mật khẩu', () => {
    cy.get('#hospital-name').type('Bệnh viện hoàn mỹ');
    cy.get('#email').type('hoanmi@gmail.com');
    cy.get('#phone').type('0923102938');
    cy.get('#address').type('HLL');
    cy.get('#code').type('53');
    cy.get('#xOr').type('10');
    cy.get('#yOr').type('13');
    cy.get('#infrastructure').type('Máy đo nhịp tim');
    cy.get('#add').click();
    cy.get('#username').type('hoanmy');
    cy.get('#description').type('het suc hoan my');
    cy.get('#password').type('asdjhasd');
    //   cy.get('#confirm').type('asdjhasd');

    cy.get('#btn-login').click();

    cy.get('#confirm-w')
      .invoke('text')
      .should('eq', ' Bạn phải xác nhập mật khẩu. ');
  });
  it('Nên hiện ra lỗi khi độ dài mật khẩu không đạt mật khẩu', () => {
    cy.get('#hospital-name').type('Bệnh viện hoàn mỹ');
    cy.get('#email').type('hoanmi@gmail.com');
    cy.get('#phone').type('0923102938');
    cy.get('#address').type('HLL');
    cy.get('#code').type('53');
    cy.get('#xOr').type('10');
    cy.get('#yOr').type('13');
    cy.get('#infrastructure').type('Máy đo nhịp tim');
    cy.get('#add').click();
    cy.get('#username').type('hoanmy');
    cy.get('#description').type('het suc hoan my');
    cy.get('#password').type('as');
    cy.get('#confirm').type('asdjhasd');

    cy.get('#btn-login').click();

    cy.get('#password-w')
      .invoke('text')
      .should('eq', ' Mật khẩu phải dài hơn 6 kí tự. ');
  });
  it('Nên hiển thị mật khẩu khi nhấn vào checkbox', () => {
    cy.get('#password').type('as');

    cy.get('#show').click();

    cy.get('#password').should('have.value', 'as');
  });
  it('Nên hiển thị thành công khi nhập đủ và đúng thông tin', () => {
    cy.get('#hospital-name').type('Bệnh viện hoàn mỹ');
    cy.get('#email').type('vietnam128@gmail.com');
    cy.get('#phone').type('09231022131');
    cy.get('#address').type('HLL');
    cy.get('#code').type('53');
    cy.get('#xOr').type('10');
    cy.get('#yOr').type('13');
    cy.get('#infrastructure').type('Máy đo nhịp tim');
    cy.get('#add').click();
    cy.get('#username').type('hoanmy128');
    cy.get('#description').type('het suc hoan my');
    cy.get('#password').type('asdjhasd');
    cy.get('#confirm').type('asdjhasd');

    cy.get('#btn-login').click();
    cy.wait(20000);
    cy.wait(10000);
    cy.location('pathname').should('eq', '/');
  });
});
