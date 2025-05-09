import { Component, OnInit } from '@angular/core';
import { faSleigh } from '@fortawesome/free-solid-svg-icons';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { orders } from 'src/app/models/orders.model';
import { FoodService } from 'src/app/services/food.service';
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
  isEmpty : boolean = false;
  loading : boolean = false;

  constructor(private orderService: OrderService , private userStoreService:UserStoreService,private foodService:FoodService) { }

  ngOnInit(): void {
    this.userId = this.userStoreService.authUser?.userId;
    console.log("UID: " + this.userId);
    this.loadOrdersByUser();
    
  }

  loadOrdersByUser(){
    this.loading = true;
    this.orderService.getAllOrdersByUserId(this.userId).subscribe( {
      next:(data)=>{
        this.isEmpty=false;
        console.log(data)
        this.orders=data;
        this.loading = false;
      },
      error : (error)=>{
        if(error.status == 404){
          this.isEmpty = true;
        }
        this.loading = false;
        console.log("error in fetching orders from user");
        this.errorMessage="Failed to load order history , please try again";
      }
       
    })
  }


}
