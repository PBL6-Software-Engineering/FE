import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
// import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
// import { VerifyEmailComponent } from './verify-email/verify-email.component';
const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      // {
      //   path: 'forgot-password',
      //   component: ForgotPasswordComponent
      // },
      {
        path: 'sign-in',
        loadChildren: () => import('./sign-in/sign-in.module').then(m => m.SignInModule)
      },
      {
        path: 'sign-up',
        loadChildren: () => import('./sign-up/sign-up.module').then(m => m.SignUpModule)
      },
      {
        path: '**',
        redirectTo: 'sign-in',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
