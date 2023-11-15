import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentHospitalService } from 'src/app/admin/_services/department_hospital.service';
import { ServiceHospitalService } from 'src/app/admin/_services/service_hospital.service';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';

@Component({
  selector: 'app-hospital-service-create',
  templateUrl: './hospital-service-create.component.html',
  styleUrls: ['./hospital-service-create.component.scss'],
})
export class HospitalServiceCreateComponent implements OnInit {
  form: FormGroup;
  hospital: any;
  departmentsOfHospital: any[] = [];
  isSaving: boolean = false;

  constructor(
    private api: ServiceHospitalService,
    private departmentHospitalService: DepartmentHospitalService,
    private toastrService: ToastrService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {
    this.form = new FormGroup({
      id_hospital_department: new FormControl(null, [Validators.required]),
      name: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      hour: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(4),
      ]),
      minute: new FormControl(0, [
        Validators.required,
        Validators.min(0),
        Validators.max(59),
      ]),
      about_service: new FormControl('', [Validators.required]),
      prepare_process: new FormControl('', [Validators.required]),
      service_details: new FormControl('', [Validators.required]),
      location: new FormControl([26, 29]),
      is_delete: new FormControl(false),
    });
  }

  ngOnInit(): void {
    this.tokenStorageService.getUser().subscribe((user: any) => {
      this.hospital = user;
      this.departmentHospitalService
        .getDepartmentsOfHospital(this.hospital.id)
        .subscribe(({ data }) => {
          this.departmentsOfHospital = data;
        });
    });
  }

  save(): void {
    if (this.form.valid && !this.isSaving) {
      const obj = Object.assign({}, this.form.value);
      obj.infor = {
        about_service: obj.about_service,
        prepare_process: obj.prepare_process,
        service_details: obj.service_details,
        location: obj.location,
      };
      obj.time_advise = +this.form.value.hour * 60 + +this.form.value.minute;

      this.isSaving = true;
      this.api.create(obj).subscribe({
        next: (res) => {
          this.toastrService.success('Thêm thành công!');
          this.router.navigateByUrl('/admin/general-hospital/service');
        },
        error: (err) => {
          this.toastrService.error('Thêm thất bại!');
        },
        complete: () => {
          this.isSaving = false;
        },
      });
    } else {
      this.toastrService.error('Vui lòng nhập đầy đủ thông tin');
    }
  }

  resetForm(): void {
    this.form.reset();
  }
}
