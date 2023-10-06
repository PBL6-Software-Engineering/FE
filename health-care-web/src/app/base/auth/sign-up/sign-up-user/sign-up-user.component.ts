import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.scss']
})
export class SignUpUserComponent {
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
