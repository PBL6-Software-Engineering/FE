import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up.component';
import { SignUpHospitalComponent } from './sign-up-hospital/sign-up-hospital.component';
import { SignUpUserComponent } from './sign-up-user/sign-up-user.component';

const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
    children: [
      {
        path: 'hospital',
        component: SignUpHospitalComponent,
      },
      {
        path: '',
        pathMatch: 'full',
        component: SignUpUserComponent,
      },
      {
        path: '**',
        pathMatch: 'full',
        component: SignUpUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SignUpRoutingModule {}
