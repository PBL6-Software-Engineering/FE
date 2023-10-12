import { Component,OnInit  } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-sign-in-user',
  templateUrl: './sign-in-user.component.html',
  styleUrls: ['./sign-in-user.component.scss']
})
export class SignInUserComponent implements OnInit{
  username: string = '';
  password: string = '';
  responseData: any;
  constructor(private apiService: AuthService) { }

  login() {
    console.log(this.username);
    console.log(this.password);
    this.apiService.login(this.username,this.password).subscribe((response) => {
          console.log('Đăng nhập thành công. Token truy cập:', response.token);
        },
        (error) => {
          console.error('Đăng nhập thất bại:', error);
          // Xử lý lỗi đăng nhập ở đây
        }
      );
    }
  
  hideShowPass(){
    let passField = document.getElementById("password");
    let toggleButton = document.getElementById("toggleButton");
    if(toggleButton?.getAttribute("src")=="assets/media/icon/eye-off.svg")
      toggleButton?.setAttribute("src","assets/media/icon/eye-solid.svg");
    else {
      toggleButton?.setAttribute("src","assets/media/icon/eye-off.svg");
    }
    if (passField != null){
      if(passField.getAttribute("type") =="text"){
        passField.setAttribute("type","password");
      }
      else {
        passField.setAttribute("type","text");
      }
    }
  }

  ngOnInit() {
    // Gọi getData() trong hàm ngOnInit() nếu bạn muốn lấy dữ liệu ngay khi component được khởi tạo.
  }

}
