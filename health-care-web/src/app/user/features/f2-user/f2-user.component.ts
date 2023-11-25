import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';

@Component({
  selector: 'app-f2-user',
  templateUrl: './f2-user.component.html',
  styleUrls: ['./f2-user.component.scss'],
})
export class F2UserComponent {
  constructor(
    private tokenStorageService: TokenStorageService,
    private toastrService: ToastrService,
    private router: Router,
  ) {}

  logout(): void {
    this.tokenStorageService.removeToken();
    this.router.navigateByUrl('/');
    this.toastrService.success('Đăng xuất thành công');
  }
}
