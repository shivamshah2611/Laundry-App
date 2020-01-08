import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, Params } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Address } from 'src/app/models/address.model';
import { AddressService } from './../../services/address.service';
import { NgForm } from '@angular/forms';
import { LoadingService } from './../../services/loading.service';

@Component({
  selector: 'app-edit-address',
  templateUrl: './edit-address.page.html',
  styleUrls: ['./edit-address.page.scss'],
})
export class EditAddressPage implements OnInit {

  address: Address;

  @ViewChild('updateAddrForm') updateAddr: NgForm;

  constructor(private router: Router, private route: ActivatedRoute, private addressService: AddressService,
              private loading: LoadingService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.address = this.addressService.getAddress(params['id']);
      console.log(this.address);
    });
  }

  onSaveChanges() {
    this.loading.presentLoading();

    this.addressService.updateAddress
    (this.address.id, this.updateAddr.value.nickname, this.updateAddr.value.addLine,
    this.updateAddr.value.district, this.updateAddr.value.state)
    .then(
    res => {
      this.loading.dismiss();
      this.loading.presentToast("Update Success!");
      this.router.navigate(['/members/address-book']);
    },
    err => {
      this.loading.presentToast("Error Updating!");
      this.router.navigate(['/members/address-book']);
    });
  }


  
}
