import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  signal,
} from '@angular/core';
import { AppointmentService } from '../../_services/appointment.service';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalendarOptions, EventApi, EventClickArg } from 'fullcalendar';
import { BehaviorSubject, Subscription } from 'rxjs';
import { prefixApi } from 'src/app/core/constants/api.constant';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';

@Component({
  selector: 'app-appointment-hospital',
  templateUrl: './appointment-hospital.component.html',
  styleUrls: ['./appointment-hospital.component.scss'],
})
export class AppointmentHospitalComponent implements OnInit {
  type: string = 'table'; // 'calendar'
  dataSources: any[] = [];
  appointmentsOfWeek: any[] = [];

  calendarVisible = signal(true);
  currentEvents = signal<EventApi[]>([]);
  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
    },
    initialView: 'timeGridWeek',
  });

  currentPage = 1;
  totalPage = 0;
  totalElements = 0;
  numberElementOfPage = 0;

  // subscription
  subscription: Subscription[] = [];
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isErrorGetData: boolean = false;

  isSelectAll = false;
  idsSelected: Map<any, boolean> = new Map();

  isSearching = false;
  isLoading = false;
  textSearch = '';
  lastTextSearch = '';
  isCancling = false;
  isErrorCancle = false;

  selectedItem: any;

  constructor(
    private appoinrmentService: AppointmentService,
    private el: ElementRef,
    private changeDetector: ChangeDetectorRef,
    private toastrService: ToastrService,
    private spinnerService: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.onLoadData();
  }

  onLoadData(): void {
    this.isLoading = true;
    this.spinnerService.show();
    this.appoinrmentService
      .getAppointmentHospital(this.getStartAndEndDateOfWeek())
      .subscribe({
        next: ({ data }) => {
          console.log(data);
          this.dataSources = data;
          this.appointmentsOfWeek = data;

          const eventData = this.appointmentsOfWeek.map((appointment) => {
            return {
              id: appointment.id,
              title: appointment.user_name,
              name: appointment.user_name,
              address: appointment.user_address,
              email: appointment.user_email,
              phone: appointment.user_phone,
              avatar: appointment.user_avatar,
              birthday: appointment.user_date_of_birth,
              service_name: appointment.service_name,
              start: new Date(
                appointment.work_schedule_time.date +
                  'T' +
                  appointment.work_schedule_time.interval[0] +
                  ':00'
              ),
              end: new Date(
                appointment.work_schedule_time.date +
                  'T' +
                  appointment.work_schedule_time.interval[1] +
                  ':00'
              ),
            };
          });
          this.calendarOptions = signal<CalendarOptions>({
            locale: 'vi',
            plugins: [
              interactionPlugin,
              dayGridPlugin,
              timeGridPlugin,
              listPlugin,
            ],
            headerToolbar: {
              left: '',
              center: 'title',
              right: 'timeGridWeek,timeGridDay,listWeek',
            },
            buttonText: {
              today: 'Hôm nay',
              month: 'Tháng',
              week: 'Tuần',
              day: 'Ngày',
              list: 'Lịch biểu',
            },
            initialView: 'timeGridWeek',
            initialEvents: eventData,
            weekends: true,
            editable: true,
            selectable: true,
            selectMirror: true,
            dayMaxEvents: true,
            eventClick: this.handleEventClick.bind(this),
            eventsSet: this.handleEvents.bind(this),
          });
          this.isLoading = false;
          this.spinnerService.hide();
        },
        error: () => {
          this.isLoading = false;
          this.spinnerService.hide();
        },
      });

    // this.dataSources = [
    //   {
    //     id: 9,
    //     service_id: 2,
    //     service_name: 'Trám răng kẽ hở 2 răng',
    //     service_time_advise: 120,
    //     service_price: 350000,
    //     service_infor: {
    //       location: [19, 29],
    //       about_service:
    //         '<p></p>\n                            <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline">Trám răng thưa là phương pháp sử dụng các vật liệu trám nhằm thu hẹp các kẽ hở của răng một cách tự nhiên.<br /><br />Phòng khám Đa khoa Quốc tế Sài Gòn hiện đang triển khai gói dịch vụ Trám răng kẽ hở 2 răng nhằm cải thiện các vấn đề liên quan đến tính thẩm mỹ, đảm bảo chức năng ăn nhai của răng.</span></p>\n                            <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline"><br />Quy trình trám răng thưa diễn ra tương đối nhanh chóng và tiết kiệm chi phí. Khoảng hở được lấp đầy nhờ răng 2 bên được trám rộng ra, nhưng vẫn được tách biệt bởi một khe hẹp ở giữa một cách tự nhiên.</span></p>',
    //       prepare_process:
    //         '<p>\n                            </p>\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Quá trình trám răng diễn ra tương đối nhanh chóng và đơn giản, không gây cảm giác đau đớn, vì thế bạn hoàn toàn có thể thoải mái trước khi tiến hành trám răng.</span>\n                            <br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" />\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Không nên ăn ngay sau khi tiến hành trám. Có thể ăn sau khoảng từ 1 - 2 giờ nhằm giúp cho vật liệu trám đông cứng hoàn toàn và đảm bảo hiệu quả chỗ trám.</span>',
    //       service_details:
    //         '<p></p>\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: pre-line">Quy trình trám răng:\n                            • Bác sĩ tiến hành thăm khám và tư vấn\n                            • Gây tê và vệ sinh chỗ cần trám\n                            • Tiến hành trám\n                            • Kiểm tra, chỉnh sửa chỗ trám và hoàn tất</span>',
    //     },
    //     work_schedule_id: 9,
    //     work_schedule_price: 350000,
    //     work_schedule_time: {
    //       date: '2023-11-10',
    //       interval: ['07:30', '09:30'],
    //     },
    //     work_schedule_content:
    //       'Bạn có lịch dịch vụ Trám răng kẽ hở 2 răng thuộc chuyên khoa Nhãn Khoa của bệnh viện Bệnh viện gia đình vào khoản thời gian từ lúc 07:30 cho đến  09:30 của ngày 2023-11-10 tại địa chỉ Đà Nẵng - Việt Nam Pro.  SĐT Liên hệ bệnh viện : 0971231233 .',
    //     work_schedule_created_at: '2023-11-07 12:03:49',
    //     work_schedule_updated_at: '2023-11-07 12:03:49',
    //     user_id: 12,
    //     user_name: 'Nguyễn Thị Khánh Linh',
    //     user_address: 'Quảng Nam - Việt Nam',
    //     user_avatar: 'storage/image/avatars/users/653cc2a2c5323.jpg',
    //     user_email: 'khanhlinh999@yopmail.com',
    //     user_phone: '0971231233',
    //     user_date_of_birth: '2002-01-24',
    //     doctor_id: null,
    //     doctor_name: null,
    //     doctor_address: null,
    //     doctor_avatar: null,
    //     doctor_email: null,
    //     doctor_phone: null,
    //     hospital_id: 1,
    //     hospital_name: 'Bệnh viện gia đình',
    //     hospital_address: 'Đà Nẵng - Việt Nam Pro',
    //     hospital_avatar: 'storage/image/avatars/hospitals/653cc283a3df8.jpg',
    //     hospital_email: 'benhviengiadinh@yopmail.com',
    //     hospital_phone: '0971231233',
    //     hospital_infrastructure: [
    //       'Máy nội soi',
    //       'Giường bệnh',
    //       'Phòng xét nghiệm',
    //       'Máy chụp phim X-Quang kỹ thuật số',
    //       'Chụp cắt lớp vi tính (Chụp CT)',
    //       'Siêu âm',
    //       'Máy chụp nhũ ảnh',
    //       'Máy khám tân tiến',
    //     ],
    //     hospital_description: 'bệnh viện tốt',
    //     department_id: 4,
    //     department_name: 'Nhãn Khoa',
    //     department_description:
    //       'Khoa Nhãn Khoa chuyên chẩn đoán và điều trị các bệnh liên quan đến mắt.',
    //     department_thumbnail:
    //       'storage/image/thumbnail/departments/1648192921_623d6d99099d03_department_1698508615.png',
    //     department_price: 50000,
    //     department_time_advise: 30,
    //   },
    //   {
    //     id: 8,
    //     service_id: 2,
    //     service_name: 'Trám răng kẽ hở 2 răng',
    //     service_time_advise: 120,
    //     service_price: 350000,
    //     service_infor: {
    //       location: [19, 29],
    //       about_service:
    //         '<p></p>\n                            <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline">Trám răng thưa là phương pháp sử dụng các vật liệu trám nhằm thu hẹp các kẽ hở của răng một cách tự nhiên.<br /><br />Phòng khám Đa khoa Quốc tế Sài Gòn hiện đang triển khai gói dịch vụ Trám răng kẽ hở 2 răng nhằm cải thiện các vấn đề liên quan đến tính thẩm mỹ, đảm bảo chức năng ăn nhai của răng.</span></p>\n                            <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline"><br />Quy trình trám răng thưa diễn ra tương đối nhanh chóng và tiết kiệm chi phí. Khoảng hở được lấp đầy nhờ răng 2 bên được trám rộng ra, nhưng vẫn được tách biệt bởi một khe hẹp ở giữa một cách tự nhiên.</span></p>',
    //       prepare_process:
    //         '<p>\n                            </p>\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Quá trình trám răng diễn ra tương đối nhanh chóng và đơn giản, không gây cảm giác đau đớn, vì thế bạn hoàn toàn có thể thoải mái trước khi tiến hành trám răng.</span>\n                            <br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" />\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Không nên ăn ngay sau khi tiến hành trám. Có thể ăn sau khoảng từ 1 - 2 giờ nhằm giúp cho vật liệu trám đông cứng hoàn toàn và đảm bảo hiệu quả chỗ trám.</span>',
    //       service_details:
    //         '<p></p>\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: pre-line">Quy trình trám răng:\n                            • Bác sĩ tiến hành thăm khám và tư vấn\n                            • Gây tê và vệ sinh chỗ cần trám\n                            • Tiến hành trám\n                            • Kiểm tra, chỉnh sửa chỗ trám và hoàn tất</span>',
    //     },
    //     work_schedule_id: 8,
    //     work_schedule_price: 350000,
    //     work_schedule_time: {
    //       date: '2023-11-10',
    //       interval: ['07:30', '09:30'],
    //     },
    //     work_schedule_content:
    //       'Bạn có lịch dịch vụ Trám răng kẽ hở 2 răng thuộc chuyên khoa Nhãn Khoa của bệnh viện Bệnh viện gia đình vào khoản thời gian từ lúc 07:30 cho đến  09:30 của ngày 2023-11-10 tại địa chỉ Đà Nẵng - Việt Nam Pro.  SĐT Liên hệ bệnh viện : 0971231233 .',
    //     work_schedule_created_at: '2023-11-07 11:30:20',
    //     work_schedule_updated_at: '2023-11-07 11:30:20',
    //     user_id: 38,
    //     user_name: 'Trần Thanh Nguyên',
    //     user_address: null,
    //     user_avatar: null,
    //     user_email: 'trannguyen.06042002@gmail.com',
    //     user_phone: null,
    //     user_date_of_birth: null,
    //     doctor_id: null,
    //     doctor_name: null,
    //     doctor_address: null,
    //     doctor_avatar: null,
    //     doctor_email: null,
    //     doctor_phone: null,
    //     hospital_id: 1,
    //     hospital_name: 'Bệnh viện gia đình',
    //     hospital_address: 'Đà Nẵng - Việt Nam Pro',
    //     hospital_avatar: 'storage/image/avatars/hospitals/653cc283a3df8.jpg',
    //     hospital_email: 'benhviengiadinh@yopmail.com',
    //     hospital_phone: '0971231233',
    //     hospital_infrastructure: [
    //       'Máy nội soi',
    //       'Giường bệnh',
    //       'Phòng xét nghiệm',
    //       'Máy chụp phim X-Quang kỹ thuật số',
    //       'Chụp cắt lớp vi tính (Chụp CT)',
    //       'Siêu âm',
    //       'Máy chụp nhũ ảnh',
    //       'Máy khám tân tiến',
    //     ],
    //     hospital_description: 'bệnh viện tốt',
    //     department_id: 4,
    //     department_name: 'Nhãn Khoa',
    //     department_description:
    //       'Khoa Nhãn Khoa chuyên chẩn đoán và điều trị các bệnh liên quan đến mắt.',
    //     department_thumbnail:
    //       'storage/image/thumbnail/departments/1648192921_623d6d99099d03_department_1698508615.png',
    //     department_price: 50000,
    //     department_time_advise: 30,
    //   },
    //   {
    //     id: 5,
    //     service_id: 2,
    //     service_name: 'Trám răng kẽ hở 2 răng',
    //     service_time_advise: 120,
    //     service_price: 350000,
    //     service_infor: {
    //       location: [19, 29],
    //       about_service:
    //         '<p></p>\n                            <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline">Trám răng thưa là phương pháp sử dụng các vật liệu trám nhằm thu hẹp các kẽ hở của răng một cách tự nhiên.<br /><br />Phòng khám Đa khoa Quốc tế Sài Gòn hiện đang triển khai gói dịch vụ Trám răng kẽ hở 2 răng nhằm cải thiện các vấn đề liên quan đến tính thẩm mỹ, đảm bảo chức năng ăn nhai của răng.</span></p>\n                            <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline"><br />Quy trình trám răng thưa diễn ra tương đối nhanh chóng và tiết kiệm chi phí. Khoảng hở được lấp đầy nhờ răng 2 bên được trám rộng ra, nhưng vẫn được tách biệt bởi một khe hẹp ở giữa một cách tự nhiên.</span></p>',
    //       prepare_process:
    //         '<p>\n                            </p>\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Quá trình trám răng diễn ra tương đối nhanh chóng và đơn giản, không gây cảm giác đau đớn, vì thế bạn hoàn toàn có thể thoải mái trước khi tiến hành trám răng.</span>\n                            <br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" />\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Không nên ăn ngay sau khi tiến hành trám. Có thể ăn sau khoảng từ 1 - 2 giờ nhằm giúp cho vật liệu trám đông cứng hoàn toàn và đảm bảo hiệu quả chỗ trám.</span>',
    //       service_details:
    //         '<p></p>\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: pre-line">Quy trình trám răng:\n                            • Bác sĩ tiến hành thăm khám và tư vấn\n                            • Gây tê và vệ sinh chỗ cần trám\n                            • Tiến hành trám\n                            • Kiểm tra, chỉnh sửa chỗ trám và hoàn tất</span>',
    //     },
    //     work_schedule_id: 5,
    //     work_schedule_price: 350000,
    //     work_schedule_time: {
    //       date: '2023-11-05',
    //       interval: ['07:30', '09:30'],
    //     },
    //     work_schedule_content:
    //       'Bạn có lịch dịch vụ Trám răng kẽ hở 2 răng thuộc chuyên khoa Nhãn Khoa của bệnh viện Bệnh viện gia đình vào khoản thời gian từ lúc 07:30 cho đến  09:30 của ngày 2023-11-05 tại địa chỉ Đà Nẵng - Việt Nam Pro.  SĐT Liên hệ bệnh viện : 0971231233 .',
    //     work_schedule_created_at: '2023-11-04 19:54:01',
    //     work_schedule_updated_at: '2023-11-04 19:59:50',
    //     user_id: 9,
    //     user_name: 'Lê Phi Duy',
    //     user_address: 'Đồng Nai - Việt Nam',
    //     user_avatar: 'storage/image/avatars/users/653cc29c013d2.jpg',
    //     user_email: 'phiduy999@yopmail.com',
    //     user_phone: '0912531233',
    //     user_date_of_birth: '2001-08-01',
    //     doctor_id: 39,
    //     doctor_name: 'Bác sĩ Phạm Cường',
    //     doctor_address: null,
    //     doctor_avatar: null,
    //     doctor_email: 'bacsiphamcuong@yopmail.com',
    //     doctor_phone: null,
    //     hospital_id: 1,
    //     hospital_name: 'Bệnh viện gia đình',
    //     hospital_address: 'Đà Nẵng - Việt Nam Pro',
    //     hospital_avatar: 'storage/image/avatars/hospitals/653cc283a3df8.jpg',
    //     hospital_email: 'benhviengiadinh@yopmail.com',
    //     hospital_phone: '0971231233',
    //     hospital_infrastructure: [
    //       'Máy nội soi',
    //       'Giường bệnh',
    //       'Phòng xét nghiệm',
    //       'Máy chụp phim X-Quang kỹ thuật số',
    //       'Chụp cắt lớp vi tính (Chụp CT)',
    //       'Siêu âm',
    //       'Máy chụp nhũ ảnh',
    //       'Máy khám tân tiến',
    //     ],
    //     hospital_description: 'bệnh viện tốt',
    //     department_id: 4,
    //     department_name: 'Nhãn Khoa',
    //     department_description:
    //       'Khoa Nhãn Khoa chuyên chẩn đoán và điều trị các bệnh liên quan đến mắt.',
    //     department_thumbnail:
    //       'storage/image/thumbnail/departments/1648192921_623d6d99099d03_department_1698508615.png',
    //     department_price: 50000,
    //     department_time_advise: 30,
    //   },
    //   {
    //     id: 4,
    //     service_id: null,
    //     service_name: null,
    //     service_time_advise: null,
    //     service_price: null,
    //     service_infor: null,
    //     work_schedule_id: 4,
    //     work_schedule_price: 2600000,
    //     work_schedule_time: {
    //       date: '2023-11-05',
    //       interval: ['19:00', '20:00'],
    //     },
    //     work_schedule_content:
    //       'Bạn có lịch tư vấn với bác sĩ Bác sĩ Thanh Nguyên thuộc chuyên khoa  Tâm Lý của bệnh viện Bệnh viện gia đình vào khoản thời gian từ lúc 19:00 cho đến  20:00 của ngày 2023-11-05 tại địa chỉ Đà Nẵng - Việt Nam Pro.  SĐT Liên hệ bệnh viện : 0971231233 .',
    //     work_schedule_created_at: '2023-11-04 19:49:44',
    //     work_schedule_updated_at: '2023-11-04 19:49:44',
    //     user_id: 9,
    //     user_name: 'Lê Phi Duy',
    //     user_address: 'Đồng Nai - Việt Nam',
    //     user_avatar: 'storage/image/avatars/users/653cc29c013d2.jpg',
    //     user_email: 'phiduy999@yopmail.com',
    //     user_phone: '0912531233',
    //     user_date_of_birth: '2001-08-01',
    //     doctor_id: 13,
    //     doctor_name: 'Bác sĩ Thanh Nguyên',
    //     doctor_address: 'Tuyên Quang - Việt Nam',
    //     doctor_avatar: 'storage/image/avatars/doctors/653cc2dad846e.jpg',
    //     doctor_email: 'bacsinguyen9@yopmail.com',
    //     doctor_phone: '0971456233',
    //     hospital_id: 1,
    //     hospital_name: 'Bệnh viện gia đình',
    //     hospital_address: 'Đà Nẵng - Việt Nam Pro',
    //     hospital_avatar: 'storage/image/avatars/hospitals/653cc283a3df8.jpg',
    //     hospital_email: 'benhviengiadinh@yopmail.com',
    //     hospital_phone: '0971231233',
    //     hospital_infrastructure: [
    //       'Máy nội soi',
    //       'Giường bệnh',
    //       'Phòng xét nghiệm',
    //       'Máy chụp phim X-Quang kỹ thuật số',
    //       'Chụp cắt lớp vi tính (Chụp CT)',
    //       'Siêu âm',
    //       'Máy chụp nhũ ảnh',
    //       'Máy khám tân tiến',
    //     ],
    //     hospital_description: 'bệnh viện tốt',
    //     department_id: 10,
    //     department_name: 'Tâm Lý',
    //     department_description:
    //       'Khoa Tâm Lý cung cấp dịch vụ tư vấn tâm lý và chăm sóc tâm lý.',
    //     department_thumbnail:
    //       'storage/image/thumbnail/departments/tam-ly_department_1698508478.png',
    //     department_price: 2600000,
    //     department_time_advise: 60,
    //   },
    //   {
    //     id: 3,
    //     service_id: 2,
    //     service_name: 'Trám răng kẽ hở 2 răng',
    //     service_time_advise: 120,
    //     service_price: 350000,
    //     service_infor: {
    //       location: [19, 29],
    //       about_service:
    //         '<p></p>\n                            <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline">Trám răng thưa là phương pháp sử dụng các vật liệu trám nhằm thu hẹp các kẽ hở của răng một cách tự nhiên.<br /><br />Phòng khám Đa khoa Quốc tế Sài Gòn hiện đang triển khai gói dịch vụ Trám răng kẽ hở 2 răng nhằm cải thiện các vấn đề liên quan đến tính thẩm mỹ, đảm bảo chức năng ăn nhai của răng.</span></p>\n                            <p data-size="base" data-type="regular" class="wIj6fkD " style=" font-variant-numeric: inherit; font-variant-east-asian: inherit; font-variant-alternates: inherit; font-variant-position: inherit; font-stretch: inherit; line-height: 24px; font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; vertical-align: baseline; color: var(--custom-color,#262626)"><span style=" font-style: inherit; font-variant: inherit; font-weight: inherit; font-stretch: inherit; line-height: inherit; font-family: inherit; font-optical-sizing: inherit; font-kerning: inherit; font-feature-settings: inherit; font-variation-settings: inherit; font-size: 16px; letter-spacing: inherit; vertical-align: baseline"><br />Quy trình trám răng thưa diễn ra tương đối nhanh chóng và tiết kiệm chi phí. Khoảng hở được lấp đầy nhờ răng 2 bên được trám rộng ra, nhưng vẫn được tách biệt bởi một khe hẹp ở giữa một cách tự nhiên.</span></p>',
    //       prepare_process:
    //         '<p>\n                            </p>\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Quá trình trám răng diễn ra tương đối nhanh chóng và đơn giản, không gây cảm giác đau đớn, vì thế bạn hoàn toàn có thể thoải mái trước khi tiến hành trám răng.</span>\n                            <br style=" color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px" />\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px">• Không nên ăn ngay sau khi tiến hành trám. Có thể ăn sau khoảng từ 1 - 2 giờ nhằm giúp cho vật liệu trám đông cứng hoàn toàn và đảm bảo hiệu quả chỗ trám.</span>',
    //       service_details:
    //         '<p></p>\n                            <span style="color: rgb(38, 38, 38); font-family: Inter, -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Roboto, Oxygen, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;, sans-serif; font-size: 16px; white-space: pre-line">Quy trình trám răng:\n                            • Bác sĩ tiến hành thăm khám và tư vấn\n                            • Gây tê và vệ sinh chỗ cần trám\n                            • Tiến hành trám\n                            • Kiểm tra, chỉnh sửa chỗ trám và hoàn tất</span>',
    //     },
    //     work_schedule_id: 3,
    //     work_schedule_price: 350000,
    //     work_schedule_time: {
    //       date: '2023-11-05',
    //       interval: ['07:30', '09:30'],
    //     },
    //     work_schedule_content:
    //       'Bạn có lịch dịch vụ Trám răng kẽ hở 2 răng thuộc chuyên khoa Nhãn Khoa của bệnh viện Bệnh viện gia đình vào khoản thời gian từ lúc 07:30 cho đến  09:30 của ngày 2023-11-05 tại địa chỉ Đà Nẵng - Việt Nam Pro.  SĐT Liên hệ bệnh viện : 0971231233 .',
    //     work_schedule_created_at: '2023-11-04 19:02:16',
    //     work_schedule_updated_at: '2023-11-04 19:05:26',
    //     user_id: 9,
    //     user_name: 'Lê Phi Duy',
    //     user_address: 'Đồng Nai - Việt Nam',
    //     user_avatar: 'storage/image/avatars/users/653cc29c013d2.jpg',
    //     user_email: 'phiduy999@yopmail.com',
    //     user_phone: '0912531233',
    //     user_date_of_birth: '2001-08-01',
    //     doctor_id: 15,
    //     doctor_name: 'Bác sĩ Thu Sương',
    //     doctor_address: 'Vinh - Nghệ An - Việt Nam',
    //     doctor_avatar: 'storage/image/avatars/doctors/653cc2df2b92b.jpg',
    //     doctor_email: 'bacsithusuong@yopmail.com',
    //     doctor_phone: '0971456233',
    //     hospital_id: 1,
    //     hospital_name: 'Bệnh viện gia đình',
    //     hospital_address: 'Đà Nẵng - Việt Nam Pro',
    //     hospital_avatar: 'storage/image/avatars/hospitals/653cc283a3df8.jpg',
    //     hospital_email: 'benhviengiadinh@yopmail.com',
    //     hospital_phone: '0971231233',
    //     hospital_infrastructure: [
    //       'Máy nội soi',
    //       'Giường bệnh',
    //       'Phòng xét nghiệm',
    //       'Máy chụp phim X-Quang kỹ thuật số',
    //       'Chụp cắt lớp vi tính (Chụp CT)',
    //       'Siêu âm',
    //       'Máy chụp nhũ ảnh',
    //       'Máy khám tân tiến',
    //     ],
    //     hospital_description: 'bệnh viện tốt',
    //     department_id: 4,
    //     department_name: 'Nhãn Khoa',
    //     department_description:
    //       'Khoa Nhãn Khoa chuyên chẩn đoán và điều trị các bệnh liên quan đến mắt.',
    //     department_thumbnail:
    //       'storage/image/thumbnail/departments/1648192921_623d6d99099d03_department_1698508615.png',
    //     department_price: 50000,
    //     department_time_advise: 30,
    //   },
    //   {
    //     id: 2,
    //     service_id: null,
    //     service_name: null,
    //     service_time_advise: null,
    //     service_price: null,
    //     service_infor: null,
    //     work_schedule_id: 2,
    //     work_schedule_price: 2600000,
    //     work_schedule_time: {
    //       date: '2023-11-05',
    //       interval: ['18:00', '19:00'],
    //     },
    //     work_schedule_content:
    //       'Bạn có lịch tư vấn với bác sĩ Bác sĩ Thanh Nguyên thuộc chuyên khoa  Tâm Lý của bệnh viện Bệnh viện gia đình vào khoản thời gian từ lúc 18:00 cho đến  19:00 của ngày 2023-11-05 tại địa chỉ Đà Nẵng - Việt Nam Pro.  SĐT Liên hệ bệnh viện : 0971231233 .',
    //     work_schedule_created_at: '2023-11-04 18:56:27',
    //     work_schedule_updated_at: '2023-11-04 18:56:27',
    //     user_id: 9,
    //     user_name: 'Lê Phi Duy',
    //     user_address: 'Đồng Nai - Việt Nam',
    //     user_avatar:
    //       prefixApi + '/storage/image/avatars/users/653cc29c013d2.jpg',
    //     user_email: 'phiduy999@yopmail.com',
    //     user_phone: '0912531233',
    //     user_date_of_birth: '2001-08-01',
    //     doctor_id: 13,
    //     doctor_name: 'Bác sĩ Thanh Nguyên',
    //     doctor_address: 'Tuyên Quang - Việt Nam',
    //     doctor_avatar: 'storage/image/avatars/doctors/653cc2dad846e.jpg',
    //     doctor_email: 'bacsinguyen9@yopmail.com',
    //     doctor_phone: '0971456233',
    //     hospital_id: 1,
    //     hospital_name: 'Bệnh viện gia đình',
    //     hospital_address: 'Đà Nẵng - Việt Nam Pro',
    //     hospital_avatar: 'storage/image/avatars/hospitals/653cc283a3df8.jpg',
    //     hospital_email: 'benhviengiadinh@yopmail.com',
    //     hospital_phone: '0971231233',
    //     hospital_infrastructure: [
    //       'Máy nội soi',
    //       'Giường bệnh',
    //       'Phòng xét nghiệm',
    //       'Máy chụp phim X-Quang kỹ thuật số',
    //       'Chụp cắt lớp vi tính (Chụp CT)',
    //       'Siêu âm',
    //       'Máy chụp nhũ ảnh',
    //       'Máy khám tân tiến',
    //     ],
    //     hospital_description: 'bệnh viện tốt',
    //     department_id: 10,
    //     department_name: 'Tâm Lý',
    //     department_description:
    //       'Khoa Tâm Lý cung cấp dịch vụ tư vấn tâm lý và chăm sóc tâm lý.',
    //     department_thumbnail:
    //       'storage/image/thumbnail/departments/tam-ly_department_1698508478.png',
    //     department_price: 2600000,
    //     department_time_advise: 60,
    //   },
    //   {
    //     id: 1,
    //     service_id: null,
    //     service_name: null,
    //     service_time_advise: null,
    //     service_price: null,
    //     service_infor: null,
    //     work_schedule_id: 1,
    //     work_schedule_price: 2600000,
    //     work_schedule_time: {
    //       date: '2023-11-03',
    //       interval: ['18:00', '19:00'],
    //     },
    //     work_schedule_content:
    //       'Bạn có lịch tư vấn với bác sĩ Bác sĩ Thanh Nguyên thuộc chuyên khoa  Tâm Lý của bệnh viện Bệnh viện gia đình vào khoản thời gian từ lúc 18:00 cho đến  19:00 của ngày 2023-11-03 tại địa chỉ Đà Nẵng - Việt Nam Pro.  SĐT Liên hệ bệnh viện : 0971231233 .',
    //     work_schedule_created_at: '2023-11-04 18:52:59',
    //     work_schedule_updated_at: '2023-11-04 18:52:59',
    //     user_id: 9,
    //     user_name: 'Lê Phi Duy',
    //     user_address: 'Đồng Nai - Việt Nam',
    //     user_avatar: 'storage/image/avatars/users/653cc29c013d2.jpg',
    //     user_email: 'phiduy999@yopmail.com',
    //     user_phone: '0912531233',
    //     user_date_of_birth: '2001-08-01',
    //     doctor_id: 13,
    //     doctor_name: 'Bác sĩ Thanh Nguyên',
    //     doctor_address: 'Tuyên Quang - Việt Nam',
    //     doctor_avatar: 'storage/image/avatars/doctors/653cc2dad846e.jpg',
    //     doctor_email: 'bacsinguyen9@yopmail.com',
    //     doctor_phone: '0971456233',
    //     hospital_id: 1,
    //     hospital_name: 'Bệnh viện gia đình',
    //     hospital_address: 'Đà Nẵng - Việt Nam Pro',
    //     hospital_avatar: 'storage/image/avatars/hospitals/653cc283a3df8.jpg',
    //     hospital_email: 'benhviengiadinh@yopmail.com',
    //     hospital_phone: '0971231233',
    //     hospital_infrastructure: [
    //       'Máy nội soi',
    //       'Giường bệnh',
    //       'Phòng xét nghiệm',
    //       'Máy chụp phim X-Quang kỹ thuật số',
    //       'Chụp cắt lớp vi tính (Chụp CT)',
    //       'Siêu âm',
    //       'Máy chụp nhũ ảnh',
    //       'Máy khám tân tiến',
    //     ],
    //     hospital_description: 'bệnh viện tốt',
    //     department_id: 10,
    //     department_name: 'Tâm Lý',
    //     department_description:
    //       'Khoa Tâm Lý cung cấp dịch vụ tư vấn tâm lý và chăm sóc tâm lý.',
    //     department_thumbnail:
    //       'storage/image/thumbnail/departments/tam-ly_department_1698508478.png',
    //     department_price: 2600000,
    //     department_time_advise: 60,
    //   },
    // ];
    // this.appointmentsOfWeek = this.dataSources;

    // const eventData = this.appointmentsOfWeek.map((appointment) => {
    //   return {
    //     id: appointment.id,
    //     title: appointment.user_name,
    //     name: appointment.user_name,
    //     address: appointment.user_address,
    //     email: appointment.user_email,
    //     phone: appointment.user_phone,
    //     avatar: appointment.user_avatar,
    //     birthday: appointment.user_date_of_birth,
    //     service_name: appointment.service_name,
    //     start: new Date(
    //       appointment.work_schedule_time.date +
    //         'T' +
    //         appointment.work_schedule_time.interval[0] +
    //         ':00'
    //     ),
    //     end: new Date(
    //       appointment.work_schedule_time.date +
    //         'T' +
    //         appointment.work_schedule_time.interval[1] +
    //         ':00'
    //     ),
    //   };
    // });
    // this.calendarOptions = signal<CalendarOptions>({
    //   locale: 'vi',
    //   plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    //   headerToolbar: {
    //     left: '',
    //     center: 'title',
    //     right: 'timeGridWeek,timeGridDay,listWeek',
    //   },
    //   buttonText: {
    //     today: 'Hôm nay',
    //     month: 'Tháng',
    //     week: 'Tuần',
    //     day: 'Ngày',
    //     list: 'Lịch biểu',
    //   },
    //   initialView: 'timeGridWeek',
    //   initialEvents: eventData,
    //   weekends: true,
    //   editable: true,
    //   selectable: true,
    //   selectMirror: true,
    //   dayMaxEvents: true,
    //   eventClick: this.handleEventClick.bind(this),
    //   eventsSet: this.handleEvents.bind(this),
    // });
  }

  getStartAndEndDateOfWeek() {
    const curr = new Date(); // get current date
    const first = curr.getDate() - curr.getDay() + 2; // First day is the day of the month - the day of the week
    const last = first + 6; // last day is the first day + 6

    const firstday = new Date(curr.setDate(first));
    const lastday = new Date(curr.setDate(last));
    return {
      startDate: firstday.toISOString().split('T')[0],
      endDate: lastday.toISOString().split('T')[0],
    };
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.selectedItem = clickInfo.event.extendedProps;
    console.log(clickInfo.event);
    this.el.nativeElement.querySelector('#btnOpenModalShowInfo').click();
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  onCheckAllSelected() {
    this.isSelectAll = !this.isSelectAll;
    // check or uncheck all items
    this.dataSources.forEach((item) => {
      item.checked = this.isSelectAll;
    });
  }

  onItemSelected(item: any) {
    item.checked = !item.checked;
    this.isSelectAll = this.dataSources.findIndex((t) => !t.checked) === -1;
  }

  getListIdSelect() {
    const ids: any[] = [];
    this.dataSources.forEach((item) => {
      if (item.checked) {
        ids.push(item.id);
      }
    });
    return ids;
  }

  updateCheckedDataSources() {
    if (this.dataSources.length === 0) {
      this.isSelectAll = false;
    } else {
      // checked item when id exist in map
      if (this.idsSelected.size > 0) {
        this.dataSources.forEach((data: any) => {
          if (this.idsSelected.get(data.id)) {
            data.checked = true;
          }
        });
      }
      this.isSelectAll =
        this.dataSources.findIndex((data: any) => !data.checked) === -1;
    }
  }

  onChangePage(page: number) {
    this.currentPage = page;
    // this.;
  }

  search(): void {
    this.isSearching = true;

    setTimeout(() => {
      this.isSearching = false;
      this.changeDetector.detectChanges();

      // call api one second one time
      if (this.textSearch !== this.lastTextSearch) {
        this.lastTextSearch = this.textSearch;
        this.currentPage = 1;

        // call api search
        // this.onLoadData();
      }
    }, 1000);
  }

  onCancleAppointment(): void {
    this.isCancling = true;
    this.isErrorCancle = false;
    this.appoinrmentService
      .cancleAppointment(this.selectedItem.work_schedule_id)
      .subscribe({
        next: () => {
          this.isCancling = false;
          this.isErrorCancle = false;
          this.onLoadData();
          this.el.nativeElement.querySelector('#dismissCancleModal').click();
          this.toastrService.success('Huỷ lịch hẹn thành công!');
        },
        error: () => {
          this.isCancling = false;
          this.isErrorCancle = true;
          this.toastrService.error('Huỷ lịch hẹn thất bại!');
          // this.isCancling = false;
          // this.isErrorCancle = false;
          // this.onLoadData();
          // this.el.nativeElement.querySelector('#dismissCancleModal').click();
          // this.toastrService.success('Huỷ lịch hẹn thành công!');
        },
      });
  }
}
