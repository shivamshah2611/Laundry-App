import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { SelectAddressPage } from './select-address.page';

import { AddressModule } from './../address-book/address-list/address/address.module';

const routes: Routes = [
  {
    path: '',
    component: SelectAddressPage
  }
];

@NgModule({
  imports: [
    AddressModule,
  CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [SelectAddressPage]
})
export class SelectAddressPageModule {}
