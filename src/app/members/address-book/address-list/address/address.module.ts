import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { AddressComponent } from './address.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    AddressComponent  ],
  imports: [
    IonicModule,
    CommonModule
  ],
  exports: [
    AddressComponent
  ]
})
export class AddressModule {}