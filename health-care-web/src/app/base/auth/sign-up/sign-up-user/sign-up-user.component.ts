import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.scss']
})
export class SignUpUserComponent {
  loginForm: FormGroup;
  isShowEmail= false;
  isShowPass =false;
  isShowConfirm = false;
  constructor(private apiService: AuthService,private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,Validators.minLength(6)]],
      confirm: ['', [Validators.required,Validators.minLength(6)]],
    });
   }
  onFucusEmail(){
    this.isShowEmail=true;
  }
  onFocusPass(){
    this.isShowPass=true;
  }
  onFocusConfirm(){
    this.isShowConfirm=true;
  }

  get emailControl() {
    return this.loginForm.get('email');
  }

  get passControl() {
    return this.loginForm.get('password');
  }

  get confirmControl() {
    return this.loginForm.get('confirm');
  }

  hideShowPass(){
    let passFields = document.getElementsByClassName("passwordInp");
    if (passFields!= null){
      for(let i = 0 ; i < passFields.length ; i++){
        if(passFields[i].getAttribute("type") =="text"){
          passFields[i].setAttribute("type","password");
        }
        else {
          passFields[i].setAttribute("type","text");
        }
   
      }
          }
  }
}
