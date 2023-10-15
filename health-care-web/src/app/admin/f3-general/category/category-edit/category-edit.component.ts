import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/admin/_services/category.service';

@Component({
  selector: 'app-category-edit',
  templateUrl: './category-edit.component.html',
  styleUrls: ['./category-edit.component.scss'],
})
export class CategoryEditComponent implements OnInit, OnChanges {
  form: FormGroup;
  @Input() item: any;

  constructor(
    private api: CategoryService,
    private toastrService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      thumbnail: new FormControl(null, [Validators.required]),
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.item && this.item.id) {
      this.form.patchValue(this.item);
    }
  }

  ngOnInit(): void {
    // this.route.params.subscribe((params) => {
    //   if (params && params['id']) {
    //     this.api.findById(params['id']).subscribe(({ data }) => {
    //       if (data) {
    //         this.form.patchValue(data);
    //       }
    //     });
    //   }
    // });
  }

  onChangeFile(event: any): void {
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
    // if (this.form.valid) {
    //   this.api.create(this.form.value).subscribe((res) => {
    //     this.toastrService.success('Sửa danh mục thành công!');
    //     this.router.navigate(['/admin/general/category']);
    //   });
    // } else {
    //   this.toastrService.error('Vui lòng nhập đầy đủ thông tin');
    // }
  }
}
