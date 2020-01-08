import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { OrdersService } from "./../../services/orders.service";
import { LoadingService } from "src/app/services/loading.service";
import { Order } from 'src/app/models/order.model';
import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.page.html",
  styleUrls: ["./order-detail.page.scss"]
})
export class OrderDetailPage implements OnInit {
  currOrder: Order;

  title: string;

  status: boolean;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrdersService,
    private loading: LoadingService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currOrder = this.orderService.getOrder(params['id']);
    });
    console.log(this.currOrder);
    this.title =
      'Order created on : ' +
      new Date(this.currOrder.orderCreateddate).toDateString();

    let pickupDate = new Date(this.currOrder.pickupDate);
    let lastDate = new Date();
    lastDate.setDate(pickupDate.getDate() - 1);
    if (
      new Date().getTime() < lastDate.getTime() &&
      this.currOrder.orderStatus === 'pending'
    ) {
      this.status = true;
    } else {
      this.status = false;
    }

    console.log(this.status);

    this.currOrder.pickupDate = new Date(
      this.currOrder.pickupDate
    ).toDateString();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Are you sure yo want to cancel pickup?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Okay',
          handler: () => {
              this.onCancel(this.currOrder);
          }
        }
      ]
    });

    await alert.present();
  }

  onCancel(order: Order) {
    console.log(order);
    this.loading.presentLoading();
    this.orderService.cancelOrder(order.id).then(() => {
      this.loading.dismiss();
      this.loading.presentToast('Pickup cancelled.');
      this.router.navigate(['/members/orders']);
    });
  }
}
