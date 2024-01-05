import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { prefixApi } from 'src/app/core/constants/api.constant';
import { ServiceService } from 'src/app/user/services/service.service';

@Component({
  selector: 'app-f12-hospital-service-detail',
  templateUrl: './f12-hospital-service-detail.component.html',
  styleUrls: ['./f12-hospital-service-detail.component.css'],
})
export class F12HospitalServiceDetailComponent implements OnInit {
  service: any;
  serviceId: any;
  step = 1;
  dataBooking: any;
  ratings = [];

  constructor(
    private route: ActivatedRoute,
    private api: ServiceService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.serviceId = params['id'];
        this.api.getServiceDetail(this.serviceId).subscribe({
          next: ({ data }) => {
            this.service = data;
            this.ratings = this.service.ratings.data;
            for (let rating of this.ratings) {
              rating.avatar_user = prefixApi + '/' + rating.avatar_user;
              rating.number_ratings = [];
              for (let i = 0; i < rating.number_rating; i++) {
                rating.number_ratings.push(1);
              }

              for (let i = rating.number_rating; i < 5; i++) {
                rating.number_ratings.push(0);
              }
            }
          },
          error: (err) => {
            console.log(err);
          },
        });
      }
    });

    // this.service = {
    //   id: 14,
    //   id_hospital_department: 14,
    //   name: 'Đo khúc xạ',
    //   time_advise: 30,
    //   price: 2550000,
    //   infor: {
    //     location: [19, 29],
    //     about_service:
    //       "<p><p style=' font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; '><span >Đo khúc xạ hay đo tật khúc xạ là quá trình kiểm tra độ khúc xạ của mắt nhằm xác định mắt có mắc các tình trạng tật khúc xạ như cận, viễn, loạn hay lão thị hay không và xác định chính xác tật khúc xạ nếu có.<br /><br />Bạn có thể thực hiện đo khúc xạ trường hợp cảm giác thị lực đang suy giảm có khả năng mắc các tật khúc xạ, nhạy cảm với ảnh sáng, thường xuyên mỏi mắt.</span></p><p style=' font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; '><span >Trung tâm Mắt Tinh Anh hiện đang triển khai các hình thức đo khúc xạ:<br />• Đo khúc xạ (không liệt điều tiết): 80,000 VNĐ<br />• Đo khúc xạ (liệt điều tiết): 100,000 VNĐ</span></p><br /></p>",
    //     prepare_process:
    //       "<p><span style='color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px'>• Bạn có trao đổi cùng bác sĩ chuyên khoa trường hợp mắt có các biểu hiện bất thường về thị lực, độ nhạy cảm với ánh sáng, thường xuyên bị mỏi mắt,...</span><br /></p>",
    //     service_details:
    //       "<p><span style='color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: pre-line'>Quy trình đo khúc xạ mắt bao gồm: đo thị lực bằng bảng thị lực và đo độ khúc xạ bằng máy khúc xạ tự động. Sau khi đo, bạn sẽ nhận được bảng kết quả và nhận tư vấn từ bác sĩ chuyên khoa mắt.Trung tâm Mắt Tinh Anh hiện đang triển khai các hình thức đo khúc xạ:<br />• Đo khúc xạ (không liệt điều tiết): 80,000 VNĐ<br />• Đo khúc xạ (liệt điều tiết): 100,000 VNĐ</span><br /></p>",
    //   },
    //   search_number_service: 256,
    //   is_delete: 0,
    //   thumbnail_service:
    //     'http://vanmanh.azurewebsites.net/storage/image/thumbnail/services/655e200252d0b.jpg',
    //   id_department: 4,
    //   id_hospital: 2,
    //   id_hospital_service: 80,
    //   id_hospital_departments: 14,
    //   time_advise_hospital_service: 30,
    //   time_advise_hospital_departments: 30,
    //   price_hospital_service: 1950000,
    //   price_hospital_departments: 2550000,
    //   name_hospital: 'Bệnh viện Kim Khanh',
    //   name_department: 'Nhãn Khoa',
    //   thumbnail_department:
    //     'http://vanmanh.azurewebsites.net/storage/image/thumbnail/departments/nhan_khoa_department_1700580525.png',
    //   provider_code_service: 29,
    //   cover_hospital:
    //     'http://vanmanh.azurewebsites.net/storage/image/covers/hospitals/cover quốc tế city_hospital_1700754383.jpg',
    //   cout_rating: 0,
    //   number_rating: 0,
    //   cout_details: {
    //     '1_star': 0,
    //     '2_star': 0,
    //     '3_star': 0,
    //     '4_star': 0,
    //     '5_star': 0,
    //   },
    //   ratings: {
    //     current_page: 1,
    //     data: [],
    //     first_page_url:
    //       'http://vanmanh.azurewebsites.net/api/hospital-service/detail/80?page=1',
    //     from: null,
    //     last_page: 1,
    //     last_page_url:
    //       'http://vanmanh.azurewebsites.net/api/hospital-service/detail/80?page=1',
    //     links: [
    //       {
    //         url: null,
    //         label: '&laquo; Trang sau',
    //         active: false,
    //       },
    //       {
    //         url: 'http://vanmanh.azurewebsites.net/api/hospital-service/detail/80?page=1',
    //         label: '1',
    //         active: true,
    //       },
    //       {
    //         url: null,
    //         label: 'Trang trước &raquo;',
    //         active: false,
    //       },
    //     ],
    //     next_page_url: null,
    //     path: 'http://vanmanh.azurewebsites.net/api/hospital-service/detail/80',
    //     per_page: 6,
    //     prev_page_url: null,
    //     to: null,
    //     total: 0,
    //   },
    // };
  }

  openConfirmBooking(data: any): void {
    this.step = 2;
    this.dataBooking = data;
  }
}
