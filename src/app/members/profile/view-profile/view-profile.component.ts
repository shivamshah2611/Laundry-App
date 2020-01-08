import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/auth.service';
import { UserService } from './../../../services/user.service';
import { User } from './../../../models/user.model';
import { Subject } from 'rxjs';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss'],
  animations: [
    trigger('elementState', [
      state(
        'opaque',
        style({
          opacity: 1
        })
      ),
      state(
        'transparent',
        style({
          opacity: 0
        })
      ),
      transition('opaque => transparent', animate('200ms ease-in')),
      transition('transparent => opaque', animate('400ms ease-out'))
    ])
  ]
})
export class ViewProfileComponent implements OnInit, OnDestroy {
  public user: User;

  userSub;

  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  joinDate: string;

  state = 'transparent';

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
    this.userSub = this.userService.userSub.subscribe(user => {
      this.user = user;
    });

    this.joinDate = this.months[new Date(this.user.joinDate).getMonth()] + ', ' + new Date(this.user.joinDate).getFullYear();
    console.log(this.joinDate);
  }

  ngAfterContentChecked() {
    if (this.state === 'transparent') {
      this.state = 'opaque';
    }
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
    console.log('unsub');
  }

  onLogout() {
    this.authService.logout();
  }

  gotoEdit() {
    this.state = 'transparent';
    setTimeout(() => {
      this.router.navigate(['../edit-profile'], { relativeTo: this.route });
    }, 200);
  }
}
