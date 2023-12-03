import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  signal,
} from '@angular/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { CalendarOptions, EventApi, EventClickArg } from 'fullcalendar';
@Component({
  selector: 'app-appointment-calendar',
  templateUrl: './appointment-calendar.component.html',
  styleUrls: ['./appointment-calendar.component.css'],
})
export class AppointmentCalendarComponent implements OnChanges {
  @Input() data: any[] = [];
  @Output() openShowInfo = new EventEmitter<any>();

  selectedItem: any;
  calendarVisible = signal(true);
  currentEvents = signal<EventApi[]>([]);
  calendarOptions = signal<CalendarOptions>({
    plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
    headerToolbar: {
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
    initialView: 'timeGridWeek',
  });

  constructor(
    private el: ElementRef,
    private changeDetector: ChangeDetectorRef,
  ) {}

  ngOnChanges(): void {
    const eventData = this.data.map((appointment) => {
      return {
        id: appointment.id,
        title: appointment.name_patient,
        name_patient: appointment.name_patient,
        address_patient: appointment.address_patient,
        email_patient: appointment.email_patient,
        phone_patient: appointment.phone_patient,
        user_avatar: appointment.user_avatar,
        date_of_birth_patient: appointment.date_of_birth_patient,
        service_name: appointment.service_name,
        doctor_name: appointment.doctor_name,
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
      plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
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
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.openShowInfo.emit(clickInfo.event.extendedProps);
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
}
