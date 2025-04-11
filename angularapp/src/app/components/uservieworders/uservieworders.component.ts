import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { orders } from 'src/app/models/orders.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-uservieworders',
  templateUrl: './uservieworders.component.html',
  styleUrls: ['./uservieworders.component.css']
})
export class UserviewordersComponent implements OnInit {

  orders : orders[] = [];
  userId : number;
  errorMessage : string = '';

  constructor(private orderService: OrderService , private userStoreService:UserStoreService) { }

  ngOnInit(): void {
    this.userId = this.userStoreService.authUser?.userId;
    console.log("UID: " + this.userId);
    
  }

  loadOrdersByUser(){
    this.orderService.getAllOrdersByUserId(this.userId).subscribe( {
      next:(data)=>{
        this.orders=data;
      },
      error : (error)=>{
        console.log("error in fetching orders from user");
        this.errorMessage="Failed to load order history , please try again";
      }
       
    })
  }




}
