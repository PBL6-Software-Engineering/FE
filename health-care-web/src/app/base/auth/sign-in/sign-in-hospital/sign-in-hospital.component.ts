import { Component } from '@angular/core';

@Component({
  selector: 'app-sign-in-hospital',
  templateUrl: './sign-in-hospital.component.html',
  styleUrls: ['./sign-in-hospital.component.scss']
})
export class SignInHospitalComponent {
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
