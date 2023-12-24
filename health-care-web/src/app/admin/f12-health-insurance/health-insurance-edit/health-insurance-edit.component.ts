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
import { HealthInsuranceService } from '../../_services/health_insurance.service';
@Component({
  selector: 'app-health-insurance-edit',
  templateUrl: './health-insurance-edit.component.html',
  styleUrls: ['./health-insurance-edit.component.css'],
})
export class HealthInsuranceEditComponent implements OnInit, OnChanges{
  form: FormGroup;
  isSaving = false;

  @Input() item: any;
  @Output() reloadData = new EventEmitter();
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(
    private api: HealthInsuranceService,
    private toastrService: ToastrService,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl(null, [Validators.required]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.item && this.item.id) {
      this.form.patchValue(this.item);
    }
  }

  ngOnInit(): void {}

  save(): void {
    if (this.form.valid && !this.isSaving) {
      this.isSaving = true;
      this.api
        .update(this.item.id, this.form.value)
        .subscribe({
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

  onErrorImage(event: any): void {
    event.target.src = 'assets/media/image/image.png';
  }

  resetForm(): void {
    this.form.reset();
  }
}
