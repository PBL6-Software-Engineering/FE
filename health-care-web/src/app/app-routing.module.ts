import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadAdminGuard } from './core/guards/can-load-admin-guard';
import { CategoryResolve } from './user/resolver/category.resolve';
import { DepartmentResolve } from './user/resolver/department.resolve';
import { ArticleOutstandingResolve } from './user/resolver/article_outstanding.resolve';
import { ProvinceResolve } from './user/resolver/province.resolve';
import { ThreeHospitalOutstandingResolve } from './user/resolver/hospital_outstanding.resolve';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./base/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canLoad: [],
    resolve: {
      // province: ProvinceResolve,
    },
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    resolve: {
      category: CategoryResolve,
      department: DepartmentResolve,
      articleOutstanding: ArticleOutstandingResolve,
      province: ProvinceResolve,
      hospitalOutStanding: ThreeHospitalOutstandingResolve,
    },
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
    data: {
      shouldPreload: true,
    },
  },
  {
    path: '**',
    loadChildren: () =>
      import('./base/error/error.module').then((m) => m.ErrorModule),
  },
];

@NgModule({
  imports: [
    QuicklinkModule,
    RouterModule.forRoot(routes, {
      preloadingStrategy: QuicklinkStrategy,
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
