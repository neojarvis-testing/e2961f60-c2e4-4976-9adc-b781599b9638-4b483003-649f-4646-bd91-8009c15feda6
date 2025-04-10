import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  orderId:number = 2;


  constructor( private fb: FormBuilder,
    private feedbackService: FeedbackService,
    private orderService: OrderService,
    private foodService:FoodService,
    private userStore:UserStoreService) {
    this.userFeedbackForm = fb.group({
      food: fb.control('', [Validators.required]),
      feedbackText: fb.control('', [Validators.required]),
      rating: fb.control('', [Validators.required, Validators.min(1), Validators.max(5)])
    });
  }

  ngOnInit(): void {
    this.currentUser = this.userStore.authUser.userId;
    this.getOrderDetails(this.orderId);
   }

   getOrderDetails(orderId:number)
   {
      this.orderService.getOrderById(orderId).subscribe(data=>{
      this.orderDetails=data;
      this.foodService.getFoodById(this.orderDetails.foodId).subscribe(data=>{
        this.userFeedbackForm.patchValue({ food: this.foodDetails.foodName});
      })
     });
   }

  createFeedback() {
    if (this.userFeedbackForm.valid && this.currentUser) {
      const feedback: Feedback = {
        feedbackText: this.userFeedbackForm.value.feedbackText,
        date: new Date(), 
        foodId: this.foodDetails.foodId, 
        rating: this.userFeedbackForm.value.rating,
        userId: 3 
      };
      this.feedbackService.sendFeedback(feedback).subscribe(
        (data) => {
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
  }
}
