import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';

@Component({
  selector: 'app-header-info-user',
  templateUrl: './header-info-user.component.html',
  styleUrls: ['./header-info-user.component.scss'],
})
export class HeaderInfoUserComponent {
  @Output() closeHeaderInfo = new EventEmitter();

  user: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private toastrService: ToastrService,
  ) {
    this.tokenStorageService
      .getUser()
      .subscribe((user: any) => (this.user = user || {}));
  }

  onCloseHeaderInfo(): void {
    this.closeHeaderInfo.emit();
  }

  logout(): void {
    this.tokenStorageService.removeToken();
    this.onCloseHeaderInfo();
    this.router.navigateByUrl('/');
    this.toastrService.success('Đăng xuất thành công');
  }
}
