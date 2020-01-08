import { Component, OnInit, Input, OnChanges, OnDestroy } from "@angular/core";
import { OrdersService } from "./../../../services/orders.service";
import { LoadingService } from "./../../../services/loading.service";
import { Router } from "@angular/router";
import { NavController } from "@ionic/angular";
import { Order } from 'src/app/models/order.model';

@Component({
  selector: "app-orderlist",
  templateUrl: "./orderlist.component.html",
  styleUrls: ["./orderlist.component.scss"]
})
export class OrderlistComponent implements OnInit, OnDestroy {
  options = [
    {
      name: 'Last Month',
      value: '1m'
    },
    {
      name: 'Last 6 months',
      value: '6m'
    },
    {
      name: 'All Orders',
      value: 'all'
    }
  ];
  selectedOption = '1m';

  selectedString: string = 'Orders for last month:';

  orders: Order[];

  orderSub;

  constructor(
    private orderService: OrdersService,
    private loading: LoadingService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loading.presentLoading();
    this.orderService.getOrdersConditionally('1m').then(
      orders => {
        this.loading.dismiss();
        this.orders = orders;
        console.log(this.orders);
      },
      err => {
        this.loading.dismiss();
      }
    );

    this.orderSub = this.orderService._orders.subscribe(() => {
      console.log('in sub');
      // this.orders = this.orderService.getOrders();
      this.orderService.getOrdersConditionally('1m').then(
        orders => {
          this.orders = orders;
          console.log(this.orders);
        },
        err => {
          console.log(err);
        }
      );
    });
  }

  ngOnDestroy() {
    this.orderSub.unsubscribe();
  }

  onOptionChange() {
    if (this.selectedOption === '1m') {
      this.selectedString = 'Orders for last month:';
      
    } else if (this.selectedOption === '6m') {
      this.selectedString = 'Orders for last 6 months:';
     
    } else {
      this.selectedString = 'All orders:';
    }
    this.loading.presentLoading();
      this.orderService.getOrdersConditionally(this.selectedOption).then(() => {
        this.loading.dismiss();
      });
      this.orderService._orders.next(0);
  }

  onDetail(order: Order) {
    this.router.navigate(['/members/order-detail'], {
      queryParams: { id: order.id }
    });
  }
}
