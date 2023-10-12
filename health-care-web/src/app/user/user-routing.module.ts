import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { F1HomePageComponent } from './features/f1-home-page/f1-home-page.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        component: F1HomePageComponent
      },
      {
        path: 'user',
        loadChildren: () => import('./features/f2-user/f2-user.module').then(m => m.F2UserModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
