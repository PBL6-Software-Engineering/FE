import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../_services/category.service';
import { AdminService } from '../../_services/admin.service';

@Component({
  selector: 'app-f4-create-admin',
  templateUrl: './f4-create-admin.component.html',
  styleUrls: ['./f4-create-admin.component.css'],
})
export class F4CreateAdminComponent implements OnInit {
  form: FormGroup;
  srcThumbnail = '';
  isSaving = false;
  @Output() reloadData = new EventEmitter();
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(
    private api: AdminService,
    private toastrService: ToastrService,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  ngOnInit(): void {}

  save(): void {
    if (this.form.valid && !this.isSaving) {
      this.isSaving = true;
      this.api.addAdmin(this.form.value).subscribe({
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
