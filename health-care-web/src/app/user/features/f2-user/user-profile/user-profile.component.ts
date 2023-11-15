import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService,
    private toastrService: ToastrService
  ) {
    this.tokenStorageService.getUser().subscribe((user: any) => {
      this.user = JSON.parse(user);
    });
  }
  ngOnInit(): void {
    this.tokenStorageService.getUser().subscribe((user: any) => {
      this.user = JSON.parse(user);
    });
    this.dateRangeFlatPickr = flatpickr('#dateOfBirthPicker', {
      allowInput: true,
      dateFormat: 'd-m-Y',
      minDate: new Date('01/01/1900'),
      maxDate: new Date(),
    });
    this.form = new FormGroup({
      date_of_birth: new FormControl(''),
      gender: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      name: new FormControl(''),
      username: new FormControl(''),
    });
    this.form.patchValue(this.user);
  }

  changeAvatar() {}

  saveInfo() {
    if (this.form.valid) {
      this.userService.updateProfile(this.form.value).subscribe((res) => {
        this.toastrService.success('Cập nhật thông tin thành công');
      });
    }
  }

  resetForm() {
    this.form.patchValue(this.user);
  }
}
