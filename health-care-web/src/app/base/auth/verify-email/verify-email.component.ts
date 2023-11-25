import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  email: string = '';
  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  goToSignIn() {
    this.router.navigate(['auth/sign-in']);
  }

  ngOnInit() {
    this.email = this.route.snapshot.paramMap.get('email') || '';
    if (this.email == '') {
      this.router.navigate(['/auth/sign-in/forgot-password']);
    }
  }
}
