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
        component: F1HomePageComponent,
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./features/f2-user/f2-user.module').then(
            (m) => m.F2UserModule
          ),
      },
      {
        path: 'bai-viet',
        loadChildren: () => {
          return import('./features/f3-article/f3-article.module').then(
            (m) => m.F3ArticleModule
          );
        },
      },
      {
        path: 'benh-vien',
        loadChildren: () =>
          import('./features/f4-hospital/f4-hospital.module').then(
            (m) => m.F4HospitalModule
          ),
      },
      {
        path: 'chuyen-khoa',
        loadChildren: () =>
          import('./features/f5-department/f5-department.module').then(
            (m) => m.F5DepartmentModule
          ),
      },
      {
        path: 'danh-muc',
        loadChildren: () =>
          import('./features/f6-category/f6-category.module').then(
            (m) => m.F6CategoryModule
          ),
      },
      {
        path: 'chuyen-gia',
        loadChildren: () =>
          import('./features/f7-expert/f7-expert.module').then(
            (m) => m.F7ExpertModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
