import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { ProfilePage } from "./profile.page";
import { ViewProfileComponent } from "./../profile/view-profile/view-profile.component";
import { EditProfileComponent } from "./edit-profile/edit-profile.component";

const routes: Routes = [
  {
    path: "",
    component: ProfilePage,
    children: [
      { path: "view-profile", component: ViewProfileComponent },
      { path: "edit-profile", component: EditProfileComponent },
      { path: "", redirectTo: "view-profile" }
    ]
  }
];

@NgModule({
  imports: [
  
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProfilePage, ViewProfileComponent, EditProfileComponent]
})
export class ProfilePageModule {}
