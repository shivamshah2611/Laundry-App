import { Component, OnInit, OnDestroy } from "@angular/core";
import { Address } from "../../../models/address.model";
import { AddressService } from "./../../../services/address.service";
import { LoadingService } from "src/app/services/loading.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-address-list",
  templateUrl: "./address-list.component.html",
  styleUrls: ["./address-list.component.scss"]
})
export class AddressListComponent implements OnInit, OnDestroy {
  addresses: Address[];

  addressSub;

  constructor(
    private addressService: AddressService,
    private loading: LoadingService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading.presentLoading();
    this.addressService.fetchAddresses().then(
      addresses => {
        this.loading.dismiss();
        this.addresses = addresses;
      },
      err => {
        this.loading.dismiss();
        this.loading.presentToast("Error fetching addresses.");
      }
    );

    this.addressSub = this.addressService._addresses.subscribe(() => {
      this.addressService.fetchAddresses().then(addresses => {
        this.addresses = addresses;
      });
    });

    console.log(this.addresses);
  }

  ngOnDestroy() {
    this.addressSub.unsubscribe();
  }

  addAddressClick() {
    this.router.navigate(["members/add-address"]);
  }
}
