import { Component, OnInit } from '@angular/core';
import { TimeWorkingService } from '../_services/time_working.service';
import { isError } from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-f7-working-time',
  templateUrl: './f7-working-time.component.html',
  styleUrls: ['./f7-working-time.component.scss'],
})
export class F7WorkingTimeComponent implements OnInit {
  isSaving = false;
  copyFrom = 'monday';
  pasteTo = 'all';
  days = [
    { name: 'Thứ 2', value: 'monday' },
    { name: 'Thứ 3', value: 'tuesday' },
    { name: 'Thứ 4', value: 'wednesday' },
    { name: 'Thứ 5', value: 'thursday' },
    { name: 'Thứ 6', value: 'friday' },
    { name: 'Thứ 7', value: 'saturday' },
    { name: 'Chủ nhật', value: 'sunday' },
  ];
  timeWorking: any = {
    enable: true,
    note: '',
    times: {
      friday: {
        night: {
          time: ['7:30', '11:30'],
          enable: true,
        },
        enable: true,
        morning: {
          time: ['11:30', '12:30'],
          enable: true,
        },
        afternoon: {
          time: ['12:30', '17:30'],
          enable: true,
        },
      },
      monday: {
        night: {
          time: ['10:00', '20:00'],
          enable: true,
        },
        enable: true,
        morning: {
          time: ['07:30', '22:30'],
          enable: true,
        },
        afternoon: {
          time: ['13:30', '22:30'],
          enable: true,
        },
      },
      sunday: {
        night: {
          time: ['22:00', '22:30'],
          enable: true,
        },
        enable: true,
        morning: {
          time: ['11:30', '12:30'],
          enable: true,
        },
        afternoon: {
          time: ['10:30', '13:30'],
          enable: true,
        },
      },
      tuesday: {
        night: {
          time: ['10:00', '12:00'],
          enable: true,
        },
        enable: true,
        morning: {
          time: ['07:30', '11:30'],
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
          time: ['07:30', '11:30'],
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
          time: ['07:30', '11:30'],
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
          time: ['07:30', '11:30'],
          enable: true,
        },
        afternoon: {
          time: ['13:30', '17:30'],
          enable: true,
        },
      },
    },
  };
  isError = false;

  constructor(
    private timeWorkingService: TimeWorkingService,
    private toastrService: ToastrService,
  ) {}

  ngOnInit(): void {
    this.timeWorkingService.get().subscribe({
      next: ({ data }) => {
        this.timeWorking = data;
        this.formatTimeWorkingMapping();
      },
      error: (err) => {
        this.isError = true;
        this.toastrService.error('Lỗi tải thông tin');
      },
    });
  }

  save() {
    this.formatTimeWorkingBeforeSave();
    this.isSaving = true;
    this.timeWorkingService.update(this.timeWorking).subscribe({
      next: ({ data }) => {
        this.toastrService.success('Cập nhật thành công');
        this.isSaving = false;
      },
      error: (err) => {
        this.toastrService.error('Cập nhật thất bại');
        this.isSaving = false;
      },
    });
  }

  copyConfigurePaste() {
    if (this.pasteTo === 'all') {
      this.days.forEach((day) => {
        ['morning', 'afternoon', 'night'].forEach((time) => {
          this.timeWorking.times[day.value][time] = {
            ...this.timeWorking.times[this.copyFrom][time],
          };
        });
      });
    } else {
      ['morning', 'afternoon', 'night'].forEach((time) => {
        this.timeWorking.times[this.pasteTo][time] = {
          ...this.timeWorking.times[this.copyFrom][time],
        };
      });
    }
  }

  formatTimeWorkingMapping() {
    this.days.forEach((day) => {
      ['morning', 'afternoon', 'night'].forEach((time) => {
        const obj = this.timeWorking.times[day.value][time];
        obj.fromHour = obj.time[0].split(':')[0];
        obj.fromMinute = obj.time[0].split(':')[1];

        obj.toHour = obj.time[1].split(':')[0];
        obj.toMinute = obj.time[1].split(':')[1];
      });
    });
  }

  formatTimeWorkingBeforeSave() {
    this.days.forEach((day) => {
      ['morning', 'afternoon', 'night'].forEach((time) => {
        const obj = this.timeWorking.times[day.value][time];
        // time from
        obj.time[0] =
          obj.fromHour.toString().padStart(2, '0') +
          ':' +
          obj.fromMinute.toString().padStart(2, '0');

        obj.time[1] =
          obj.toHour.toString().padStart(2, '0') +
          ':' +
          obj.toMinute.toString().padStart(2, '0');
      });
    });
  }
}
