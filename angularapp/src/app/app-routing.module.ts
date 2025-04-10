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



const routes: Routes = [
  
  {
    path:"**",
    component:HomeComponent
  },
  {
    path:"admin/addFood",
    component:AdminaddfoodComponent
  },
  {
    path:"admin/ordersChart",
    component:AdminviewordersComponent
  },
  {
    path:"admin/view/feedBack",
    component:AdminviewfeedbackComponent
  },
  {
    path:"admin/view/food",
    component:AdminviewfoodComponent
  },
  {
    path:'admin/view/orders',
    component:AdminviewordersComponent
  },
  {
    path:"error",
    component:ErrorComponent
  },
  {
    path:"user/add/feedBack",
    component:UseraddfeedbackComponent
  },
  {
    path:"user/addOrder",
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
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
