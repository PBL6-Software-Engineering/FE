import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { DepartmentHospitalService } from 'src/app/admin/_services/department_hospital.service';
import { ServiceHospitalService } from 'src/app/admin/_services/service_hospital.service';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';

@Component({
  selector: 'app-hospital-service-edit',
  templateUrl: './hospital-service-edit.component.html',
  styleUrls: ['./hospital-service-edit.component.scss'],
})
export class HospitalServiceEditComponent implements OnInit {
  form: FormGroup;
  hospital: any;
  hospitalService: any;
  departmentsOfHospital: any[] = [];
  id: any;
  isLoading: boolean = false;
  isError: boolean = false;
  isSaving: boolean = false;

  constructor(
    private api: ServiceHospitalService,
    private departmentHospitalService: DepartmentHospitalService,
    private toastrService: ToastrService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private spinnerService: NgxSpinnerService
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
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.isLoading = true;
        this.isError = false;
        this.spinnerService.show();
        this.api.findById(params['id']).subscribe({
          next: ({ data }) => {
            if (data.time_advise) {
              data.hour = Math.floor(data.time_advise / 60);
              data.minute = data.time_advise % 60;
            }
            data.about_service = data.infor.about_service;
            data.prepare_process = data.infor.prepare_process;
            data.service_details = data.infor.service_details;
            data.location = data.infor.location;

            this.hospitalService = data;
            this.form.patchValue(data);

            this.isLoading = false;
            this.isError = false;
          },
          error: (err) => {
            this.toastrService.error('Không tìm thấy dịch vụ!');
            this.isLoading = false;
            this.isError = true;
          },
          complete: () => {
            this.isLoading = false;
            this.spinnerService.hide();
          },
        });
      } else {
        this.router.navigateByUrl('/admin/general-hospital/service');
      }
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
      this.api.update(this.id, obj).subscribe({
        next: (res) => {
          this.toastrService.success('Sửa thành công!');
          this.router.navigateByUrl('/admin/general-hospital/service');
        },
        error: (err) => {
          this.toastrService.error('Sửa thất bại!');
        },
        complete: () => {
          this.isSaving = false;
        }
      });
    } else {
      this.toastrService.error('Vui lòng nhập đầy đủ thông tin');
    }
  }

  resetForm(): void {
    this.form.reset();
  }
}
