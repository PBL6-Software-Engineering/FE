import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menuItems: any[] = [
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
      label: 'Quản lý chung hos',
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
      label: 'Tài khoản người dùng',
      routerLink: '/admin/account-user',
    },
    {
      label: 'Bệnh viện',
      routerLink: '/admin/hospital',
    },
    {
      label: 'Bác sĩ',
      routerLink: '/admin/doctor',
    },
    // {
    //   label: 'Dịch vụ',
    //   routerLink: '/admin/hospital-service',
    // },
    {
      label: 'Bệnh nhân',
      routerLink: '/admin/patient',
    },
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
      label: 'Nghỉ phép',
      routerLink: '/admin/leave-request',
    },
    // { label: 'Hóa đơn', routerLink: '/admin/invoice' },
    {
      label: 'Báo cáo',
      routerLink: '/admin/report',
    },
    {
      label: 'Cài đặt',
      routerLink: '/admin/setting',
    },
  ];
  constructor(private router: Router) {}

  onClickSidebar(item: any): void {
    this.menuItems.forEach((menuItem) => {
      let isExist = false;

      // kiểm tra menu level 1
      if (menuItem.label === item.label) {
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
          if (subItem.label === item.label) {
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
}
