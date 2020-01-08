import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddressBookPage } from './address-book.page';
import { AddressListComponent } from './address-list/address-list.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { AddressModule } from './address-list/address/address.module';


const routes: Routes = [
  {path: '', component: AddressBookPage,
    children:
    [
      {path: '', component: AddressListComponent}
    ]
  }
];

@NgModule({
  imports: [
 

  CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    NgScrollbarModule,
    AddressModule
  ],
  declarations: [
    AddressBookPage,
    AddressListComponent]
})
export class AddressBookPageModule {}
