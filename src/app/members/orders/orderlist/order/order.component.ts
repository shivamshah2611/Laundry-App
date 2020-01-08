import { Component, OnInit, Input } from "@angular/core";
import { AddressService } from "./../../../../services/address.service";
import { LoadingService } from "src/app/services/loading.service";
import { Order } from 'src/app/models/order.model';

@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.scss"]
})
export class OrderComponent implements OnInit {
  @Input() currOrder: Order;
  title : string;
  constructor() {}

  ngOnInit() {
    this.title = 'Order created on : ' + new Date(this.currOrder.orderCreateddate).toDateString();
    this.currOrder.pickupDate = new Date(this.currOrder.pickupDate).toDateString();
  }
}
