import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  @Output() reloadData = new EventEmitter();
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private api: DepartmentService,
    private toastrService: ToastrService,
    private router: Router,
    private el: ElementRef
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

  save(): void {
    if (this.form.valid) {
      this.api.create(this.form.value).subscribe({
        next: (res) => {
          this.toastrService.success('Thêm thành công!');
          this.closeModal.nativeElement.click();
          this.reloadData.emit();
          this.resetForm();
        },
        error: (err) => {
          this.toastrService.error('Thêm thất bại!');
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
