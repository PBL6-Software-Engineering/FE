import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  email :string ='';
  constructor(private router: Router) {}

  onEmailSubmit() {
    this.router.navigate(['/auth/sign-in/verify-email',{ email: this.email }]);
  }
}
