import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { AdminaddfoodComponent } from './components/adminaddfood/adminaddfood.component';
import { AdminnavComponent } from './components/adminnav/adminnav.component';
import { AdminorderschartComponent } from './components/adminorderschart/adminorderschart.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { AdminviewordersComponent } from './components/adminvieworders/adminvieworders.component';
import { AuthguardComponent } from './components/authguard/authguard.component';
import { ErrorComponent } from './components/error/error.component';
import { AdminviewfoodComponent } from './components/adminviewfood/adminviewfood.component';


import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UsermakeorderComponent } from './components/usermakeorder/usermakeorder.component';
import { UsernavComponent } from './components/usernav/usernav.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewfoodComponent } from './components/userviewfood/userviewfood.component';
import { UserviewordersComponent } from './components/uservieworders/uservieworders.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LoginComponent } from './components/login/login.component';
import { AdmineditfoodComponent } from './components/admineditfood/admineditfood.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

import { RequestPasswordResetComponent } from './components/request-password-reset/request-password-reset.component';
import { VerifyResetToken } from './models/verify-reset-password.model';
import { VerifyResetTokenComponent } from './components/verify-reset-token/verify-reset-token.component';


import { ChartsModule } from 'ng2-charts';
import { UserProfileComponent } from './user-profile/user-profile.component';



@NgModule({
  declarations: [
    AppComponent,

    AdminaddfoodComponent,
    AdminnavComponent,
    AdminorderschartComponent,
    AdminviewfeedbackComponent,
    AdminviewordersComponent,
    AuthguardComponent,
    ErrorComponent,
    AdminviewfoodComponent,
    LoginComponent,
  

    HomeComponent,
    NavbarComponent,
    RegistrationComponent,
    UseraddfeedbackComponent,
    UsermakeorderComponent,
    UsernavComponent,
    UserviewfeedbackComponent,
    UserviewordersComponent,
    AdmineditfoodComponent,
    UserviewfoodComponent,
    AdminDashboardComponent,
    ThemeToggleComponent,
    VerifyResetTokenComponent,
    RequestPasswordResetComponent,
    UserProfileComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
