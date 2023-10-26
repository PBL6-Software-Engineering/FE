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
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DepartmentHospitalService } from 'src/app/admin/_services/department_hospital.service';
import { ServiceHospitalService } from 'src/app/admin/_services/service_hospital.service';

@Component({
  selector: 'app-hospital-service-edit',
  templateUrl: './hospital-service-edit.component.html',
  styleUrls: ['./hospital-service-edit.component.scss'],
})
export class HospitalServiceEditComponent implements OnInit, OnChanges {
  @Input() departments: any[] = [];
  @Input() item: any;
  @Output() reloadData = new EventEmitter();
  @ViewChild('closeModal') closeModal!: ElementRef;

  form: FormGroup;

  constructor(
    private api: ServiceHospitalService,
    private toastrService: ToastrService
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
    if (this.item && this.item.id) {
      console.log('this.item', this.item);
      if (this.item.time_advise) {
        this.item.hour = Math.floor(this.item.time_advise / 60);
        this.item.minute = this.item.time_advise % 60;
      }
      this.form.patchValue(this.item);
    }
  }

  ngOnInit(): void {}

  save(): void {
    console.log(this.form.value);
    if (this.form.valid) {
      const obj = {
        id_department: this.form.value.id_department,
        name: this.form.value.name,
        price: this.form.value.price,
        time_advise: this.form.value.hour * 60 + this.form.value.minute,
      };
      this.api.update(this.item.id, obj).subscribe({
        next: (res) => {
          this.form.reset();
          this.toastrService.success('Sửa thành công!');
          this.closeModal.nativeElement.click();
          this.reloadData.emit();
        },
        error: (err) => {
          this.toastrService.error('Sửa thất bại!');
        },
      });
    } else {
      this.toastrService.error('Vui lòng nhập đầy đủ thông tin');
    }
  }
}
