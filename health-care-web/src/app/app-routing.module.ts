import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanLoadAdminGuard } from './core/guards/can-load-admin-guard';
import { ProvinceResolve } from './user/resolver/province.resolve';
import { QuicklinkModule, QuicklinkStrategy } from 'ngx-quicklink';
import { CommonDataResolve } from './user/resolver/common_data.resolve';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./base/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'admin',
    canLoad: [CanLoadAdminGuard],
    resolve: {
      province: ProvinceResolve,
    },
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: '',
    resolve: {
      commonData: CommonDataResolve,
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
