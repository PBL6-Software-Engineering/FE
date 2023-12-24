import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password-admin',
  templateUrl: './reset-password-admin.component.html',
  styleUrls: ['./reset-password-admin.component.css'],
})
export class ResetPasswordAdminComponent implements OnInit {
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
      this.authService.resetPassAdmin(this.form.value).subscribe({
        next: (res) => {
          this.isSaving = false;
          this.toastrService.success('Cập nhât mật khẩu thành công!');
          this.router.navigate(['auth/sign-in/admin']);
        },
        error: (err) => {
          this.isSaving = false;
          this.toastrService.error(err.error.message);
        },
      });
    }
  }
}
