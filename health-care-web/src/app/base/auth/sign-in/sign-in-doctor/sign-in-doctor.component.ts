import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in-doctor',
  templateUrl: './sign-in-doctor.component.html',
  styleUrls: ['./sign-in-doctor.component.scss']
})
export class SignInDoctorComponent {
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
}
