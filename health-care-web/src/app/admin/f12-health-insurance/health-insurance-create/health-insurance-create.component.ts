import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HealthInsuranceService } from '../../_services/health_insurance.service';

@Component({
  selector: 'app-health-insurance-create',
  templateUrl: './health-insurance-create.component.html',
  styleUrls: ['./health-insurance-create.component.css'],
})
export class HealthInsuranceCreateComponent implements OnInit {
  form: FormGroup;
  isSaving = false;
  @Output() reloadData = new EventEmitter();
  @ViewChild('closeModal') closeModal!: ElementRef;
  // @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private api: HealthInsuranceService,
    private toastrService: ToastrService,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  save(): void {
    if (this.form.valid && !this.isSaving) {
      this.isSaving = true;
      this.api.create(this.form.value).subscribe({
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

  onErrorImage(event: any): void {
    event.target.src = 'assets/media/image/image.png';
  }

  resetForm(): void {
    this.form.reset();
  }
}
