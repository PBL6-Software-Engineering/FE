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
import { DepartmentService } from 'src/app/admin/_services/department.service';

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.scss'],
})
export class DepartmentCreateComponent implements OnInit {
  form: FormGroup;
  srcThumbnail = '';
  isSaving = false;

  @Output() reloadData = new EventEmitter();
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private api: DepartmentService,
    private toastrService: ToastrService,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      thumbnail: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onChangeFile(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.form.patchValue({ thumbnail: file });
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcThumbnail = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  cleanForm() {
    if (this.form.get('name')) {
      this.form.get('name')?.setValue(this.form.get('name')?.value.trim());
    }

    if (this.form.get('description')) {
      this.form
        .get('description')
        ?.setValue(this.form.get('description')?.value.trim());
    }
  }

  save(): void {
    this.cleanForm();
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
          console.log('err', err);
          const msg =
            err.error && err.error.data && err.error.data.length
              ? err.error.data[0]
              : err.message || 'Thêm thất bại!';
          this.toastrService.error(msg);
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
    this.srcThumbnail = 'assets/media/image/image.png';
    this.inputFile.nativeElement.value = '';
  }
}
