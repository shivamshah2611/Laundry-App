import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'pincode', loadChildren: './public/pincode/pincode.module#PincodePageModule' },
  { path: 'login', loadChildren: './public/login/login.module#LoginPageModule' },
  { path: 'sign-up', loadChildren: './public/sign-up/sign-up.module#SignUpPageModule' },
  { path: 'members', canActivate: [AuthGuard], loadChildren: './members/member-routing.module#MemberRoutingModule'},
  { path: 'forgot-password', loadChildren: './public/forgot-password/forgot-password.module#ForgotPasswordPageModule' },
  { path: '', redirectTo: 'pincode', pathMatch: 'full'},  { path: 'no-connection', loadChildren: './public/no-connection/no-connection.module#NoConnectionPageModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
