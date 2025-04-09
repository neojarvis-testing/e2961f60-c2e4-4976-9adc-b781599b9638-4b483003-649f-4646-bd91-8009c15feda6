import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminviewfoodComponent } from './components/adminviewfood/adminviewfood.component';

const routes: Routes = [
  { path: 'adminviewfood', component: AdminviewfoodComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
