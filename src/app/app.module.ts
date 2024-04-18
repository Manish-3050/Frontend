import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { LoginComponent } from './authentication/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import{MaterialModule} from 'src/material.module';
import { NgxSliderModule } from 'ngx-slider-v2';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupRoutingModule } from './authentication/signup/signup.routes.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ChatComponent } from './components/chat/chat.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    NavbarComponent,
    LoginComponent,
    SidebarComponent,
    ChatComponent,
    DateAgoPipe,
  ],
  imports: [
    BrowserModule,
    NgMultiSelectDropDownModule,
    NgxSliderModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    SignupRoutingModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
