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
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

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
  isSpecifying = false;
  isGetDoctorSpecify = false;
  isErrorCancle = false;

  selectedItem: any;

  doctorsSpecify: any[] = [];
  isEmptyDoctorSpecify: boolean = false;
  idDoctorSpecify: any;

  // FILTER
  typeBooking: any = null; // 'advise' OR 'service' OR ''
  typeSort: any = null; // new , name , price , time
  sortlatest: any = null; // true , false
  start_date: any = null;
  end_date: any = null;
  status: any = null; // '' OR complete OR upcoming

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
    const filter: any = this.getStartAndEndDateOfWeek();
    filter['typeSort'] = this.typeSort || 'time';
    filter['status'] = this.status || '';
    filter['typeBook'] = this.typeBooking || '';
    this.appoinrmentService.getAppointmentHospital(filter).subscribe({
      next: ({ data }) => {
        this.dataSources = data;
        this.appointmentsOfWeek = data;

        const eventData = this.appointmentsOfWeek.map((appointment) => {
          return {
            id: appointment.id,
            title: appointment.user_name,
            user_name: appointment.user_name,
            user_address: appointment.user_address,
            user_email: appointment.user_email,
            user_phone: appointment.user_phone,
            user_avatar: appointment.user_avatar,
            user_date_of_birth: appointment.user_date_of_birth,
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
        this.onLoadData();
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

  getListDoctorSpecify(id_work_schedule: any): void {
    if (id_work_schedule && this.selectedItem && this.selectedItem.service_id) {
      this.isEmptyDoctorSpecify = false;
      this.isGetDoctorSpecify = true;
      this.idDoctorSpecify = this.selectedItem
        ? this.selectedItem.doctor_id
        : null;
      this.doctorsSpecify = [];
      this.appoinrmentService.getListDoctorSpecify(id_work_schedule).subscribe({
        next: ({ data }) => {
          this.doctorsSpecify = data;
          if (data.length === 0) {
            this.isEmptyDoctorSpecify = true;
          }
          this.isGetDoctorSpecify = false;
        },
        error: () => {
          this.doctorsSpecify = [];
          this.isGetDoctorSpecify = false;
        },
      });
    } else {
      this.doctorsSpecify = [];
    }
  }

  specifyDoctor(): void {
    if (
      this.selectedItem &&
      this.selectedItem.work_schedule_id &&
      this.idDoctorSpecify &&
      this.selectedItem.doctor_id !== this.idDoctorSpecify
    ) {
      this.isSpecifying = true;
      this.appoinrmentService
        .specifyDoctor(this.selectedItem.work_schedule_id, this.idDoctorSpecify)
        .subscribe({
          next: () => {
            this.el.nativeElement.querySelector('#closeModalShowInfo').click();
            this.toastrService.success('Chỉ định bác sĩ thành công!');
            this.onLoadData();
            this.isSpecifying = false;
          },
          error: () => {
            this.toastrService.error('Chỉ định bác sĩ thất bại!');
            this.el.nativeElement.querySelector('#closeModalShowInfo').click();
            this.isSpecifying = false;
          },
        });
    } else {
      this.el.nativeElement.querySelector('#closeModalShowInfo').click();
    }
  }
}
