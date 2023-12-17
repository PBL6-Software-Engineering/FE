/// <reference types="cypress" />
describe("E2E Test", () => {
  beforeEach(() => {
    // Mở trang web hoặc load lại trang trước mỗi testcase (nếu cần)
    cy.visit("http://your-website-url");
  });

  it("Should search for an item", () => {
    // Nhập dữ liệu vào ô tìm kiếm và kiểm tra kết quả
    cy.get('input[type="text"]').type("search keyword");
    cy.get("button.btn-primary-1").click();

    // Kiểm tra kết quả tìm kiếm
    cy.get("table tbody tr").should("have.length", expectedNumberOfResults);
  });

  it("Should delete an item", () => {
    // Thực hiện các bước để xóa một mục trong danh sách
    cy.get("table tbody tr").first().as("itemToDelete");
    cy.get("@itemToDelete").find("button.btn-danger").click();
    cy.get("#deleteOneModal").should("be.visible");
    cy.get("#deleteOneModal button.btn-danger").click();

    // Kiểm tra xem mục đã được xóa thành công
    cy.get("@itemToDelete").should("not.exist");
  });

  // Thêm các testcase khác tương tự cho các hành vi khác
});
