import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  signal,
} from '@angular/core';
import { CalendarOptions, EventApi, EventClickArg } from 'fullcalendar';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { AppointmentService } from '../../_services/appointment.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-appointment-doctor',
  templateUrl: './appointment-doctor.component.html',
  styleUrls: ['./appointment-doctor.component.scss'],
})
export class AppointmentDoctorComponent implements OnInit {
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
  appointments: any[] = [];
  isLoading = false;
  isError = false;
  dataClick: any;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private el: ElementRef,
    private appointmentService: AppointmentService,
    private snipperService: NgxSpinnerService,
  ) {}
  ngOnInit(): void {
    this.isLoading = true;
    this.isError = false;
    this.snipperService.show();

    this.appointmentService
      .getAppointmentDoctor(this.getStatrtAndEndDate(new Date()))
      .subscribe({
        next: ({ data }) => {
          this.appointments = data.data;
          const eventData = this.appointments.map((appointment) => {
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
                  ':00',
              ),
              end: new Date(
                appointment.work_schedule_time.date +
                  'T' +
                  appointment.work_schedule_time.interval[1] +
                  ':00',
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
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
            },
            buttonText: {
              today: 'Hôm nay',
              month: 'Tháng',
              week: 'Tuần',
              day: 'Ngày',
              list: 'Lịch biểu',
            },
            initialView: 'dayGridMonth',
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
          this.isError = false;
          this.snipperService.hide();
        },
        error: (err) => {
          this.isLoading = false;
          this.isError = true;
          this.snipperService.hide();
        },
      });
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.mutate((options) => {
      options.weekends = !options.weekends;
    });
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.dataClick = clickInfo.event.extendedProps;
    this.el.nativeElement.querySelector('#btnOpenModalShowInfo').click();
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }

  getStatrtAndEndDate(date: Date) {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return {
      startDate: firstDay.toISOString().split('T')[0],
      endDate: lastDay.toISOString().split('T')[0],
    };
  }
}
