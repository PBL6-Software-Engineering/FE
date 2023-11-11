import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HospitalService } from 'src/app/admin/_services/hospital.service';
import { prefixApi } from 'src/app/core/constants/api.constant';

@Component({
  selector: 'app-f4-hospital',
  templateUrl: './f4-hospital.component.html',
  styleUrls: ['./f4-hospital.component.scss'],
})
export class F4HospitalComponent implements OnInit {
  id: any;
  hospital: any;
  tab = 'info';
  services: any[] = [];
  doctors: any[] = [];
  constructor(
    private hospitalService: HospitalService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.hospitalService
          .viewProfileHospital(this.id)
          .subscribe(({ data }) => {
            this.hospital = data;
          });

        this.hospitalService
          .getHospitalService(this.id)
          .subscribe(({ data }) => {
            this.services = data;
          });

        this.hospitalService
          .getDoctorsOfHospital(this.id)
          .subscribe(({ data }) => {
            this.doctors = data;
          });
      }
    });
  }

  chooseTab(tab: string): void {}

  fetchData() {
    this.hospital = {
      id: 2,
      email: 'benhvienkimkhanh@yopmail.com',
      username: 'benhvienkimkhanh',
      name: 'Bệnh viện Kim Khánh',
      phone: '0977864372',
      address: 'Liên Chiểu - Đà Nẵng - Việt Nam',
      avatar:
        prefixApi + '/' + 'storage/image/avatars/hospitals/653cc2874f88b.jpg',
      is_accept: 1,
      role: 'hospital',
      email_verified_at: '2023-10-28T08:12:55.000000Z',
      created_at: '2023-10-28T08:12:56.000000Z',
      updated_at: '2023-11-05T09:13:11.000000Z',
      id_hospital: 2,
      province_code: 2,
      infrastructure: [
        'Máy nội soi',
        'Giường bệnh',
        'Phòng xét nghiệm',
        'Máy chụp phim X-Quang kỹ thuật số',
        'Chụp cắt lớp vi tính (Chụp CT)',
        'Siêu âm',
        'Máy chụp nhũ ảnh',
        'Máy khám tân tiến',
      ],
      description: 'Bệnh viện tốt, đa chuyên khoa, dịch vụ giá cả hợp lí .',
      location: [19, 29],
      search_number: 291,
      time_work: {
        id: 2,
        id_hospital: 2,
        times: {
          friday: {
            night: {
              time: ['18:00', '20:00'],
              enable: true,
            },
            enable: true,
            morning: {
              time: ['7:30', '11:30'],
              enable: true,
            },
            afternoon: {
              time: ['13:30', '17:30'],
              enable: true,
            },
          },
          monday: {
            night: {
              time: ['18:00', '20:00'],
              enable: true,
            },
            enable: true,
            morning: {
              time: ['7:30', '11:30'],
              enable: true,
            },
            afternoon: {
              time: ['13:30', '17:30'],
              enable: true,
            },
          },
          sunday: {
            night: {
              time: ['18:00', '20:00'],
              enable: true,
            },
            enable: true,
            morning: {
              time: ['7:30', '11:30'],
              enable: true,
            },
            afternoon: {
              time: ['13:30', '17:30'],
              enable: true,
            },
          },
          tuesday: {
            night: {
              time: ['18:00', '20:00'],
              enable: true,
            },
            enable: true,
            morning: {
              time: ['7:30', '11:30'],
              enable: true,
            },
            afternoon: {
              time: ['13:30', '17:30'],
              enable: true,
            },
          },
          saturday: {
            night: {
              time: ['18:00', '20:00'],
              enable: true,
            },
            enable: true,
            morning: {
              time: ['7:30', '11:30'],
              enable: true,
            },
            afternoon: {
              time: ['13:30', '17:30'],
              enable: true,
            },
          },
          thursday: {
            night: {
              time: ['18:00', '20:00'],
              enable: true,
            },
            enable: true,
            morning: {
              time: ['7:30', '11:30'],
              enable: true,
            },
            afternoon: {
              time: ['13:30', '17:30'],
              enable: true,
            },
          },
          wednesday: {
            night: {
              time: ['18:00', '20:00'],
              enable: true,
            },
            enable: true,
            morning: {
              time: ['7:30', '11:30'],
              enable: true,
            },
            afternoon: {
              time: ['13:30', '17:30'],
              enable: true,
            },
          },
        },
        enable: 1,
        note: null,
        created_at: '2023-10-28T08:12:56.000000Z',
        updated_at: '2023-10-28T08:12:56.000000Z',
      },
      departments: [
        'Đa Khoa',
        'Nha Khoa',
        'Da Liễu',
        'Nhãn Khoa',
        'Sản - Phụ Khoa',
        'Trị Liệu Thần Kinh Cột Sống',
        'Nhi Khoa',
        'Tai - Mũi - Họng',
        'Khoa Tiêu Hóa',
        'Tâm Lý',
        'Vật Lý Trị Liệu',
      ],
    };
    this.services = [
      {
        id: 12,
        id_hospital_department: 12,
        name: 'Trám răng kẽ hở 2 răng',
        time_advise: 120,
        price: 2550000,
        infor: {
          location: [19, 29],
          about_service:
            '<p></p>\n                            <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline">Trám răng thưa là phương pháp sử dụng các vật liệu trám nhằm thu hẹp các kẽ hở của răng một cách tự nhiên.<br /><br />Phòng khám Đa khoa Quốc tế Sài Gòn hiện đang triển khai gói dịch vụ Trám răng kẽ hở 2 răng nhằm cải thiện các vấn đề liên quan đến tính thẩm mỹ, đảm bảo chức năng ăn nhai của răng.</span></p>\n                            <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline"><br />Quy trình trám răng thưa diễn ra tương đối nhanh chóng và tiết kiệm chi phí. Khoảng hở được lấp đầy nhờ răng 2 bên được trám rộng ra, nhưng vẫn được tách biệt bởi một khe hẹp ở giữa một cách tự nhiên.</span></p>',
          prepare_process:
            '<p>\n                            </p>\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Quá trình trám răng diễn ra tương đối nhanh chóng và đơn giản, không gây cảm giác đau đớn, vì thế bạn hoàn toàn có thể thoải mái trước khi tiến hành trám răng.</span>\n                            <br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" />\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Không nên ăn ngay sau khi tiến hành trám. Có thể ăn sau khoảng từ 1 - 2 giờ nhằm giúp cho vật liệu trám đông cứng hoàn toàn và đảm bảo hiệu quả chỗ trám.</span>',
          service_details:
            '<p></p>\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: pre-line">Quy trình trám răng:\n                            • Bác sĩ tiến hành thăm khám và tư vấn\n                            • Gây tê và vệ sinh chỗ cần trám\n                            • Tiến hành trám\n                            • Kiểm tra, chỉnh sửa chỗ trám và hoàn tất</span>',
        },
        is_delete: 0,
        created_at: '2023-10-28T08:13:29.000000Z',
        updated_at: '2023-10-28T08:13:29.000000Z',
        id_department: 1,
        id_hospital: 2,
        id_hospital_service: 10,
        id_hospital_departments: 12,
        time_advise_hospital_service: 120,
        time_advise_hospital_departments: 120,
        price_hospital_service: 1550000,
        price_hospital_departments: 2550000,
        name_hospital: 'Bệnh viện Kim Khánh',
        name_department: 'Đa Khoa',
        thumbnail_department:
          'storage/image/thumbnail/departments/da-khoa_department_1698508687.png',
        provider_code_service: 2,
        cout_rating: 0,
        number_rating: 0,
      },
      {
        id: 21,
        id_hospital_department: 21,
        name: 'Nhổ răng khôn',
        time_advise: 30,
        price: 2250000,
        infor: {
          location: [19, 29],
          about_service:
            '<p>\n\n                        <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline">Răng khôn là răng mọc cuối cùng và thường xuất hiện ở độ tuổi từ 17 đến 25. Việc răng khôn xuất hiện và phải tiến hành nhổ bỏ vẫn luôn khiến nhiều người nghi ngại bởi mức độ đau và nguy cơ biến chứng.<br /><br />Với lợi thế sở hữu trang thiết bị hiện đại cùng đội ngũ y bác sĩ chuyên khoa dày dặn kinh nghiệm, phòng khám Đa khoa Quốc tế Sài Gòn hiện đang triển khai các hạng mục nhổ răng khôn vĩnh viễn với những nhóm răng: nhóm răng khôn lệch, nhóm răng khôn ngầm, nhóm răng khôn thẳng,...</span></p><p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline"><br />Quá trình được thực hiện nghiêm ngặt, giảm bớt tối đa cảm giác đau, kiểm soát biến chứng và hỗ trợ khách hàng trong việc hồi phục sau quá trình nhổ răng khôn.</span></p>\n                        <br /></p>',
          prepare_process:
            '<p>\n\n                        <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">Trước khi tiến hành nhổ răng khôn, khách hàng cần lưu ý:</span><br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" /><br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" /><span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Vệ sinh răng miệng sạch sẽ</span><br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" /><span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Lấy sạch cao răng, mảng bám trên răng</span><br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" /><span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Không uống rượu bia trước khi nhổ răng một ngày</span><br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" /><span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Nắm rõ tiền sử bệnh của bản thân, các loại thuốc đang sử dụng để trao đổi cùng các bác sĩ</span>\n                        <br /></p>',
          service_details:
            '<p>\n\n                        <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: pre-line">Phòng khám Đa khoa Quốc tế Sài Gòn hiện đang triển khai các loại hình nhổ răng khôn như:\n                        • Nhổ răng khôn vĩnh viễn nhóm răng khôn lệch\n                        • Nhổ răng khôn vĩnh viễn nhóm răng khôn ngầm\n                        • Nhổ răng khôn vĩnh viễn nhóm răng khôn thẳng</span>\n                        <br /></p>',
        },
        is_delete: 0,
        created_at: '2023-10-28T08:13:32.000000Z',
        updated_at: '2023-10-28T08:13:32.000000Z',
        id_department: 10,
        id_hospital: 2,
        id_hospital_service: 12,
        id_hospital_departments: 21,
        time_advise_hospital_service: 30,
        time_advise_hospital_departments: 30,
        price_hospital_service: 1150000,
        price_hospital_departments: 2250000,
        name_hospital: 'Bệnh viện Kim Khánh',
        name_department: 'Tâm Lý',
        thumbnail_department:
          'storage/image/thumbnail/departments/tam-ly_department_1698508478.png',
        provider_code_service: 2,
        cout_rating: 0,
        number_rating: 0,
      },
      {
        id: 15,
        id_hospital_department: 15,
        name: 'Nội soi đại tràng',
        time_advise: 120,
        price: 1550000,
        infor: {
          location: [19, 29],
          about_service:
            '<p>\n\n                        <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline">Nội soi đại tràng là thủ thuật nhằm mục đích hỗ trợ các y bác sĩ quan sát toàn bộ chiều dài của đại tràng và trực tràng, tầm soát các bất thường trong ruột cũng như khối u thịt nhỏ nằm trên thành đại tràng.<br /><br />Bệnh nhân có thể tiến hành nội soi đại tràng nhằm mục đích tìm kiếm nguyên nhân các dấu hiệu và triệu chứng đường ruột, tầm soát ung thư đại tràng, xem xét bệnh nhân có polyp đại tràng hay không.</span></p><p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline"><br />Quá trình nội soi đại tràng thường mất khoảng từ 30 - 45 phút. Các bác sĩ sẽ đưa một ống nhựa dẻo có gắn camera và đèn vào hậu môn, quan sát các cấu trúc bên trong ruột cũng như tìm kiếm các tổn thương như viêm hoặc polyp.</span></p>\n                        <br /></p>',
          prepare_process:
            '<p>\n\n                        <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Bạn không nên ăn thức ăn cứng khô trước khi tiến hành nội soi.</span><br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" /><span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Bác sĩ có thể đề nghị uống thuốc nhuận tràng dưới dạng thuốc viên hoặc dạng lỏng.</span><br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" /><span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Trong một số trường hợp, bạn có thể cần phải sử dụng bộ bơm trực tràng (hay còn gọi là thụt tháo đại tràng) để làm sạch đại tràng vào đêm trước hoặc vài tiếng trước khi khám.</span>\n                        <br /></p>',
          service_details:
            '<p>\n\n                        <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: pre-line">• Quá trình nội soi đại tràng thường mất khoảng từ 30 - 45 phút. Các bác sĩ sẽ tiến hành đưa thiết bị nội soi vào hậu môn, bơm không khí vào ruột già làm cho đoạn ruột phồng ra nhờ vậy có thể quan sát các cấu trúc bên trong ruột một cách rõ hơn.</span>\n                        <br /></p>',
        },
        is_delete: 0,
        created_at: '2023-10-28T08:13:30.000000Z',
        updated_at: '2023-10-28T08:13:30.000000Z',
        id_department: 4,
        id_hospital: 2,
        id_hospital_service: 13,
        id_hospital_departments: 15,
        time_advise_hospital_service: 30,
        time_advise_hospital_departments: 120,
        price_hospital_service: 1300000,
        price_hospital_departments: 1550000,
        name_hospital: 'Bệnh viện Kim Khánh',
        name_department: 'Nhãn Khoa',
        thumbnail_department:
          'storage/image/thumbnail/departments/1648192921_623d6d99099d03_department_1698508615.png',
        provider_code_service: 2,
        cout_rating: 0,
        number_rating: 0,
      },
      {
        id: 18,
        id_hospital_department: 18,
        name: 'Nội soi dạ dày',
        time_advise: 30,
        price: 2850000,
        infor: {
          location: [19, 29],
          about_service:
            '<p>\n\n                        <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline">Nội soi dạ dày là kỹ thuật nhằm mục đích hỗ trợ các y bác sĩ có thể quan sát các cơ quan của ống tiêu hóa (thực quản, dạ dày, tá tràng) nhằm phục vụ cho quá trình chẩn đoán và điều trị bệnh.<br /><br />Quá trình nội soi được thực hiện khi các y bác sĩ sẽ tiến hành dùng ống nội soi chuyên dụng có gắn camera đi qua cổ họng, xuống dạ dày để xem xét, đánh giá các tổn thương bên trong thông qua hình ảnh trên màn hình máy tính.</span></p><p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline"><br />Bệnh nhân có thể được chỉ định nội soi nhằm mục đích tầm soát các triệu chứng bất thường như: chảy máu bất thường, khó nuốt, đau bụng, nghi ngờ mắc các vấn đề bệnh lý liên quan đến dạ dày,...</span></p>\n                        <br /></p>',
          prepare_process:
            '<p>\n\n                        <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Trước khi tiến hành nội soi dạ dày, bệnh nhân cần nhịn ăn trước khi tiến hành thủ thuật khoảng 6 giờ. Tuy nhiên, bạn có thể uống một ít nước trước đó khoảng 2 giờ.</span><br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" /><br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" /><span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Nếu bệnh nhân đang trong quá trình sử dụng các loại thuốc làm loãng máu, hãy thông báo cho bác sĩ khi tiến hành thực hiện thủ thuậ</span>\n                        <br /></p>',
          service_details:
            '<p>\n\n                        <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: pre-line">"• Quá trình nội soi dạ dày kéo dài khoảng 15 phút. Thông thường, bệnh nhân sẽ được tiến hành nội soi trong trạng thái tỉnh táo. Nếu cần thiết bạn sẽ được sử dụng thuốc gây mê để khi thực hiện thủ thuật.\n                        \n                        • Bệnh nhân sẽ được hướng dẫn tư thế nằm phù hợp, các bác sĩ tiến hành đưa thiết bị nội soi vào miệng, xuống cổ họng và đến thực quản, tầm soát các vấn đề bất thường thông qua hình ảnh trên màn hình. "</span>\n                        <br /></p>',
        },
        is_delete: 0,
        created_at: '2023-10-28T08:13:31.000000Z',
        updated_at: '2023-10-28T08:13:31.000000Z',
        id_department: 7,
        id_hospital: 2,
        id_hospital_service: 14,
        id_hospital_departments: 18,
        time_advise_hospital_service: 60,
        time_advise_hospital_departments: 30,
        price_hospital_service: 2350000,
        price_hospital_departments: 2850000,
        name_hospital: 'Bệnh viện Kim Khánh',
        name_department: 'Nhi Khoa',
        thumbnail_department:
          'storage/image/thumbnail/departments/nhi-khoa_department_1698508545.png',
        provider_code_service: 2,
        cout_rating: 0,
        number_rating: 0,
      },
      {
        id: 21,
        id_hospital_department: 21,
        name: 'Soi cổ tử cung',
        time_advise: 30,
        price: 2250000,
        infor: {
          location: [19, 29],
          about_service:
            '<p>\n\n                        <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline">Soi cổ tử cung là thủ thuật được sử dụng nhằm hỗ trợ các y bác sĩ trong việc quan sát âm hộ, âm đạo và cổ tử cung, sàng lọc các vấn đề bệnh lý phụ khoa cũng như các tổn thương nghi ngờ ung thư cổ tử cung.<br /><br />Quá trình soi cổ tử cung được thực hiện khi các bác sĩ sẽ dùng thiết bị soi chuyên dụng để đưa vào bên trong âm đạo. Thiết bị hỗ trợ ghi lại các hình ảnh niêm mạc âm đạo và cổ tử cung nhằm ghi lại những vùng bất thường nổi rõ lên so với những vùng bình thường còn lại.</span></p><p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline"><br />Bệnh nhân có thể được chỉ định thực hiện soi cổ tử cung khi phát hiện các bất thường trong quá trình khám âm đạo nhằm mục đích: tầm soát mụn cóc sinh dục hay HPV, viêm nhiễm cổ tử cung, sự phát triển bất thường ở cổ tử cung hay niêm mạc âm đạo.</span></p>\n                        <br /></p>',
          prepare_process:
            '<p>\n\n                        <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">Để việc soi cổ tử cung mang lại kết quả chính xác, quý khách cần lưu ý một số điều sau trước khi soi cổ tử cung:</span><br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" /><br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" /><span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Không nên soi tử cung trong thời gian đang có kinh nguyệt.</span><br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" /><span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Nên ngừng quan hệ tình dục ít nhất hai ngày trước khi soi cổ tử cung.</span><br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" /><span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Không sử dụng thuốc giảm đau.</span><br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" /><span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Không nên sử dụng băng vệ sinh trong vòng 2 ngày trước khi soi cổ tử cung.</span>\n                        <br /></p>',
          service_details:
            '<p>\n\n                        <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: pre-line">Quy trình thực hiện soi cổ tử cung tại phòng khám:\n                        \n                        • Bệnh nhân được hướng dẫn nằm ngửa, hai chân kê cao.\n                        • Bác sĩ dùng mỏ vịt để mở rộng âm đạo, cổ tử cung của bệnh nhân.\n                        • Bác sĩ lau nhẹ chất tiết âm đạo che mờ vùng khảo sát bằng gạc hoặc tampon.\n                        • Bác sĩ dùng máy soi đặt ở ngoài soi vào trong âm đạo để quan sát.\n                        • Nếu phát hiện tổn thương hay có nghi ngờ, bác sĩ sẽ chỉ định sinh thiết.</span>\n                        <br /></p>',
        },
        is_delete: 0,
        created_at: '2023-10-28T08:13:32.000000Z',
        updated_at: '2023-10-28T08:13:32.000000Z',
        id_department: 10,
        id_hospital: 2,
        id_hospital_service: 15,
        id_hospital_departments: 21,
        time_advise_hospital_service: 120,
        time_advise_hospital_departments: 30,
        price_hospital_service: 3000000,
        price_hospital_departments: 2250000,
        name_hospital: 'Bệnh viện Kim Khánh',
        name_department: 'Tâm Lý',
        thumbnail_department:
          'storage/image/thumbnail/departments/tam-ly_department_1698508478.png',
        provider_code_service: 2,
        cout_rating: 0,
        number_rating: 0,
      },
      {
        id: 21,
        id_hospital_department: 21,
        name: 'Đo loãng xương',
        time_advise: 30,
        price: 2250000,
        infor: {
          location: [19, 29],
          about_service:
            '<p>\n\n                        <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline">Loãng xương là tình trạng suy giảm mật độ xương khiến xương trở nên yếu giòn và dễ gãy hơn. Phần lớn các trường hợp loãng xương đều không có biểu hiện lâm sàng cho đến khi xảy ra tình trạng gãy xương. Vì thế, đo loãng xương chính là biện pháp cần thiết nhằm dự đoán và giảm nguy cơ gãy xương trong tương lai.<br /><br />Quá trình đo loãng xương diễn ra tương đối nhanh chóng và đơn giản mất khoảng từ 20 - 30 phút. Sau khi tiến hành đo loãng xương, các y bác sĩ sẽ đọc kết quả, so sánh các thông số về mật độ xương.</span></p><p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline"><br />Bệnh nhân có thể tiến hành đo loãng xương trong trường hợp có kết quả chụp X-quang thấy có chỗ bị thiếu xương, gãy xương ở cột sống, hay bị đau lưng và nguy cơ gãy đốt sống. Ngoài ra, bất cứ khi nào cảm thấy bản thân gặp các vấn đề về xương khớp, nên tiến hành gặp các bác sĩ chuyên khoa để được thăm khám, đánh giá và có được phác đồ điều trị đúng đắn hiệu quả.</span></p>\n                        <br /></p>',
          prepare_process:
            '<p>\n\n                        <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Bệnh nhân không nên đeo đồ trang sức kim loại hoặc mặc quần áo có các chi tiết kim loại khi tiến hành thực hiện đo loãng xương.</span>\n                        <br /></p>',
          service_details:
            '<p>\n\n                        <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: pre-line">Bác sĩ sẽ hướng dẫn bệnh nhân nằm trên giường đệm của máy đo. Quá trình đo thường diễn ra trong khoảng 20 - 30 phút. Sau quá trình đo, các y bác sĩ sẽ tiến hành đọc kết quả, so sánh các thông số và tư vấn về biện pháp phòng ngừa cũng như điều trị cho bệnh nhân.</span>\n                        <br /></p>',
        },
        is_delete: 0,
        created_at: '2023-10-28T08:13:32.000000Z',
        updated_at: '2023-10-28T08:13:32.000000Z',
        id_department: 10,
        id_hospital: 2,
        id_hospital_service: 16,
        id_hospital_departments: 21,
        time_advise_hospital_service: 60,
        time_advise_hospital_departments: 30,
        price_hospital_service: 2750000,
        price_hospital_departments: 2250000,
        name_hospital: 'Bệnh viện Kim Khánh',
        name_department: 'Tâm Lý',
        thumbnail_department:
          'storage/image/thumbnail/departments/tam-ly_department_1698508478.png',
        provider_code_service: 2,
        cout_rating: 0,
        number_rating: 0,
      },
    ];

    this.doctors = [
      {
        id: 14,
        email: 'bacsisongtoan@yopmail.com',
        username: 'bacsisongtoan',
        name: 'Da Liễu',
        phone: '0971445623',
        address: 'Vinh - Nghệ An - Việt Nam',
        avatar: 'storage/image/avatars/doctors/653cc2efd4acd.jpg',
        is_accept: 1,
        role: 'doctor',
        email_verified_at: '2023-10-28T08:14:40.000000Z',
        created_at: '2023-10-28T08:13:30.000000Z',
        updated_at: '2023-10-28T08:13:30.000000Z',
        id_doctor: 22,
        id_department: 3,
        id_hospital: 2,
        is_confirm: 1,
        province_code: 19,
        date_of_birth: '2002-04-24',
        experience: 4,
        gender: 1,
        search_number: 0,
        description:
          'Khoa Da Liễu chuyên chăm sóc và điều trị các vấn đề liên quan đến da.',
        thumbnail:
          'storage/image/thumbnail/departments/da-lieu_department_1698508633.png',
        time_advise: 120,
        price: 1450000,
        name_doctor: 'Bác sĩ Nguyễn Văn Song Toàn',
        name_department: 'Da Liễu',
        search_number_doctor: 31,
        search_number_department: 0,
        name_hospital: 'Bệnh viện Kim Khánh',
        cout_rating: 0,
        number_rating: 0,
      },
      {
        id: 22,
        email: 'bacsihieu@yopmail.com',
        username: 'bacsihieu',
        name: 'Vật Lý Trị Liệu',
        phone: '0971456233',
        address: 'Thủy Châu - Việt Nam',
        avatar: 'storage/image/avatars/doctors/653cc2e928999.jpg',
        is_accept: 1,
        role: 'doctor',
        email_verified_at: '2023-10-28T08:14:33.000000Z',
        created_at: '2023-10-28T08:13:33.000000Z',
        updated_at: '2023-10-28T08:13:33.000000Z',
        id_doctor: 19,
        id_department: 11,
        id_hospital: 2,
        is_confirm: 1,
        province_code: 29,
        date_of_birth: '2000-02-01',
        experience: 6,
        gender: 0,
        search_number: 0,
        description:
          'Khoa Vật Lý Trị Liệu chuyên cung cấp phục hồi chức năng và trị liệu vật lý.',
        thumbnail:
          'storage/image/thumbnail/departments/1643269253_61f24c85539523_department_1698508442.png',
        time_advise: 0,
        price: 1950000,
        name_doctor: 'Bác sĩ Nguyễn Văn Hiệu',
        name_department: 'Vật Lý Trị Liệu',
        search_number_doctor: 236,
        search_number_department: 0,
        name_hospital: 'Bệnh viện Kim Khánh',
        cout_rating: 0,
        number_rating: 0,
      },
      {
        id: 15,
        email: 'bacsian@yopmail.com',
        username: 'bacsian',
        name: 'Nhãn Khoa',
        phone: '0971454523',
        address: 'Vinh - Nghệ An - Việt Nam',
        avatar: 'storage/image/avatars/doctors/653cc2ebcf304.jpg',
        is_accept: 1,
        role: 'doctor',
        email_verified_at: '2023-10-28T08:14:36.000000Z',
        created_at: '2023-10-28T08:13:30.000000Z',
        updated_at: '2023-10-28T08:13:30.000000Z',
        id_doctor: 20,
        id_department: 4,
        id_hospital: 2,
        is_confirm: 1,
        province_code: 51,
        date_of_birth: '2000-11-29',
        experience: 3,
        gender: 2,
        search_number: 0,
        description:
          'Khoa Nhãn Khoa chuyên chẩn đoán và điều trị các bệnh liên quan đến mắt.',
        thumbnail:
          'storage/image/thumbnail/departments/1648192921_623d6d99099d03_department_1698508615.png',
        time_advise: 120,
        price: 1550000,
        name_doctor: 'Bác sĩ Nguyễn Văn An',
        name_department: 'Nhãn Khoa',
        search_number_doctor: 320,
        search_number_department: 0,
        name_hospital: 'Bệnh viện Kim Khánh',
        cout_rating: 0,
        number_rating: 0,
      },
      {
        id: 12,
        email: 'bacsitantai@yopmail.com',
        username: 'bacsitantai',
        name: 'Đa Khoa',
        phone: '0971456233',
        address: 'Hải Châu - Việt Nam',
        avatar: 'storage/image/avatars/doctors/653cc2edd251a.jpg',
        is_accept: 1,
        role: 'doctor',
        email_verified_at: '2023-10-28T08:14:38.000000Z',
        created_at: '2023-10-28T08:13:29.000000Z',
        updated_at: '2023-10-28T08:13:29.000000Z',
        id_doctor: 21,
        id_department: 1,
        id_hospital: 2,
        is_confirm: 1,
        province_code: 59,
        date_of_birth: '2002-06-19',
        experience: 3,
        gender: 1,
        search_number: 0,
        description:
          'Khoa Đa Khoa chuyên cung cấp chăm sóc y tế tổng quát cho các bệnh nhân.',
        thumbnail:
          'storage/image/thumbnail/departments/da-khoa_department_1698508687.png',
        time_advise: 120,
        price: 2550000,
        name_doctor: 'Bác sĩ Nguyễn Tấn Tài',
        name_department: 'Đa Khoa',
        search_number_doctor: 120,
        search_number_department: 0,
        name_hospital: 'Bệnh viện Kim Khánh',
        cout_rating: 0,
        number_rating: 0,
      },
      {
        id: 22,
        email: 'bacsithang@yopmail.com',
        username: 'bacsithang',
        name: 'Vật Lý Trị Liệu',
        phone: '0971456233',
        address: 'Quảng Nam - Việt Nam',
        avatar: 'storage/image/avatars/doctors/653cc2e67ad04.jpg',
        is_accept: 1,
        role: 'doctor',
        email_verified_at: '2023-10-28T08:14:30.000000Z',
        created_at: '2023-10-28T08:13:33.000000Z',
        updated_at: '2023-10-28T08:13:33.000000Z',
        id_doctor: 18,
        id_department: 11,
        id_hospital: 2,
        is_confirm: 1,
        province_code: 45,
        date_of_birth: '2002-07-31',
        experience: 8,
        gender: 2,
        search_number: 0,
        description:
          'Khoa Vật Lý Trị Liệu chuyên cung cấp phục hồi chức năng và trị liệu vật lý.',
        thumbnail:
          'storage/image/thumbnail/departments/1643269253_61f24c85539523_department_1698508442.png',
        time_advise: 0,
        price: 1950000,
        name_doctor: 'Bác sĩ Huỳnh Công Thắng',
        name_department: 'Vật Lý Trị Liệu',
        search_number_doctor: 17,
        search_number_department: 0,
        name_hospital: 'Bệnh viện Kim Khánh',
        cout_rating: 0,
        number_rating: 0,
      },
    ];
    this.doctors.forEach((doctor) => {
      if (doctor.avatar) {
        doctor.avatar = prefixApi + '/' + doctor.avatar;
      }
    });
  }
}
