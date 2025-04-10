import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminviewordersComponent } from './components/adminvieworders/adminvieworders.component';


import { AdminviewfoodComponent } from './components/adminviewfood/adminviewfood.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { UserviewfoodComponent } from './components/userviewfood/userviewfood.component';
import { AdmineditfoodComponent } from './components/admineditfood/admineditfood.component';
import { AdminaddfoodComponent } from './components/adminaddfood/adminaddfood.component';

const routes: Routes = [
  {path:'adminaddfood', component:AdminaddfoodComponent},
  {path:'adminvieworders',component:AdminviewordersComponent},
  {path:'adminviewfood', component: AdminviewfoodComponent },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegistrationComponent},
  {path:'home',component:HomeComponent},
  {path:'admin/view/foods',component:AdminviewfoodComponent},
  {path:'user/view/foods',component:UserviewfoodComponent},
  {path:'admineditfood',component:AdmineditfoodComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
