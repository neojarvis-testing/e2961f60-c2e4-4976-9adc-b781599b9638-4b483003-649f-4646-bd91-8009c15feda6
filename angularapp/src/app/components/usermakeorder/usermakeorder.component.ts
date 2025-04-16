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

  orderPlaced: boolean = false;

  userAddress: string = '';
  isAddressPopupVisible: boolean = false;
  isSuccessPopupVisible: boolean = false;
  successMessage: string = '';



  constructor(
    private orderService: OrderService,
    private foodService: FoodService,
    private userStoreService: UserStoreService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.userId = this.userStoreService.authUser?.userId;
    this.activatedRoute.paramMap.subscribe(data => {
      this.foodId = parseInt(data.get("id"));
    })
    this.loadFoodDetails();


  }

  loadFoodDetails() {
    console.log("load food details")
    this.foodService.getFoodById(this.foodId).subscribe((data) => {
      console.log(data);
      this.food = data;
      this.totalAmount = this.food.price
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

  increaseQuantity() {
    if (this.quantity < this.food.stockQuantity) {
      this.quantity++;
    }
    this.calaculateTotalCost();
  }

  calaculateTotalCost() {
    this.totalAmount = this.food.price * this.quantity;
  }

  showAddressPopup() {
    this.isAddressPopupVisible = true;
  }

  closeAddressPopup() {
    this.isAddressPopupVisible = false;
  }

  saveAddress() {
    console.log("Address saved:", this.userAddress);
    this.isAddressPopupVisible = false;
    this.createOrder()
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
      orderDate: new Date().toISOString(),
      address: this.userAddress,
      user: {
        userId: this.userId,
        email: '',
        password: '',
        username: '',
        mobileNumber: '',
        userRole: '',


      },
      food: {
        foodId: this.foodId,
        foodName: '',
        price: 0,
        stockQuantity: 0,
        userId: 0
      }
    };

    this.orderService.placeOrder(order).subscribe(data => {

      this.orderPlaced = true;
      // this.router.navigate(['/user/view/orders']);

      this.successMessage = "Order Placed Successfully!"; // Set success message
      this.isSuccessPopupVisible = true; // Show success popup

    },
      (error) => {
        this.errorMessage = 'Failed to place order!!!';
        console.log(error);
      }
    );
  }
  cancelOrder() {
    this.router.navigate(['/user/view/foods']);
  }


  closePopup() {
    this.orderPlaced = false;
    this.router.navigate(['/user/view/orders']);
  }
    closeSuccessPopup() {
      this.isSuccessPopupVisible = false; // Hide success popup
      this.router.navigate(['/user/view/orders']); // Redirect to orders page

    }
  }


