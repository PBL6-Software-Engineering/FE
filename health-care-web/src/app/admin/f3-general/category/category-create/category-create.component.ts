import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/admin/_services/category.service';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss'],
})
export class CategoryCreateComponent implements OnInit {
  form: FormGroup;

  constructor(
    private api: CategoryService,
    private toastrService: ToastrService,
    private router: Router,
    private el: ElementRef
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
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
        this.el.nativeElement.querySelector('.upload-image').src =
          e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  save(): void {
    if (this.form.valid) {
      this.api.create(this.form.value).subscribe((res) => {
        this.toastrService.success('Thêm danh mục thành công!');
        this.router.navigate(['/admin/general/category']);
      });
    } else {
      this.toastrService.error('Vui lòng nhập đầy đủ thông tin');
    }
  }
}
