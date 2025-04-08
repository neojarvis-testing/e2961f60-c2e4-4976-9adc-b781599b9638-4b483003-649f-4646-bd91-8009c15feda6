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
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
