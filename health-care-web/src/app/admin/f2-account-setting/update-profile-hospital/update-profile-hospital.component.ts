import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../_services/admin.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-profile-hospital',
  templateUrl: './update-profile-hospital.component.html',
  styleUrls: ['./update-profile-hospital.component.scss'],
})
export class UpdateProfileHospitalComponent implements OnInit {
  form: any = {};
  hospital: any = {};
  isErrorGetProfile = false;
  isErrorUpdate = false;
  isSaving = false;
  isChangeFileAvatar = false;
  isChangeFileCover = false;

  srcAvatar: any = '';
  srcConver: any = '';

  provinces: any = [];

  constructor(
    private adminService: AdminService,
    private toastrService: ToastrService,
    private tokenService: TokenStorageService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    const role = this.tokenService.getRole();
    if (['manager', 'supperadmin', 'admin'].includes(role)) {
      this.router.navigateByUrl('/account-setting/update-info/admin');
    }
    if (role === 'doctor') {
      this.router.navigateByUrl('/account-setting/update-info/doctor');
    }
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      location: new FormControl('99, 29', []),
      province_code: new FormControl(null, [Validators.required]),
      avatar: new FormControl(null, []),
      cover_hospital: new FormControl(null, []),
      infrastructure: new FormControl('', []),
    });
    this.adminService.getProfile().subscribe({
      next: ({ data }) => {
        this.hospital = data;
        this.srcAvatar = this.hospital?.avatar;
        this.srcConver = this.hospital?.cover_hospital;
        this.patchValue();
      },
      error: (err) => {
        this.isErrorGetProfile = true;
        this.toastrService.error('Lỗi tải thông tin');
      },
    });

    this.provinces = JSON.parse(localStorage.getItem('provinces') || '[]');
  }

  save() {
    if (this.form.valid && !this.isSaving) {
      const obj = Object.assign({}, this.form.value);
      console.log(obj);
      if (!this.isChangeFileAvatar) {
        delete obj.avatar;
      }
      if (!this.isChangeFileCover) {
        delete obj.cover_hospital;
      }
      if (typeof obj.infrastructure === 'string') {
        obj.infrastructure = obj.infrastructure.split(',');
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

  changeConver(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.isChangeFileCover = true;
      this.form.patchValue({ cover_hospital: file });
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcConver = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  patchValue() {
    this.form.patchValue(this.hospital);
  }
}
