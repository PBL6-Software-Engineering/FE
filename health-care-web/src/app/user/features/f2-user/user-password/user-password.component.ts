import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss']
})
export class UserPasswordComponent implements OnInit {
  form: FormGroup;
  isValidOldPass = true;

  constructor() {
    this.form = new FormGroup({
      oldPass: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
      pwGroup: new FormGroup({
        newPass: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]),
        confirmPass: new FormControl( '', [Validators.required, Validators.minLength(8), Validators.maxLength(20)])
      }, this.comparePassword),
    });
  }

  messagesValidatePass = [
    { type: 'minlength', message: 'Mật khẩu chỉ từ 8-20 kí tự' },
    { type: 'maxlength', message: 'Mật khẩu chỉ từ 8-20 kí tự' },
  ]

  ngOnInit(): void {
    
  }

  comparePassword( c: AbstractControl) {
    const v = c.value;
    return (v.newPass === v.confirmPass) ?
      null : {
        passwordNotMatch: true
      };
  }

  changePassword(): void {
    // call API here
  }
}
