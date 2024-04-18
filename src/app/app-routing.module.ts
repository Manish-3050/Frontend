import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import { AppComponent } from './app.component';


const routes: Routes = [ 
  // {
  //   path:'',
  //   component:AppComponent
  // },
  // {
  //   path:'buynow/payment',
  //   component:PaymentsComponent
  // },
  {
    path:'signup',
    component:SignupComponent,
  },
  {
    path:'login',
    component:LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
