import { Component, OnInit, ViewChild, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OrdersService } from './../../services/orders.service';
import { LoadingService } from './../../services/loading.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './../../services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {
  public laundryServices = [
    {
      key: 'dryclean',
      val: 'Dry Clean',
      rate: 100,
      isChecked: false
    },
    {
      key: 'wash',
      val: 'Wash',
      rate: 5,
      isChecked: false
    },
    {
      key: 'iron',
      val: 'Iron',
      rate: 5,
      isChecked: false
    }
  ];

  public timeSlots = [
    {
      key: '10am',
      val: '10am to 1pm'
    },
    {
      key: '1pm',
      val: '1pm to 4pm'
    },
    {
      key: '4pm',
      val: '4pm to 7pm'
    }
  ];

  @ViewChild('newOrderForm') newOrderForm: NgForm;

  amount: number = 0;

  pickupDate: string;

  today: Date;
  minDate: string;
  maxDate: string;

  customOptions: any = {
    header: 'Time Slot.',
    subHeader: 'Select the time slot you prefer for pickup.'
  };

  constructor(
    private orderService: OrdersService,
    private loading: LoadingService,
    private router: Router,
    private authService: AuthenticationService,
    private userService: UserService
  ) {
    this.today = new Date();
    this.minDate = new Date(
      this.today.setDate(this.today.getDate() + 2)
    ).toISOString();
    this.maxDate = new Date(
      this.today.setMonth(this.today.getMonth() + 1)
    ).toISOString();
  }

  ngOnInit() {}

  ionViewDidEnter() {
    if (
      Object.entries(this.userService.getUser()).length === 0 &&
      this.userService.getUser().constructor === Object
    ) {
      this.authService.checkToken();
    }
    this.newOrderForm.reset();
  }

  onPropertyChange() {
    this.amount = 0;
    this.laundryServices.forEach(service => {
      if (service.isChecked) {
        console.log(service.isChecked);
        this.amount =
          this.amount +
          Number(this.newOrderForm.value.noOfGarments) * service.rate;
      }
    });
  }

  onOrderCreated() {
    this.orderService.newOrder.noOfGarments = parseInt(this.newOrderForm.value.noOfGarments);

    let services: string = '';
    let amount: number = 0;
    let timeslot: string = '';
    console.log(this.orderService.today);
    this.laundryServices.forEach(service => {
      if (service.isChecked) {
        services += service.val + ' ';
        amount =
          amount +
          Number(this.orderService.newOrder.noOfGarments) * service.rate;
      }
    });

    if (services === '') {
      this.loading.presentToast('Atleast one service must be selected.');
    } else {
      switch (this.newOrderForm.value.timeslot) {
        case '10am':
          timeslot = '10am to 1pm';
          break;
        case '1pm':
          timeslot = '1pm to 4pm';
          break;
        case '4pm':
          timeslot = '4pm to 7pm';
          break;
      }

      console.log(timeslot);

      let pickup = new Date(this.pickupDate);

      this.orderService.newOrder.services = services;
      this.orderService.newOrder.amount = amount;
      this.orderService.newOrder.timeslot = timeslot;
      this.orderService.newOrder.pickupDate = pickup.toDateString();
      
      this.orderService.newOrder.deliveryDate = new Date(
        pickup.setDate(pickup.getDate() + 3)
      ).toDateString();
      this.router.navigate(['/members/select-address']);
    }
  }
}
