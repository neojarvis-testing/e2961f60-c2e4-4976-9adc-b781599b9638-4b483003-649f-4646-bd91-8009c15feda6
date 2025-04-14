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



const routes: Routes = [
  {
    path:"admin/dashboard",
    component:AdminDashboardComponent
  },
  {
    path:"admin/addFood",
    component:AdminaddfoodComponent
  },
  {
    path:"admin/ordersChart",
    component:AdminorderschartComponent
  },
  {
    path:"admin/view/feedBack",
    component:AdminviewfeedbackComponent
  },
  {
    path:"admin/view/foods",
    component:AdminviewfoodComponent
  },
  {
    path:'admin/view/orders',
    component:AdminviewordersComponent
  },
  {
    path:'admin/edit/food/:id',
    component:AdmineditfoodComponent
  },
  { 
    path: 'user/edit/feedback/:feedbackId',
    component: UseraddfeedbackComponent 
  },
  {
    path:"error",
    component:ErrorComponent
  },
  {
    path:"user/add/feedback/:id",
    component:UseraddfeedbackComponent
  },
  {
    path:"user/makeOrder/:id",
    component:UsermakeorderComponent
  },
  {
    path:"user/view/feedBack",
    component:UserviewfeedbackComponent
  },
  {
    path:"user/view/foods",
    component:UserviewfoodComponent
  },
  {
    path:"user/view/orders",
    component:UserviewordersComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
  {
    path:'register',
    component:RegistrationComponent
  },
 {path: 'request-password-reset', component: RequestPasswordResetComponent },
 { path: 'verify-reset-token', component: VerifyResetTokenComponent },
 { path: '', redirectTo: '/request-password-reset', pathMatch: 'full' },
 {
  path:"**",
  component:HomeComponent
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
