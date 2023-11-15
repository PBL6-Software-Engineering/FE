import {
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentHospitalService } from 'src/app/admin/_services/department_hospital.service';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';
import { HospitalService } from '../../_services/hospital.service';

@Component({
  selector: 'app-f6-doctor-create',
  templateUrl: './f6-doctor-create.component.html',
  styleUrls: ['./f6-doctor-create.component.scss'],
})
export class F6DoctorCreateComponent implements OnInit {
  form: FormGroup;
  hospital: any;
  departmentsOfHospital: any[] = [];
  provinces: any[] = [];
  isSaving: boolean = false;

  constructor(
    private api: HospitalService,
    private departmentHospitalService: DepartmentHospitalService,
    private toastrService: ToastrService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      id_department: new FormControl(null, [Validators.required]),
      province_code: new FormControl(null, [Validators.required]),
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
    this.provinces = JSON.parse(localStorage.getItem('provinces') || '[]');
  }

  save(): void {
    if (this.form.valid && !this.isSaving) {
      this.isSaving = true;
      this.api.addDoctor(this.form.value).subscribe({
        next: (res) => {
          this.toastrService.success('Thêm thành công!');
          this.router.navigateByUrl('/admin/doctor');
        },
        error: (err) => {
          this.toastrService.error('Thêm thất bại!');
          this.isSaving = false;
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

