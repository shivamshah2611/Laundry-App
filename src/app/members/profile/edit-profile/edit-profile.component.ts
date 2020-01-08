import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "./../../../services/user.service";
import { LoadingService } from "src/app/services/loading.service";
import { User } from "src/app/models/user.model";

import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";

@Component({
  selector: "app-edit-profile",
  templateUrl: "./edit-profile.component.html",
  styleUrls: ["./edit-profile.component.scss"],
  animations: [
    trigger("elementState", [
      state(
        "opaque",
        style({
          opacity: 1
        })
      ),
      state(
        "transparent",
        style({
          opacity: 0
        })
      ),
      transition("opaque => transparent", animate("200ms ease-in")),
      transition("transparent => opaque", animate("400ms ease-out"))
    ])
  ]
})
export class EditProfileComponent implements OnInit {
  @ViewChild("updateUserForm") updateForm: NgForm;

  user: User;

  state = "transparent";

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private loading: LoadingService
  ) {}

  ngOnInit() {
    this.user = this.userService.getUser();
  }

  ngAfterViewInit() {
    this.state = 'opaque';
  }

  onSaveChanges() {
    this.loading.presentLoading();
    this.userService
      .updateUser(
        this.updateForm.value.username,
        this.updateForm.value.userPhoneNumber
      )
      .then(
        res => {
          this.loading.dismiss();
          this.loading.presentToast("Update Success!");
          this.state = "transparent";
          setTimeout(() => {
            this.router.navigate(["../view-profile"], {
              relativeTo: this.route
            });
          }, 200);
        },
        err => {
          this.loading.dismiss();
          console.log(err);
          this.loading.presentToast("Error Updating.");
        }
      );
  }

  onCancel() {
    this.state = "transparent";
    setTimeout(() => {
      this.router.navigate(["../view-profile"], { relativeTo: this.route });
    }, 200);
  }
}
