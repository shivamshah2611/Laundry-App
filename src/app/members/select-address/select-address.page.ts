import { Component, OnInit, ViewChild } from '@angular/core';
import { Address } from 'src/app/models/address.model';
import { LoadingService } from 'src/app/services/loading.service';
import { AddressService } from './../../services/address.service';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { OrdersService } from './../../services/orders.service';
import { query } from '@angular/core/src/render3';

@Component({
  selector: 'app-select-address',
  templateUrl: './select-address.page.html',
  styleUrls: ['./select-address.page.scss']
})
export class SelectAddressPage implements OnInit {
  addresses: Address[];

  addressSub;

  @ViewChild('selectAddressForm') selAddForm: NgForm;

  constructor(
    private loading: LoadingService,
    private addressService: AddressService,
    private router: Router,
    private navController: NavController,
    private orderService: OrdersService
  ) {}

  ngOnInit() {
    this.loading.presentLoading();
    this.addressService.fetchAddresses().then(addresses => {
      this.loading.dismiss();
      this.addresses = addresses;
    });

    this.addressSub = this.addressService._addresses.subscribe(() => {
      this.loading.presentLoading();
      this.addressService.fetchAddresses().then(addresses => {
        this.loading.dismiss();
        this.addresses = addresses;
      });
    });

    console.log(this.addresses);
  }

  ngOnDestroy() {
    this.addressSub.unsubscribe();
  }

  addAddressClick() {
    this.router.navigate(['/members/add-address'], {
      queryParams: { from: 'select-address' }
    });
  }

  onSelectAddress() {
    let selectedAddress = this.addressService.getAddress(
      this.selAddForm.value.radio
    );

    this.orderService.newOrder.address =
      selectedAddress.add_line +
      ', ' +
      selectedAddress.district +
      ', ' +
      selectedAddress.state +
      ', ' +
      selectedAddress.country +
      '.';
    this.orderService.newOrder.pincode = selectedAddress.pincode;
    this.router.navigate(['/members/confirm-order']);
  }

  manageAddress() {
    this.navController.navigateRoot(['/members/address-book'], {
      animated: true,
      animationDirection: 'forward'
    });
  }
}
