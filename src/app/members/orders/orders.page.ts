import { Component, OnInit } from "@angular/core";
import { OrdersService } from './../../services/orders.service';

@Component({
  selector: "app-orders",
  templateUrl: "./orders.page.html",
  styleUrls: ["./orders.page.scss"]
})
export class OrdersPage implements OnInit {
  options = [
    {
      name: "Last Month",
      value: "1m"
    },
    {
      name: "Last 6 months",
      value: "6m"
    },
    {
      name: "All Orders",
      value: "all"
    }
  ];
  selectedOption = "1m";

  constructor() {}

  ngOnInit() {}

  onOptionChange() {
    console.log(this.selectedOption);
  }
}
