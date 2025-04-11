import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { orders } from 'src/app/models/orders.model';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-usermakeorder',
  templateUrl: './usermakeorder.component.html',
  styleUrls: ['./usermakeorder.component.css']
})
export class UsermakeorderComponent implements OnInit {

  foodId: number;
  food: any;
  quantity: number = 1;
  userId: number;
  totalAmount: number = 0;
  errorMessage: string = '';

  constructor(
    private orderService: OrderService,
    private foodService: FoodService,
    private userStoreService: UserStoreService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.userId = this.userStoreService.authUser?.userId;
    this.foodId = parseInt(this.activatedRoute.snapshot.paramMap.get("id"));

    if (this.foodId) {
      this.loadFoodDetails();
    }

    this.userId = this.userStoreService.authUser?.userId ?? 1; // Default user ID for testing
    this.foodId = 101; // Hardcoded food ID for testing

    // Manually populate food details for testing
    this.food = {
      foodId: this.foodId,
      foodName: "Test Pizza",
      price: 250,
      stockQuantity: 10,
      photo: "dummy-image-url.jpg",
      userId: 5
    };

    this.calaculateTotalCost();

  }

  loadFoodDetails() {
    this.foodService.getFoodById(this.foodId).subscribe((data) => {
      this.food = data;
    },
      (error) => {
        this.errorMessage = "Error Loading Food details";
        console.log('food loading error', error);
      }
    );
  }

  
  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
    this.calaculateTotalCost();
  }

  increaseQuantity(){
    if(this.quantity<this.food.stockQuantity){
      this.quantity++;
    }
    this.calaculateTotalCost();
  }

  calaculateTotalCost() {
    this.totalAmount = this.food.price * this.quantity;
  }

  createOrder() {
    if (this.quantity < 1) {
      alert("Please select at leat 1 item");
      return;
    }

    let order: orders = {
      orderStatus: "Ordered",
      totalAmount: this.totalAmount,
      quantity: this.quantity,
      userId: this.userId,
      foodId: this.foodId,
      orderDate: new Date().toISOString()
    };

    this.orderService.placeOrder(order).subscribe(data => {
      alert("Order Placed Successfully !");
      this.router.navigate(['/uservieworders']);
    },
      (error) => {
        this.errorMessage = 'Failed to placed order!!!';
        console.log(error);
      }
    )

  }
  cancelOrder() {
    this.router.navigate(['/userviewfood']);
  }




}
