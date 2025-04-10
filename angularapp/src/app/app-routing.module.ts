import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminviewordersComponent } from './components/adminvieworders/adminvieworders.component';

const routes: Routes = [
  {path:'adminvieworders',component:AdminviewordersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
