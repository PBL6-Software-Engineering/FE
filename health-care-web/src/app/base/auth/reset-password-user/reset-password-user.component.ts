import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password-user',
  templateUrl: './reset-password-user.component.html',
  styleUrls: ['./reset-password-user.component.css'],
})
export class ResetPasswordUserComponent {
  form: any;
  isSaving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      if (params.token) {
        this.form = new FormGroup({
          new_password: new FormControl('', [Validators.required]),
          new_password_confirmation: new FormControl('', [Validators.required]),
          token: new FormControl(params.token, [Validators.required]),
        });
      } else {
        this.router.navigate(['auth/sign-in']);
      }
    });
  }

  save() {
    if (this.form.valid) {
      this.isSaving = true;
      if (
        this.form.value.new_password !==
        this.form.value.new_password_confirmation
      ) {
        this.toastrService.error('Mật khẩu xác nhận không khớp!');
        return;
      }
      this.authService.resetPassUser(this.form.value).subscribe({
        next: (res) => {
          this.isSaving = false;
          this.toastrService.success('Cập nhât mật khẩu thành công!');
          this.router.navigate(['auth/sign-in']);
        },
        error: (err) => {
          this.isSaving = false;
          this.toastrService.error(err.error.message);
        },
      });
    }
  }
}
