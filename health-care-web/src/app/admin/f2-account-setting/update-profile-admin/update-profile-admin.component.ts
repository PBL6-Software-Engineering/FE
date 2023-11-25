import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import flatpickr from 'flatpickr';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile-admin',
  templateUrl: './update-profile-admin.component.html',
  styleUrls: ['./update-profile-admin.component.scss'],
})
export class UpdateProfileAdminComponent implements OnInit {
  form: any = {};
  doctor: any = {};

  isErrorGetProfile = false;
  isErrorUpdate = false;
  isSaving = false;
  isChangeFileAvatar = false;

  srcAvatar: any = '';
  provinces: any = [];
  dateRangeFlatPickr: any;

  constructor(
    private adminService: AdminService,
    private toastrService: ToastrService,
    private tokenService: TokenStorageService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    const role = this.tokenService.getRole();
    if (role === 'hospital' || role === 'doctor') {
      this.router.navigateByUrl('/account-setting/update-info/' + role);
    }
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      date_of_birth: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      avatar: new FormControl(null, []),
    });
    this.adminService.getProfile().subscribe({
      next: ({ data }) => {
        this.doctor = data;
        this.srcAvatar = this.doctor?.avatar;
        this.patchValue();
      },
      error: (err) => {
        this.isErrorGetProfile = true;
        this.toastrService.error('Lỗi tải thông tin');
      },
    });

    this.provinces = JSON.parse(localStorage.getItem('provinces') || '[]');

    this.dateRangeFlatPickr = flatpickr('#dateOfBirthPicker', {
      allowInput: true,
      dateFormat: 'Y-m-d',
      minDate: new Date('01/01/1900'),
      maxDate: new Date(),
    });
  }

  save() {
    if (this.form.valid && !this.isSaving) {
      const obj = Object.assign({}, this.form.value);
      if (!this.isChangeFileAvatar) {
        delete obj.avatar;
      }
      this.isSaving = true;
      this.adminService.updateProfile(obj).subscribe({
        next: ({ data }) => {
          console.log(data);
          this.isSaving = false;
          this.toastrService.success('Cập nhật thông tin thành công');
        },
        error: (err) => {
          this.isSaving = false;
          this.isErrorUpdate = true;
          this.toastrService.error('Cập nhật thông tin thất bại');
        },
      });
    } else {
      this.toastrService.warning('Vui lòng điền đầy đủ thông tin');
    }
  }

  changeAvatar(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.isChangeFileAvatar = true;
      this.form.patchValue({ avatar: file });
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcAvatar = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  patchValue() {
    this.form.patchValue(this.doctor);
  }
}
