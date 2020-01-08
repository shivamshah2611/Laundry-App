import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

import { LoadingService } from 'src/app/services/loading.service';
import { AuthenticationService } from './../../services/auth.service';

import { User } from './../../models/user.model';
import { auth } from 'firebase';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  @ViewChild('userForm') userForm: NgForm;



  constructor(private router: Router, private navController: NavController, private authService: AuthenticationService,
    private loading: LoadingService) { }

  ngOnInit() {
  }

  onLoginClick() {
    this.router.navigate(['/login']);
  }

  onSignUp() {

    this.loading.presentLoading();

    this.authService.newUserSingup(this.userForm.value.username, this.userForm.value.userEmail, this.userForm.value.userPhoneNumber, 
                                  this.userForm.value.userPassword)
    .then((res) => {
      this.loading.dismiss(); 
      if(res) {
        console.log(this.authService.isAuthenticated());
        this.navController.navigateRoot(['/members']);
      }
      else {
        this.loading.presentAlert(res);
      }
    });

  }
}
