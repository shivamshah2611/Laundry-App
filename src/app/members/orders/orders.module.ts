import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { IonicModule } from '@ionic/angular';

import { OrdersPage } from './orders.page';
import { OrderComponent } from './orderlist/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersPage
  }
];

@NgModule({
  imports: [
  CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [OrdersPage,
    OrderlistComponent,
  OrderComponent]
})
export class OrdersPageModule {}
