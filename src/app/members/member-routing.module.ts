import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomePageModule' },
  { path: 'profile', loadChildren: './profile/profile.module#ProfilePageModule' },
  { path: 'about-us', loadChildren: './about-us/about-us.module#AboutUsPageModule' },
  { path: 'orders', loadChildren: './orders/orders.module#OrdersPageModule' },
  { path: 'address-book', loadChildren: './address-book/address-book.module#AddressBookPageModule' },
  { path: 'add-address', loadChildren: './add-address/add-address.module#AddAddressPageModule' },
  { path: '', redirectTo: 'home', pathMatch: 'full'},
  { path: 'select-address', loadChildren: './select-address/select-address.module#SelectAddressPageModule' },
  { path: 'edit-address/:id', loadChildren: './edit-address/edit-address.module#EditAddressPageModule' },
  { path: 'confirm-order', loadChildren: './confirm-order/confirm-order.module#ConfirmOrderPageModule' },
  { path: 'order-detail', loadChildren: './order-detail/order-detail.module#OrderDetailPageModule' }
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MemberRoutingModule { }
