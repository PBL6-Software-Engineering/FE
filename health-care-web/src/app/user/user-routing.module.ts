import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { F1HomePageComponent } from './features/f1-home-page/f1-home-page.component';
import { F3ArticleDetailComponent } from './features/f3-article-detail/f3-article-detail.component';
import { F5DepartmentsComponent } from './features/f5-departments/f5-departments.component';
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
        path: 'article/:id',
        component: F3ArticleDetailComponent,
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./features/f6-category/f6-category.module').then(
            (m) => m.F6CategoryModule
          ),
      },
      {
        path: 'departments',
        component: F5DepartmentsComponent,
      },
      {
        path: 'expert',
        loadChildren: () =>
          import('./features/f7-expert/f7-expert.module').then(
            (m) => m.F7ExpertModule
          ),
      },
      {
        path: 'user',
        loadChildren: () =>
          import('./features/f2-user/f2-user.module').then(
            (m) => m.F2UserModule
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
