import { Component, ElementRef, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordAdminComponent {
  email: string = '';
  forgotPassForm: FormGroup;
  message: string = '';
  isShowEmail = false;
  constructor(
    private router: Router,
    private AuthService: AuthService,
    private el: ElementRef,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
  ) {
    this.forgotPassForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get emailControl() {
    return this.forgotPassForm.get('email');
  }

  showNotification(message: string) {
    this.message = message;
    const notification = this.el.nativeElement.querySelector('#notification');
    this.renderer.setStyle(notification, 'display', 'block');

    setTimeout(() => {
      this.renderer.setStyle(notification, 'opacity', '0');
    }, 2000);

    setTimeout(() => {
      this.renderer.setStyle(notification, 'display', 'none');
      this.renderer.setStyle(notification, 'opacity', '1');
    }, 4000);
  }

  onEmailSubmit() {
    if (this.forgotPassForm.valid) {
      var loading = this.el.nativeElement.querySelector('#loading');
      this.renderer.removeClass(loading, 'd-none');
      var inpEmail = this.el.nativeElement.querySelector('#inp-email');
      this.AuthService.forgotPassAdmin(inpEmail.value).subscribe(
        (response) => {
          this.email = inpEmail.value;
          this.router.navigate([
            '/auth/sign-in/verify-email-admin',
            { email: this.email },
          ]);
        },
        (error) => {
          this.renderer.addClass(loading, 'd-none');
          this.showNotification(error.error.message);
        },
      );
    } else {
      this.isShowEmail = true;
    }
  }
}
