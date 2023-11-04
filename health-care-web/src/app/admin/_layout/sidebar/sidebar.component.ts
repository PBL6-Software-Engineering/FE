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
      routerLink: '/admin/account-setting',
    },
    {
      label: 'Quản lý chung',
      routerLink: '',
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
    //   label: 'Bác sĩ',
    //   routerLink: '/admin/doctor',
    // },
    // {
    //   label: 'Bệnh nhân',
    //   routerLink: '/admin/patient',
    // },
    {
      label: 'Lịch làm việc',
      routerLink: '/admin/working-time',
    },
    {
      label: 'Lịch hẹn',
      routerLink: '/admin/appointment',
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
    {
      label: 'Cài đặt',
      routerLink: '/admin/setting',
    },
  ];
  menuItemsHospital: any[] = [
    {
      label: 'Bảng thống kê',
      routerLink: '/admin/dashboard',
    },
    {
      label: 'Thiết lập tài khoản',
      routerLink: '/admin/account-setting',
    },
    {
      label: 'Quản lý chung',
      routerLink: '',
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
    // {
    //   label: 'Bệnh nhân',
    //   routerLink: '/admin/patient',
    // },
    {
      label: 'Lịch làm việc',
      routerLink: '/admin/working-time',
    },
    {
      label: 'Lịch hẹn',
      routerLink: '/admin/appointment',
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
    {
      label: 'Cài đặt',
      routerLink: '/admin/setting',
    },
  ];
  menuItemsDoctor: any[] = [
    {
      label: 'Bảng thống kê',
      routerLink: '/admin/dashboard',
    },
    {
      label: 'Thiết lập tài khoản',
      routerLink: '/admin/account-setting',
    },
    {
      label: 'Quản lý chung',
      routerLink: '',
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
    // {
    //   label: 'Bệnh nhân',
    //   routerLink: '/admin/patient',
    // },
    {
      label: 'Lịch làm việc',
      routerLink: '/admin/working-time',
    },
    {
      label: 'Lịch hẹn',
      routerLink: '/admin/appointment',
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
    {
      label: 'Cài đặt',
      routerLink: '/admin/setting',
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
    console.log(role);
    if (role && role.toString() === 'manager') {
      this.menuItems = this.menuItemsAdmin;
    } else if (role && role.toString() === 'hospital') {
      this.menuItems = this.menuItemsHospital;
    } else if (role && role.toString() === 'doctor') {
      this.menuItems = this.menuItemsDoctor;
    }
  }

  onClickSidebar(item: any): void {
    this.menuItems.forEach((menuItem) => {
      let isExist = false;

      // kiểm tra menu level 1
      if (menuItem.routerLink === item.routerLink) {
        isExist = true;
        menuItem.active = true;
        // nếu có menu level 2 thì mở hoặc đóng menu level 2
        if (menuItem.subItems) {
          menuItem.showSubItems = !menuItem.showSubItems;
        } else {
          // nếu không có thì chuyển hướng routerLink
          this.router.navigate([menuItem.routerLink]);
        }
      }

      // kiểm tra menu level 2
      if (menuItem.subItems) {
        menuItem.subItems.forEach((subItem: any) => {
          if (subItem.routerLink === item.routerLink) {
            isExist = true;
            subItem.active = true;
            this.router.navigate([subItem.routerLink]);
          } else {
            subItem.active = false;
          }
        });
      }

      // nếu item không tồn tại trong menu thì ẩn menu
      if (!isExist) {
        menuItem.active = false;
        menuItem.showSubItems = false;
      }
    });
  }
  logout() {
    this.tokenStorageService.removeToken();
    this.router.navigateByUrl('/');
    this.toastrService.success('Đăng xuất thành công');
  }
}
