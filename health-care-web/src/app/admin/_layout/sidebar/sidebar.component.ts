import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuItemsAdmin: any[] = [
    {
      label: 'Bảng thống kê',
      routerLink: '/admin/dashboard',
    },
    {
      label: 'Thiết lập tài khoản',
      routerLink: undefined,
      subItems: [
        {
          label: 'Cập nhật thông tin',
          routerLink: '/admin/account-setting/update-info/admin',
        },
        {
          label: 'Đổi mật khẩu',
          routerLink: '/admin/account-setting/update-password',
        },
      ],
    },
    {
      label: 'Quản lý chung',
      routerLink: undefined,
      subItems: [
        { label: 'Danh mục', routerLink: '/admin/general/category' },
        { label: 'Chuyên khoa', routerLink: '/admin/general/department' },
      ],
    },
    {
      label: 'Tài khoản người dùng',
      routerLink: '/admin/account-user',
    },
    {
      label: 'Bệnh viện',
      routerLink: '/admin/hospital',
    },
    // {
    //   label: 'Lịch làm việc',
    //   routerLink: '/admin/working-time',
    // },
    // {
    //   label: 'Lịch hẹn',
    //   routerLink: '/admin/appointment',
    // },
    {
      label: 'Bài viết',
      routerLink: '/admin/article',
    },
    {
      label: 'Hội thoại',
      routerLink: '/admin/chat',
    },
    {
      label: 'Báo cáo',
      routerLink: '/admin/report',
    },
  ];
  menuItemsHospital: any[] = [
    {
      label: 'Bảng thống kê',
      routerLink: '/admin/dashboard',
    },
    {
      label: 'Thiết lập tài khoản',
      routerLink: undefined,
      subItems: [
        {
          label: 'Cập nhật thông tin',
          routerLink: '/admin/account-setting/update-info/hospital',
        },
        {
          label: 'Đổi mật khẩu',
          routerLink: '/admin/account-setting/update-password',
        },
      ],
    },
    {
      label: 'Quản lý chung',
      routerLink: undefined,
      subItems: [
        {
          label: 'Chuyên khoa',
          routerLink: '/admin/general-hospital/department',
        },
        {
          label: 'Dịch vụ',
          routerLink: '/admin/general-hospital/service',
        },
      ],
    },
    {
      label: 'Bác sĩ',
      routerLink: '/admin/doctor',
    },
    {
      label: 'Lịch làm việc',
      routerLink: '/admin/working-time',
    },
    {
      label: 'Lịch hẹn',
      routerLink: '/admin/appointment/hospital',
    },
    {
      label: 'Bài viết',
      routerLink: '/admin/article',
    },
    {
      label: 'Hội thoại',
      routerLink: '/admin/chat',
    },
    {
      label: 'Báo cáo',
      routerLink: '/admin/report',
    },
  ];
  menuItemsDoctor: any[] = [
    {
      label: 'Bảng thống kê',
      routerLink: '/admin/dashboard',
    },
    {
      label: 'Thiết lập tài khoản',
      routerLink: undefined,
      subItems: [
        {
          label: 'Cập nhật thông tin',
          routerLink: '/admin/account-setting/update-info/doctor',
        },
        {
          label: 'Đổi mật khẩu',
          routerLink: '/admin/account-setting/update-password',
        },
      ],
    },
    {
      label: 'Quản lý chung',
      routerLink: undefined,
      subItems: [
        {
          label: 'Chuyên khoa',
          routerLink: '/admin/general-hospital/department',
        },
        {
          label: 'Dịch vụ',
          routerLink: '/admin/general-hospital/service',
        },
      ],
    },
    {
      label: 'Lịch hẹn',
      routerLink: '/admin/appointment/doctor',
    },
    {
      label: 'Bài viết',
      routerLink: '/admin/article',
    },
    {
      label: 'Hội thoại',
      routerLink: '/admin/chat',
    },
    {
      label: 'Báo cáo',
      routerLink: '/admin/report',
    },
  ];
  menuItems: any[] = [];
  constructor(
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    const role = this.tokenStorageService.getRole();
    if (role && role.toString() === 'manager') {
      this.menuItems = this.menuItemsAdmin;
    } else if (role && role.toString() === 'hospital') {
      this.menuItems = this.menuItemsHospital;
    } else if (role && role.toString() === 'doctor') {
      this.menuItems = this.menuItemsDoctor;
    }

    const url = this.router.url;

    this.menuItems.forEach((menuItem) => {
      // kiểm tra menu level 1
      if (menuItem.routerLink === url) {
        this.onClickSidebar(menuItem, false);
      }

      // kiểm tra menu level 2
      if (menuItem.subItems) {
        menuItem.subItems.forEach((subItem: any) => {
          if (subItem.routerLink === url) {
            this.onClickSidebar(subItem, false);
          }
        });
      }
    });
  }

  onClickSidebar(item: any, isNavigate = true): void {
    for (let i = 0; i < this.menuItems.length; i++) {
      let isExist = false;
      const menuItem = this.menuItems[i];
      // kiểm tra menu level 1
      if (menuItem.routerLink === item.routerLink && menuItem.label === item.label) {
        isExist = true;
        menuItem.active = true;
        // nếu có menu level 2 thì mở hoặc đóng menu level 2
        if (menuItem.subItems) {
          menuItem.showSubItems = !menuItem.showSubItems;
        } else {
          // nếu không có thì chuyển hướng routerLink
          if (isNavigate) {
            this.router.navigate([menuItem.routerLink]);
          }
        }
      }

      // kiểm tra menu level 2
      if (menuItem.subItems) {
        for (let j = 0; j < menuItem.subItems.length; j++) {
          const subItem = menuItem.subItems[j];
          if (subItem.routerLink === item.routerLink && subItem.label === item.label) {
            isExist = true;
            subItem.active = true;
            menuItem.active = true;
            menuItem.showSubItems = true;

            if (isNavigate) {
              this.router.navigate([subItem.routerLink]);
            }
          } else {
            subItem.active = false;
          }
        }
      }

      // nếu item không tồn tại trong menu thì ẩn menu
      if (!isExist) {
        menuItem.active = false;
        menuItem.showSubItems = false;
      }
    }
  }
  logout() {
    this.tokenStorageService.removeToken();
    this.router.navigateByUrl('/');
    this.toastrService.success('Đăng xuất thành công');
  }
}
