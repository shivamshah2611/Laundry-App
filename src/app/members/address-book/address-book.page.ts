import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-address-book',
  templateUrl: './address-book.page.html',
  styleUrls: ['./address-book.page.scss'],
})
export class AddressBookPage implements OnInit {

  constructor(private toastController: ToastController, private router: Router,private route: ActivatedRoute) { }

  ngOnInit() {
  }
  
}
