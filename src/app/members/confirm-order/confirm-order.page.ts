import { Component, OnInit } from "@angular/core";
import { OrdersService } from "./../../services/orders.service";
import { LoadingService } from "src/app/services/loading.service";
import { Address } from "src/app/models/address.model";
import { AddressService } from "./../../services/address.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-confirm-order",
  templateUrl: "./confirm-order.page.html",
  styleUrls: ["./confirm-order.page.scss"]
})
export class ConfirmOrderPage implements OnInit {
  newOrder;
  address: Address;
  constructor(
    private orderService: OrdersService,
    private loading: LoadingService,
    private addressService: AddressService,
    private router: Router
  ) {}

  ngOnInit() {
    this.newOrder = this.orderService.newOrder;
  }

  confirmOrder() {
    this.loading.presentLoading();
    this.orderService.addNewOrder().then(
      () => {
        this.loading.dismiss();
        this.loading.presentToast("Order Placed Successfully.");
        this.router.navigate(['/members/orders']);
      },
      err => {
        this.loading.dismiss();
        this.loading.presentToast("Error placing order.");
        this.router.navigate(['/members/home']);
      }
    );
  }
}
