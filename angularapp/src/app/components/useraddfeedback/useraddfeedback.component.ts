import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { Feedback } from 'src/app/models/feedback.model';
import { Food } from 'src/app/models/food.model';
import { orders } from 'src/app/models/orders.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';
import { FoodService } from 'src/app/services/food.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  userFeedbackForm: FormGroup;
  showPopup: boolean = false;
  orderDetails: orders | null = null;
  foodDetails:Food|null = null;
  currentUser: any = null;
  orderId:number = 1;///// change


  constructor( private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private orderService: OrderService,
    private foodService:FoodService,
    private userStore:UserStoreService,
    private activatedRoute:ActivatedRoute,
    private router:Router) 
    {
    this.userFeedbackForm = fb.group({
      food: fb.control(''),
      feedbackText: fb.control('', [Validators.required]),
      rating: fb.control('', [Validators.required, Validators.min(1), Validators.max(5)])
    });
  }

  ngOnInit(): void {
    this.currentUser = this.userStore.authUser.userId;
    console.log(this.currentUser+"current user id")
    // this.activatedRoute.paramMap.subscribe(data=>{
    //   this.orderId = parseInt(data.get('id'))
    // })
    this.getOrderDetails(this.orderId);
   }

   getOrderDetails(orderId:number)
   {
      this.orderService.getOrderById(orderId).subscribe((data : orders) =>{
      this.orderDetails=data;
      console.log(this.orderDetails)
      this.foodService.getFoodById(this.orderDetails.food.foodId).subscribe((data: Food)=>{
        this.foodDetails = data;
        this.userFeedbackForm.patchValue({ food: data.foodName});
        console.log(this.foodDetails)
      })
     });
   }

  createFeedback() {
    if (this.userFeedbackForm.valid) {
      const feedback :Feedback = {
        feedbackText: this.userFeedbackForm.value.feedbackText,
        date: new Date(),
        userId: this.currentUser,
        user:{
          userId: this.currentUser,
          email: '',
          password: '',
          username: '',
          mobileNumber: '',
          userRole: ''
        },
        rating: this.userFeedbackForm.value.rating,
        foodId: this.foodDetails.foodId,
        food:{
          foodId: this.foodDetails.foodId,
          foodName: '',
          price: 0,
          stockQuantity: 0,
          userId: 0
        }
      };
      
      console.log(feedback);
      this.feedbackService.sendFeedback(feedback).subscribe(
        (data) => {
          console.log("inside send feedback")
          this.showPopup = true; 
          this.userFeedbackForm.reset(); 
        },
        (error) => {
          console.error('Error adding feedback:', error);
        }
      );
    }
  }

  closePopup(): void {
    this.showPopup = false;
    this.router.navigate(['user/view/feedBack']);
  }
}
