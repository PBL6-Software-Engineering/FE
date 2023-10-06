import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  menuItems = [
    { label: 'Bảng thống kê', routerLink: '/admin/dashboard' },
    { label: 'Thiết lập tài khoản', routerLink: '/admin/account-setting' },
    {
      label: 'Quản lý chung',
      routerLink: '/admin/general',
      subItems: [
        { label: 'Danh mục', routerLink: '/admin/general/category' },
        { label: 'Chuyên khoa', routerLink: '/admin/general/specialty' },
      ],
    },
    { label: 'Tài khoản người dùng', routerLink: '/admin/user' },
    { label: 'Bệnh viện', routerLink: '/admin/hospital' },
    { label: 'Bác sĩ', routerLink: '/admin/doctor' },
    { label: 'Dịch vụ', routerLink: '/admin/hospital-service' },
    { label: 'Bệnh nhân', routerLink: '/admin/patient' },
    { label: 'Lịch làm việc', routerLink: '/admin/working-time' },
    { label: 'Lịch hẹn', routerLink: '/admin/appointment' },
    { label: 'Bài viết', routerLink: '/admin/article' },
    { label: 'Hội thoại', routerLink: '/admin/chat' },
    { label: 'Nghỉ phép', routerLink: '/admin/leave-request' },
    // { label: 'Hóa đơn', routerLink: '/admin/invoice' },
    { label: 'Báo cáo', routerLink: '/admin/report' },
    { label: 'Cài đặt', routerLink: '/admin/setting' },
  ];
  constructor() {}
}
