// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//

declare namespace Cypress {
  interface Chainable<Subject> {
    loginUser(): typeof loginUser;
    loginHospital(): typeof loginHospital;
    loginAdmin(): typeof loginAdmin;
    changePassword(): typeof changePassword;
  }
}

Cypress.Commands.add('loginUser' as any, loginUser);
function loginUser() {
  cy.request({
    method: 'POST',
    url: 'https://vanmanh.azurewebsites.net/api/user/login',
    body: {
      email: 'khanhlinh999@yopmail.com',
      password: 'abcd@123',
    },
  }).then((res: any) => {
    window.localStorage.setItem('token', res.body.data.access_token);
    window.localStorage.setItem('role', res.body.data.role);
    window.localStorage.setItem('user', JSON.stringify(res.body.data));
  });
}

Cypress.Commands.add('loginHospital' as any, loginHospital);
function loginHospital() {
  cy.request({
    method: 'POST',
    url: 'https://vanmanh.azurewebsites.net/api/user/login',
    body: {
      email: 'benhvienkimkhanh@yopmail.com',
      password: '123456',
    },
  }).then((res: any) => {
    window.localStorage.setItem('token', res.body.data.access_token);
    window.localStorage.setItem('role', res.body.data.role);
    window.localStorage.setItem('user', JSON.stringify(res.body.data));
  });
}

Cypress.Commands.add('loginAdmin' as any, loginAdmin);
function loginAdmin() {
  cy.request({
    method: 'POST',
    url: 'https://vanmanh.azurewebsites.net/api/admin/login',
    body: {
      email: 'vanmanh.dut@yopmail.com',
      password: '123456',
    },
  }).then((res: any) => {
    window.localStorage.setItem('token', res.body.data.access_token);
    window.localStorage.setItem('role', res.body.data.role);
    window.localStorage.setItem('user', JSON.stringify(res.body.data));
  });
}

Cypress.Commands.add('changePassword' as any, changePassword);
function changePassword(oldPass: any, newPass: any, confirmPass: any) {
  cy.request({
    method: 'POST',
    url: 'https://vanmanh.azurewebsites.net/api/user/change-password',
    body: {
      current_password: oldPass,
      new_password: newPass,
      new_password_confirmation: confirmPass,
    },
  }).then((res: any) => {});
}
