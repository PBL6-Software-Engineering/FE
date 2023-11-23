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
import { CategoryService } from 'src/app/admin/_services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit, OnChanges {
  form: FormGroup;
  srcThumbnail: string = '';
  isChangeFile = false;
  isSaving = false;

  @Input() item: any;
  @Output() reloadData = new EventEmitter();
  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private api: CategoryService,
    private toastrService: ToastrService
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      description_category: new FormControl('', []),
      thumbnail: new FormControl(null, [Validators.required]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.item && this.item.id) {
      this.form.patchValue(this.item);
      this.srcThumbnail = this.item.thumbnail;
    }
  }

  ngOnInit(): void {}

  onChangeFile(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.form.patchValue({ thumbnail: file });
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcThumbnail = e.target.result;
        this.isChangeFile = true;
      };
      reader.readAsDataURL(file);
    }
  }

  save(): void {
    if (this.form.valid && !this.isSaving) {
      this.isSaving = true;
      this.api
        .update(this.item.id, this.form.value, this.isChangeFile)
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
    this.srcThumbnail = 'assets/media/image/image.png';
    this.inputFile.nativeElement.value = '';
  }
}
