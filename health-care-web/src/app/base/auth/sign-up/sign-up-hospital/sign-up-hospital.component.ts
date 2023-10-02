import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-up-hospital',
  templateUrl: './sign-up-hospital.component.html',
  styleUrls: ['./sign-up-hospital.component.scss']
})
export class SignUpHospitalComponent {
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
