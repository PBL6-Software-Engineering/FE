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
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../_services/category.service';
import { AdminService } from '../../_services/admin.service';

@Component({
  selector: 'app-f4-edit-admin',
  templateUrl: './f4-edit-admin.component.html',
  styleUrls: ['./f4-edit-admin.component.css'],
})
export class F4EditAdminComponent implements OnInit, OnChanges {
  form: FormGroup;
  isSaving = false;

  roles = ['admin', 'superadmin'];

  @Input() item: any;
  @Output() reloadData = new EventEmitter();
  @ViewChild('closeModal') closeModal!: ElementRef;

  constructor(
    private api: AdminService,
    private toastrService: ToastrService,
  ) {
    this.form = new FormGroup({
      role: new FormControl('', [Validators.required]),
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
      this.api.editRoleAdmin(this.item.id, this.form.value).subscribe({
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

  resetForm(): void {
    this.form.reset();
  }
}
