import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from '../../_services/category.service';
import { ArticleService } from '../../_services/article.service';

@Component({
  selector: 'app-f11-article-edit',
  templateUrl: './f11-article-edit.component.html',
  styleUrls: ['./f11-article-edit.component.scss'],
})
export class F11ArticleEditComponent implements OnInit {
  @ViewChild('inputFile') inputFile!: ElementRef;
  form: FormGroup;
  srcThumbnail: any;
  id: any;
  categories: any[] = [];
  isChangeFile = false;

  constructor(
    private api: ArticleService,
    private categoryService: CategoryService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      thumbnail: new FormControl(null, [Validators.required]),
      content: new FormControl(null, [Validators.required]),
      id_category: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(({ data }) => {
      this.categories = data;
    });
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.id = params['id'];
        this.api.findById(params['id']).subscribe(({ data }) => {
          this.form.patchValue({ thumbnail: data.thumbnail_article });
          this.form.patchValue({ title: data.title });
          this.form.patchValue({ content: data.content });
          this.form.patchValue({ id_category: data.id_category });
          this.srcThumbnail = data.thumbnail_article;
        });
      }
    });
  }

  save(): void {
    if (this.form.valid) {
      this.api.update(this.id, this.form.value, this.isChangeFile).subscribe({
        next: (res) => {
          this.toastrService.success('Sửa thành công!');
          this.router.navigateByUrl('/admin/article');
        },
        error: (err) => {
          this.toastrService.error('Sửa thất bại!');
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
      this.isChangeFile = true;
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
