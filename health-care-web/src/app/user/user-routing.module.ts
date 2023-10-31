import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { F1HomePageComponent } from './features/f1-home-page/f1-home-page.component';
import { F3ArticleDetailComponent } from './features/f3-article-detail/f3-article-detail.component';
import { F4CategoriesComponent } from './features/f4-categories/f4-categories.component';
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
        path: 'articleDetail',
        component: F3ArticleDetailComponent,
      },
      {
        path: 'categories',
        component: F4CategoriesComponent,
      },
      {
        path: 'departments',
        component: F5DepartmentsComponent,
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
