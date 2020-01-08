import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingService } from './../../services/loading.service';
import { AuthenticationService } from './../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  @ViewChild('forgotPassForm') forgotPassForm: NgForm;

  constructor(private loading: LoadingService, private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onForgotPass() {
    const email = this.forgotPassForm.value.userEmail;
    this.loading.presentLoading();
    this.authService.forgotPassword(email).then((res) => {
      this.loading.dismiss();
      this.loading.presentAlert(res);
    });
  }
}
