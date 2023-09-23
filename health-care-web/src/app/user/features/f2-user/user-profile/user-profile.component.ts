import { Component } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {
  user = {
    username: 'nguyentoan10239-aQW',
    name: 'Toàn Nguyễn',
    email: 'nguyentoan102002@gmail.com',
    date_of_birth: '09-09-2021',
    gender: 'Nam',
    province: 'Đà Nẵng',
    phone: '+84967492536'
  }

  constructor() {

  }
  changeAvatar(): void {

  }
}
