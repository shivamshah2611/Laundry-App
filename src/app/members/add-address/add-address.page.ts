import { Component, OnInit, ViewChild } from '@angular/core';
import { AddressService } from './../../services/address.service';
import { PincodeService } from './../../services/pincode.service';
import { LoadingService } from 'src/app/services/loading.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { animation } from '@angular/animations';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.page.html',
  styleUrls: ['./add-address.page.scss'],
})
export class AddAddressPage implements OnInit {

  countries : string[] = [];

  @ViewChild('addrForm') addrForm: NgForm;

  from : string;

  constructor(private addressService: AddressService, private loading: LoadingService, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.addressService.getCountries().then((res) => {
      if(res) {
        this.countries = res;
      } else {
        console.log(res);
        this.loading.presentToast('error');
      }
    });

    this.route.queryParams.subscribe(params => {
      this.from = params['from'];
    });
    console.log(this.from);
  }

  onAddAddress() {
    this.
    addressService.
    addAddress(this.addrForm.value.nickname, this.addrForm.value.add_line, this.addrForm.value.district, 
              this.addrForm.value.state,this.addrForm.value.country,this.addrForm.value.pincode).then(res => {
                if(res) {
                  console.log(res);
                  this.loading.presentToast('Address added successfully');
                  if(this.from) {
                    this.router.navigate(['members/select-address']);
                  } else {
                    this.router.navigate(['members/address-book']);
                  }
                  
                } else {
                  console.log(res);
                  this.loading.presentToast('Error adding address');
                }
              });
  }
}
