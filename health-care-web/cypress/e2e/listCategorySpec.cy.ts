import 'cypress-file-upload';
describe('Đăng nhập', () => {
  beforeEach(() => {
    cy.login('vanmanh.dut@yopmail.com', '123456');
  });

  // it('Should search for an item', () => {
  //   cy.visit('http://localhost:4200/admin/general/category');
  //   cy.wait(2000); // Đợi để đảm bảo load thành công
  //   cy.get('#search').type('Nuôi').type('{enter}');
  //   cy.wait(4000); // Đợi để đảm bảo load thành công
  //   cy.get('table tbody tr').should('have.length', 2);
  // });
  // it('should handle empty search result', () => {
  //   cy.visit('http://localhost:4200/admin/general/category');
  //   const keyword = 'what';
  //   cy.get('#search').type(keyword).type('{enter}');
  //   cy.wait(4000); // Đợi để đảm bảo load thành công
  //   cy.get('table tbody tr').should('have.length', 0);
  // });
  // it('nên in ra tất cả các danh mục', () => {
  //   cy.visit('http://localhost:4200/admin/general/category');
  //   cy.get('#search').type('{enter}');
  //   cy.wait(4000); // Đợi để đảm bảo load thành công
  //   // cy.get('table tbody tr').should('have.length', 0);
  //   cy.get('.text-muted')
  //     .invoke('text')
  //     .should('eq', ' Hiển thị 1 đến 20 của 29 phần tử ');
  // });
  // it('Nên báo lỗi khi bỏ trống tên danh mục khi tạo mới', () => {
  //   cy.visit('http://localhost:4200/admin/general/category');
  //   cy.wait(4000); // Đợi để đảm bảo load thành công

  //   cy.get('#add').click();
  //   cy.get('#create-save').click();

  //   cy.get('.fs-14.text-danger.mt-2.ng-star-inserted')
  //     .invoke('text')
  //     .should('eq', ' Trường này bắt buộc. ');
  //   // cy.get('table tbody tr').should('have.length', 0);
  // });
//   it('Nên tạo category mới thành công', () => { chưa chạy dc
//     cy.visit('http://localhost:4200/admin/general/category');
//     cy.wait(4000); // Đợi để đảm bảo load thành công

//     cy.get('#add').click();
//     cy.get('#create-name').type('New category');
//     const fileName = 'shoppeeIcon.jpg'; // Tên tệp tin bạn muốn tải lên

//     cy.fixture(fileName).then((fileContent) => {
//       cy.get('#thumbnailCreate').attachFile({
//         fileContent,
//         fileName,
//         mimeType: 'image/png',
//       });
//     });
//     cy.wait(8000); // Đợi để đảm bảo load thành công

//     cy.get('#create-description').type('New category des');

//     cy.get('#create-save').click();
//     cy.wait(4000); // Đợi để đảm bảo load thành công

//     cy.get('.text-muted')
//       .invoke('text')
//       .should('eq', ' Hiển thị 1 đến 20 của 30 phần tử ');
//   });
 it('Nên báo lỗi khi không nhập tên danh mục', () => {//chưa test
    cy.visit('http://localhost:4200/admin/general/category');
    cy.wait(4000); // Đợi để đảm bảo load thành công

    cy.get('#add').click();
    cy.get('#create-save').click();

    cy.get('.fs-14.text-danger.mt-2.ng-star-inserted')
      .invoke('text')
      .should('eq', ' Trường này bắt buộc. ');
    // cy.get('table tbody tr').should('have.length', 0);
  });

});



//   it('Should search for an item', () => {
//     // Nhập dữ liệu vào ô tìm kiếm và kiểm tra kết quả
//     cy.get('input[type="text"]').type('search keyword');
//     cy.get('button.btn-primary-1').click();

//     // Kiểm tra kết quả tìm kiếm
//     cy.get('table tbody tr').should('have.length', expectedNumberOfResults);
//   });

//   it('Should delete an item', () => {
//     // Thực hiện các bước để xóa một mục trong danh sách
//     cy.get('table tbody tr').first().as('itemToDelete');
//     cy.get('@itemToDelete').find('button.btn-danger').click();
//     cy.get('#deleteOneModal').should('be.visible');
//     cy.get('#deleteOneModal button.btn-danger').click();

//     // Kiểm tra xem mục đã được xóa thành công
//     cy.get('@itemToDelete').should('not.exist');
//   });

//   // Thêm các testcase khác tương tự cho các hành vi khác
// });
