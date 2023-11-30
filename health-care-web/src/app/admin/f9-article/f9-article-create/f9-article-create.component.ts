import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../_services/category.service';
import { ArticleService } from '../../_services/article.service';

@Component({
  selector: 'app-f9-article-create',
  templateUrl: './f9-article-create.component.html',
  styleUrls: ['./f9-article-create.component.scss'],
})
export class F9ArticleCreateComponent implements OnInit {
  @ViewChild('inputFile') inputFile!: ElementRef;
  form: FormGroup;
  srcThumbnail: any;
  isSaving = false;
  categories: any[] = [];

  constructor(
    private api: ArticleService,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private router: Router,
  ) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      thumbnail: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      id_category: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.categoryService.paginate({}).subscribe(({ data }) => {
      this.categories = data;
    });
  }

  save(): void {
    if (this.form.valid && !this.isSaving) {
      this.isSaving = true;
      this.api.create(this.form.value).subscribe({
        next: (res) => {
          this.toastrService.success('Thêm thành công!');
          this.router.navigateByUrl('/admin/article');
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
    this.srcThumbnail = 'assets/media/image/image.png';
  }

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

  onErrorImage(event: any): void {
    event.target.src = 'assets/media/image/image.png';
  }
}
