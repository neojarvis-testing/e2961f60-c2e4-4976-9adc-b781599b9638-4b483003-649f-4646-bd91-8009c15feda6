import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminviewfoodComponent } from './components/adminviewfood/adminviewfood.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { HomeComponent } from './components/home/home.component';
import { UserviewfoodComponent } from './components/userviewfood/userviewfood.component';

const routes: Routes = [
  { path: 'adminviewfood', component: AdminviewfoodComponent },
  {path:'login',component:LoginComponent},
  {path:'register',component:RegistrationComponent},
  {path:'home',component:HomeComponent},
  {path:'admin/view/foods',component:AdminviewfoodComponent},
  {path:'user/view/foods',component:UserviewfoodComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
