import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminviewordersComponent } from './components/adminvieworders/adminvieworders.component';


import { AdminviewfoodComponent } from './components/adminviewfood/adminviewfood.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { UserviewfoodComponent } from './components/userviewfood/userviewfood.component';

import { AdminaddfoodComponent } from './components/adminaddfood/adminaddfood.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { ErrorComponent } from './components/error/error.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UsermakeorderComponent } from './components/usermakeorder/usermakeorder.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { UserviewordersComponent } from './components/uservieworders/uservieworders.component';
import { AdmineditfoodComponent } from './components/admineditfood/admineditfood.component';
import { AdminorderschartComponent } from './components/adminorderschart/adminorderschart.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { VerifyResetTokenComponent } from './components/verify-reset-token/verify-reset-token.component';
import { RequestPasswordResetComponent } from './components/request-password-reset/request-password-reset.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard } from './authguard/auth.guard';



const routes: Routes = [
  {
    path: "admin/dashboard",
    component: AdminDashboardComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ROLE_ADMIN' } 

  },
  {
    path: "admin/addFood",
    component: AdminaddfoodComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ROLE_ADMIN' } 
  },
  {
    path: "admin/ordersChart",
    component: AdminorderschartComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ROLE_ADMIN' } 
  },
  {
    path: "admin/view/feedBack",
    component: AdminviewfeedbackComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ROLE_ADMIN' } 
  },
  {
    path: "admin/view/foods",
    component: AdminviewfoodComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ROLE_ADMIN' } 
  },
  {
    path: 'admin/view/orders',
    component: AdminviewordersComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ROLE_ADMIN' } 
  },
  {
    path: 'admin/edit/food/:id',
    component: AdmineditfoodComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ROLE_ADMIN' } 
  },
  {
    path: 'user/edit/feedback/:feedbackId',
    component: UseraddfeedbackComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ROLE_USER' } 
  },
  {
    path: "error",
    component: ErrorComponent
  },
  {
    path: "user/profile",
    component: UserProfileComponent,
  },
  {
    path: "user/add/feedback/:id",
    component: UseraddfeedbackComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ROLE_USER' } 
  },
  {
    path: "user/makeOrder/:id",
    component: UsermakeorderComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ROLE_USER' } 
  },
  {
    path: "user/view/feedBack",
    component: UserviewfeedbackComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ROLE_USER' } 
  },
  {
    path: "user/view/foods",
    component: UserviewfoodComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ROLE_USER' } 
  },
  {
    path: "user/view/orders",
    component: UserviewordersComponent,
    canActivate: [AuthGuard], 
    data: { role: 'ROLE_USER' } 
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  { path: 'request-password-reset', component: RequestPasswordResetComponent },
  { path: 'verify-reset-token', component: VerifyResetTokenComponent },
  { path: '', component: HomeComponent },
  {
    path: "**",
    component: HomeComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
