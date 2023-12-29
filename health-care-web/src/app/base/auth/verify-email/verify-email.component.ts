import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  token = '';
  isSuccess = false;
  isVerify = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastrService: ToastrService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params.token) {
        this.token = params.token;
        this.isVerify = true;
        this.authService.verifyEmailUser(this.token).subscribe({
          next: (res) => {
            this.toastrService.success('Xác thực thành công');
            this.isSuccess = true;
            this.isVerify = false;
          },
          error: (err) => {
            this.toastrService.error('Xác thực không thành công');
            this.isSuccess = false;
            this.isVerify = false;
          },
        });
      } else {
        this.router.navigate(['auth/sign-in']);
      }
    });
  }
}
