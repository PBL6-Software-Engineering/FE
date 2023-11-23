import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import flatpickr from 'flatpickr';
import { TokenStorageService } from 'src/app/base/auth/services/token_storage.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any;
  dateRangeFlatPickr: any;
  form: FormGroup;

  srcThumbnail: '';
  isSaving = false;

  @ViewChild('closeModal') closeModal!: ElementRef;
  @ViewChild('avatar') avatar!: ElementRef;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {}
  ngOnInit(): void {
    this.tokenStorageService.getUser().subscribe((user: any) => {
      this.user = user;
    });
    this.dateRangeFlatPickr = flatpickr('#dateOfBirthPicker', {
      allowInput: true,
      dateFormat: 'Y-m-d',
      minDate: new Date('01/01/1900'),
      maxDate: new Date(),
    });
    this.form = new FormGroup({
      date_of_birth: new FormControl(''),
      gender: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      username: new FormControl(''),
      avatar: new FormControl(null),
    });
    this.form.patchValue(this.user);
  }

  changeAvatar(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.form.patchValue({ avatar: file });
      this.saveInfo();
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.srcThumbnail = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveInfo() {
    if (this.form.valid && !this.isSaving) {
      this.isSaving = true;
      this.userService.updateProfile(this.form.value).subscribe({
        next: ({ data }) => {
          this.tokenStorageService.saveUser(data);
          this.toastrService.success('Cập nhật thông tin thành công');
          this.closeModal.nativeElement.click();
          this.isSaving = false;
        },
        error: (err) => {
          this.toastrService.error('Cập nhật thông tin thất bại');
          this.isSaving = false;
        },
      });
    }
  }

  resetForm() {
    this.form.patchValue(this.user);
  }
}
