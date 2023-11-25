import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DepartmentHospitalService } from 'src/app/admin/_services/department_hospital.service';

@Component({
  selector: 'app-hospital-department-edit',
  templateUrl: './hospital-department-edit.component.html',
  styleUrls: ['./hospital-department-edit.component.scss'],
})
export class HospitalDepartmentEditComponent implements OnInit, OnChanges {
  @Input() departments: any[] = [];
  @Input() item: any;
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
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
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

  ngOnChanges(changes: SimpleChanges): void {
    if (this.item && this.item.id_hospital_departments) {
      if (this.item.time_advise) {
        this.item.hour = Math.floor(this.item.time_advise / 60);
        this.item.minute = this.item.time_advise % 60;
      }
      this.form.patchValue(this.item);
    }
  }

  ngOnInit(): void {}

  save(): void {
    if (this.form.valid && !this.isSaving) {
      const obj = {
        id_department: this.form.value.id_department,
        name: this.form.value.name,
        price: this.form.value.price,
        time_advise: this.form.value.hour * 60 + this.form.value.minute,
      };
      this.isSaving = true;
      this.api.update(this.item.id_hospital_departments, obj).subscribe({
        next: (res) => {
          this.form.reset();
          this.toastrService.success('Sửa thành công!');
          this.closeModal.nativeElement.click();
          this.reloadData.emit();
          this.isSaving = false;
        },
        error: (err) => {
          this.toastrService.error('Sửa thất bại!');
          this.isSaving = false;
        },
      });
    } else {
      this.toastrService.error('Vui lòng nhập đầy đủ thông tin');
    }
  }
}
