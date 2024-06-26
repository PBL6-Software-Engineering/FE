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

@Component({
  selector: 'app-hospital-department-create',
  templateUrl: './hospital-department-create.component.html',
  styleUrls: ['./hospital-department-create.component.scss'],
})
export class HospitalDepartmentCreateComponent implements OnInit {
  @Input() departments: any[] = [];
  @Output() reloadData = new EventEmitter();
  @ViewChild('closeModal') closeModal!: ElementRef;

  form: FormGroup;
  isSaving = false;

  constructor(
    private api: DepartmentHospitalService,
    private toastrService: ToastrService,
  ) {
    this.form = new FormGroup({
      id_department: new FormControl(null, [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.min(0)]),
      hour: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(4),
      ]),
      minute: new FormControl('', [
        Validators.required,
        Validators.min(0),
        Validators.max(59),
      ]),
    });
  }

  ngOnInit(): void {}

  save(): void {
    if (this.form.valid && !this.isSaving) {
      const obj = {
        id_department: this.form.value.id_department,
        name: this.form.value.name,
        price: +this.form.value.price,
        time_advise: +this.form.value.hour * 60 + +this.form.value.minute,
      };
      this.isSaving = true;
      this.api.create(obj).subscribe({
        next: (res) => {
          this.toastrService.success('Thêm thành công!');
          this.closeModal.nativeElement.click();
          this.reloadData.emit();
          this.resetForm();
          this.isSaving = false;
        },
        error: (err) => {
          this.toastrService.error('Thêm thất bại!');
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
