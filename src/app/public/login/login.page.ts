import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from './../../services/auth.service';
import { NgForm } from '@angular/forms';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('loginForm') userForm: NgForm;
  
  constructor(private navController: NavController, private router: Router, private AuthService: AuthenticationService,
               private loading: LoadingService) { }

  ngOnInit() {
  }

  onSignUpClick() {
    this.router.navigate(['/sign-up']);
  }

  onLogin() {

    this.loading.presentLoading();

    this.AuthService.login(this.userForm.value.userEmail, this.userForm.value.userPassword).then((res) => {
      this.loading.dismiss();

      if(res.operationType === 'signIn') {
        this.navController.navigateRoot('/members',{animated:true,animationDirection:'forward'});
      } else {
        console.log(res);
        this.loading.presentAlert(res);
      }
      
    });
    
  }

  onForgotPassClick() {
    this.router.navigate(['forgot-password']);
  }
}
