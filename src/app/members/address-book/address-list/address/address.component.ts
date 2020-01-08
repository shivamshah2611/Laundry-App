import { Component, OnInit, Input } from "@angular/core";
import { Address } from "../../../../models/address.model";
import { Router, ActivatedRoute } from "@angular/router";

import { AddressService } from "./../../../../services/address.service";
import { LoadingService } from "src/app/services/loading.service";
import { AlertController } from '@ionic/angular';

@Component({
  selector: "app-address",
  templateUrl: "./address.component.html",
  styleUrls: ["./address.component.scss"]
})
export class AddressComponent implements OnInit {
  @Input() address: Address;

  @Input() state: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private addressService: AddressService,
    private loading: LoadingService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  onEditClick() {
    this.router.navigate([`members/edit-address/${this.address.id}`]);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Confirm!',
      message: `Delete Address: <strong>'${this.address.nickname}'</strong>`,
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
              this.onDeleteClick();
          }
        }
      ]
    });

    await alert.present();
  }

  async onDeleteClick() {
    
    this.addressService.deleteAddress(this.address.id).then(
      () => {
        this.loading.presentToast("Address Deleted Successfully.");
      },
      () => {
        this.loading.presentToast("Error Deleting.");
      }
    );
  }
}
