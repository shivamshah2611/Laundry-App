import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PincodeService } from './../../services/pincode.service';
import { LoadingService } from './../../services/loading.service';


@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.page.html',
  styleUrls: ['./pincode.page.scss'],
})
export class PincodePage implements OnInit {
  buttonStatus = false;
  pincode = '';

  constructor(private router: Router, private pincodeService: PincodeService, private loading: LoadingService) {}

  ngOnInit() {
  }

  onPincodeChange(event: any) { 
    this.pincode = event.target.value;
    if ( this.pincode.length === 6 ) {
      this.buttonStatus = true;
    } else {
      this.buttonStatus = false;
    }
  }

  checkPincode() {
    this.loading.presentLoading();
    this.pincodeService.checkPincode(this.pincode).then(async (checked) => {
      if (checked) {
        this.loading.dismiss();
        this.router.navigate(['/sign-up']);
      } else {
        this.loading.dismiss();
        this.loading.presentToast('Laundry Service not avaliable at the entered Pincode!');
      }
    });

  }
}
