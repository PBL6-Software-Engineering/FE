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
    { type: 'minlength', message: 'Mật khẩu phải từ 8-20 kí tự' },
    { type: 'maxlength', message: 'Mật khẩu phải từ 8-20 kí tự' },
    {
      type: 'pattern',
      message:
        'Mật khẩu có chiều dài từ 8-20 kí tự bao gồm ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt',
    },
  ];

  ngOnInit(): void {
    this.form = new FormGroup({
      oldPass: new FormControl('', [
        Validators.required,
        // Mật khẩu có chiều dài từ 8-20 kí tự bao gồm ít nhất 1 chữ cái, 1 chữ số và 1 kí tự đặc biệt
        Validators.pattern(
          '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$',
        ),
      ]),
      pwGroup: new FormGroup(
        {
          newPass: new FormControl('', [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$',
            ),
          ]),
          confirmPass: new FormControl('', [
            Validators.required,
            Validators.pattern(
              '^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,20}$',
            ),
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
      if (this.form.value.oldPass === this.form.value.pwGroup.newPass) {
        this.toastrService.error(
          'Mật khẩu mới không được trùng với mật khẩu cũ!',
        );
        return;
      }
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
          console.log(err);
          const msg =
            err.data && err.data.length
              ? err.data[0]
              : err.error && err.error.message
                ? err.error.message
                : err.message || 'Đổi mật khẩu thất bại!';
          this.toastrService.error(msg);
          this.isSaving = false;
        },
      });
    }
  }
}
