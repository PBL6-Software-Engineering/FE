import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss'],
})
export class SubHeaderComponent {
  @Input() data = {
    title: '',
    items: [
      {
        thumbnail: '',
        name: '',
      },
    ],
    tab: '',
  };
  @Output() closeSubHeader = new EventEmitter();

  news: any = [];
  constructor(private router: Router) {
    for (let i = 1; i <= 3; i++) {
      this.news.push({
        image: 'assets/media/image/image-card.jpg',
        title: 'Phòng khám Đa khoa Quốc tế Sài Gòn Chi nhánh Quận 7',
        content: `Phòng khám Đa khoa Quốc tế Sài Gòn Chi nhánh Quận 7 là cơ sở thứ
        3 trực thuộc chuỗi hệ thống Bệnh viện Tai Mũi Họng Sài Gòn –
        Phòng Khám Đa Khoa Quốc Tế Sài Gòn. Được thành lập từ năm 2020,
        phòng khám hoạt động với mục đích mang đến cho bệnh nhân thêm
        lựa chọn đáng tin cậy, tạo sự thuận lợi cho khách hàng trong quá
        trình tầm soát, khám chữa bệnh. Về mặt nhân sự, phòng khám sở
        hữu đội ngũ y bác sĩ giàu kinh nghiệm thuộc các chuyên khoa:
        Tiêu hóa, Tai - Mũi - Họng, Nha khoa, Nhãn khoa, Xét nghiệm,
        Dược, Chẩn đoán hình ảnh,... Chi nhánh phòng khám được trang bị
        đầy đủ các thiết bị máy móc y tế hiện đại công nghệ cao cùng hệ
        thống cơ sở vật chất nội thất được đầu tư đồng nhất. Tất cả đều
        nhằm mục tiêu cung cấp các dịch vụ thăm khám và điều trị hiệu
        quả theo đúng phương châm "Y Đức – Chất Lượng – Thân Thiện."`,
      });
    }
  }

  onCloseSubHeader(): void {
    this.closeSubHeader.emit();
  }

  viewAll(): void {
    let url = '';
    if (this.data.tab === 'CATEGORY') {
      url = 'category';
    } else if (this.data.tab === 'BOOKING_DOCTOR') {
      url = 'departments';
    } else if (this.data.tab === 'SOCIAL') {
      url = 'departments';
    }
    this.router.navigateByUrl(url);
    this.onCloseSubHeader();
  }
}
