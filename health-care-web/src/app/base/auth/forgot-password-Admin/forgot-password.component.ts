import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordAdminComponent {
  forgotPassForm: FormGroup;
  message: string = '';
  step = 1;
  isShowEmail = false;
  isSendingEmail = false;
  isSendingSuccess = false;

  constructor(
    private AuthService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
  ) {
    this.forgotPassForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get emailControl() {
    return this.forgotPassForm.get('email');
  }

  onEmailSubmit() {
    if (this.forgotPassForm.valid) {
      this.isSendingEmail = true;
      this.AuthService.forgotPassAdmin(this.forgotPassForm.value.email).subscribe({
        next: () => {
          this.isSendingEmail = false;
          this.isSendingSuccess = true;
          this.step = 2;
        },
        error: (error) => {
          console.log(error);
          this.toastrService.error(
            error.error.message || 'Gửi email xác thực thất bại',
          );
          this.isSendingEmail = false;
          this.isSendingSuccess = false;
          this.step = 1;
        },
      });
    } else {
      this.isShowEmail = true;
      this.toastrService.warning('Thông tin nhập vào không hợp lệ!');
    }
  }
}
