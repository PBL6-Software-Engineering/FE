import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppointmentService } from '../../_services/appointment.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-modify-info-patient',
  templateUrl: './modify-info-patient.component.html',
  styleUrls: ['./modify-info-patient.component.css'],
})
export class ModifyInfoPatientComponent implements OnInit {
  @Input() selectedItem: any;
  @Output() onLoadData = new EventEmitter<any>();

  idDoctor: any;
  doctors: any[] = [];
  isEmptyDoctor: boolean = false;

  isGettingDoctor: boolean = false;
  isSpecifying: boolean = false;
  isConfirm: boolean = false;
  isChangeInfo: boolean = false;

  form: any;

  constructor(
    private toastrService: ToastrService,
    private el: ElementRef,
    private appoinrmentService: AppointmentService,
    private router: Router,
  ) {
    this.selectedItem =
      this.router.getCurrentNavigation()?.extras.state?.['data'];

    if (!this.selectedItem) {
      this.router.navigateByUrl('/admin/appointment/hospital');
    }
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name_patient: new FormControl('', [Validators.required]),
      address_patient: new FormControl('', []),
      gender_patient: new FormControl('', []),
      email_patient: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      phone_patient: new FormControl('', [
        Validators.required,
        Validators.pattern(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g),
      ]),
      date_of_birth_patient: new FormControl('', [Validators.required]),
      health_condition: new FormControl('', [Validators.required]),
    });

    this.form.patchValue(this.selectedItem);
    this.getListDoctorSpecify();
  }

  getListDoctorSpecify(): void {
    if (this.selectedItem && this.selectedItem.service_id) {
      this.isEmptyDoctor = false;
      this.isGettingDoctor = true;
      this.idDoctor = this.selectedItem ? this.selectedItem.doctor_id : null;
      this.doctors = [];
      this.appoinrmentService
        .getListDoctorSpecify(this.selectedItem.work_schedule_id)
        .subscribe({
          next: ({ data }) => {
            this.doctors = data;
            if (data.length === 0) {
              this.isEmptyDoctor = true;
            }
            this.isGettingDoctor = false;
          },
          error: () => {
            this.doctors = [];
            this.isGettingDoctor = false;
          },
        });
    } else {
      this.doctors = [];
    }
  }

  specifyDoctor(): void {
    if (
      this.selectedItem &&
      this.selectedItem.work_schedule_id &&
      this.idDoctor &&
      this.selectedItem.doctor_id !== this.idDoctor
    ) {
      this.isSpecifying = true;
      this.appoinrmentService
        .specifyDoctor(this.selectedItem.work_schedule_id, this.idDoctor)
        .subscribe({
          next: () => {
            this.onLoadData.emit();
            this.toastrService.success('Chỉ định bác sĩ thành công!');
            this.isSpecifying = false;
            this.selectedItem.doctor_name = this.doctors.find(
              (doctor) => doctor.id === this.idDoctor,
            ).name;
          },
          error: () => {
            this.toastrService.error('Chỉ định bác sĩ thất bại!');
            this.isSpecifying = false;
          },
        });
    }
  }

  confirmAppointment(): void {
    this.isConfirm = true;
    this.appoinrmentService
      .confirmAppointment(
        this.selectedItem.work_schedule_id,
        this.selectedItem.work_schedule_is_confirm ? 0 : 1,
      )
      .subscribe({
        next: () => {
          this.el.nativeElement.querySelector('#dismissConfirmBooking').click();
          this.toastrService.success('Thành công!');
          this.selectedItem.work_schedule_is_confirm = this.selectedItem
            .work_schedule_is_confirm
            ? 0
            : 1;
        },
        error: () => {
          this.toastrService.error('Thất bại!');
          this.el.nativeElement.querySelector('#closeModalShowInfo').click();
        },
      });
  }

  changeInfoPatient(): void {
    if (this.form.valid) {
      this.isChangeInfo = true;
      this.appoinrmentService
        .changeInfoPatient(this.selectedItem.work_schedule_id, this.form.value)
        .subscribe({
          next: () => {
            this.toastrService.success('Thay đổi thông tin thành công!');
            this.isChangeInfo = false;
          },
          error: () => {
            this.toastrService.error('Thay đổi thông tin thất bại!');
            this.isChangeInfo = false;
          },
        });
    } else {
      this.toastrService.warning('Vui lòng thông tin hợp lệ!');
    }
  }
}
