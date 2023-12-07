import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private router: Router,
  ) {}

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
    this.buildForm();
  }

  buildForm() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      id_department: new FormControl(null, [Validators.required]),
      province_code: new FormControl(null, [Validators.required]),
      // quá trình đào tạo
      training_process: new FormArray([]),
      // điểm nổi bật nhất
      prominent: new FormArray([]),
      // thế mạnh chuyên môn
      strengths: new FormArray([]),
      // kinh nghiệm làm việc
      work_experience: new FormArray([]),
      // Giải thưởng và ghi nhận
      awards_recognition: new FormArray([]),
      // Sách, báo, công trình nghiên cứu
      research_work: new FormArray([]),
    });
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

  addField(type: any): void {
    const fg = new FormGroup({
      title: new FormControl('', [Validators.required]),
      subtitle: new FormArray([new FormControl('')], [Validators.required]),
    });
    if (type === 'training_process') {
      this.training_process?.push(fg);
    } else if (type === 'prominent') {
      this.prominent?.push(fg);
    } else if (type === 'strengths') {
      this.strengths?.push(fg);
    } else if (type === 'work_experience') {
      this.work_experience?.push(fg);
    }
  }

  removeField(type: any, index: any): void {
    if (type === 'training_process') {
      const arrayRemove = this.training_process.controls.filter(
        (item: any, i: any) => i !== index,
      );
      this.form.setControl('training_process', new FormArray([]));
      if (arrayRemove && arrayRemove.length > -1) {
        arrayRemove.forEach((element: any) => {
          this.training_process?.push(element);
        });
      }
    } else if (type === 'prominent') {
      const arrayRemove = this.prominent.controls.filter(
        (item: any, i: any) => i !== index,
      );
      this.form.setControl('prominent', new FormArray([]));
      if (arrayRemove && arrayRemove.length > -1) {
        arrayRemove.forEach((element: any) => {
          this.prominent?.push(element);
        });
      }
    } else if (type === 'strengths') {
      const arrayRemove = this.strengths.controls.filter(
        (item: any, i: any) => i !== index,
      );
      this.form.setControl('strengths', new FormArray([]));
      if (arrayRemove && arrayRemove.length > -1) {
        arrayRemove.forEach((element: any) => {
          this.strengths?.push(element);
        });
      }
    } else if (type === 'work_experience') {
      const arrayRemove = this.work_experience.controls.filter(
        (item: any, i: any) => i !== index,
      );
      this.form.setControl('work_experience', new FormArray([]));
      if (arrayRemove && arrayRemove.length > -1) {
        arrayRemove.forEach((element: any) => {
          this.work_experience?.push(element);
        });
      }
    }
  }

  get training_process(): FormArray {
    return this.form.get('training_process') as FormArray;
  }
  get strengths(): FormArray {
    return this.form.get('strengths') as FormArray;
  }
  get prominent(): FormArray {
    return this.form.get('prominent') as FormArray;
  }
  get work_experience(): FormArray {
    return this.form.get('work_experience') as FormArray;
  }
  get awards_recognition(): FormArray {
    return this.form.get('awards_recognition') as FormArray;
  }
  get research_work(): FormArray {
    return this.form.get('research_work') as FormArray;
  }

  getSubTitle(type: any, index: number) {
    return this.form
      .get(`${type}`)
      ?.get(`${index}`)
      ?.get('subtitle') as FormArray;
  }
}
