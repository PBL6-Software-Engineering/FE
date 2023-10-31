import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadAdminGuard } from './core/guards/can-load-admin-guard';
import { CategoryResolve } from './user/resolver/category.resolve';
import { DepartmentResolve } from './user/resolver/department.resolve';
import { ArticleOutstandingResolve } from './user/resolver/article_outstanding.resolve';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./base/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canLoad: [CanLoadAdminGuard],
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    resolve: {
      category: CategoryResolve,
      department: DepartmentResolve,
      articleOutstanding: ArticleOutstandingResolve,
    },
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./base/error/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
