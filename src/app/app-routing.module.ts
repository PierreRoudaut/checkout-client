import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopPageComponent } from './shop/shop-page/shop-page.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';

const routes: Routes = [
  {
    path: 'shop',
    component: ShopPageComponent,
    data: {
      title: 'Shop',
      icon: 'cart'
    }
  },
  {
    path: 'admin',
    component: AdminPageComponent,
    data: {
      title: 'Admin',
      icon: 'user'
    }
  },
  {
    path: '**',
    redirectTo: '/shop',
  },
  {
    path: '',
    redirectTo: '/shop',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
