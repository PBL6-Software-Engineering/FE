import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user/services/user.service';

@Component({
  selector: 'app-user-password',
  templateUrl: './user-password.component.html',
  styleUrls: ['./user-password.component.scss'],
})
export class UserPasswordComponent implements OnInit {
  form: FormGroup;
  isValidOldPass = true;
  isSaving = false;

  constructor(
    private userService: UserService,
    private toastrService: ToastrService,
  ) {}

  messagesValidatePass = [
    { type: 'minlength', message: 'Mật khẩu chỉ từ 6-20 kí tự' },
    { type: 'maxlength', message: 'Mật khẩu chỉ từ 6-20 kí tự' },
  ];

  ngOnInit(): void {
    this.form = new FormGroup({
      oldPass: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20),
      ]),
      pwGroup: new FormGroup(
        {
          newPass: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ]),
          confirmPass: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
          ]),
        },
        this.comparePassword,
      ),
    });
  }

  comparePassword(c: AbstractControl) {
    const v = c.value;
    return v.newPass === v.confirmPass
      ? null
      : {
          passwordNotMatch: true,
        };
  }

  changePassword(): void {
    // call API here
    if (this.form.valid && !this.isSaving) {
      this.isSaving = true;
      const obj = {
        current_password: this.form.value.oldPass,
        new_password: this.form.value.pwGroup.newPass,
        new_password_confirmation: this.form.value.pwGroup.confirmPass,
      };
      this.userService.changePassword(obj).subscribe({
        next: (res) => {
          this.toastrService.success('Đổi mật khẩu thành công!');
          this.isSaving = false;
          this.form.reset();
        },
        error: (err) => {
          this.toastrService.error('Đổi mật khẩu thất bại!');
          this.isSaving = false;
        },
      });
    }
  }
}
