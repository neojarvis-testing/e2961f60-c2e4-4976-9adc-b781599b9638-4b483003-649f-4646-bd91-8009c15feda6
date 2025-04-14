import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { OrderService } from '../services/order.service';
import { FoodService } from '../services/food.service';
import { AuthService } from '../services/auth.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isLoggedIn: boolean = false;
  userId: number;

  foodImages: (string | SafeUrl)[] = [];
  testimonials: { message: string, customerName: string }[] = [];
  totalOrders: number = 0;
  pendingOrders: number = 0;
  totalRevenue: number = 0;

  constructor(
    private authService: AuthService,
    private feedbackService: FeedbackService,
    private orderService: OrderService,
    private foodService: FoodService,
    private sanitizer : DomSanitizer
  ) {}

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    this.isLoggedIn = !!this.userId; // Check if the user is logged in

    // Fetch data from backend
    this.fetchFoodImages();
    this.fetchTestimonials();
    this.fetchOrderStatistics();
  }

  fetchFoodImages(): void {
    this.foodService.getAllFoods().subscribe(
      (foods: any[]) => {
        console.log('Fetched food items:', foods); // Logs the response for debugging
  
        this.foodImages = foods.map((food) => {
          if (food.photo) {
            // Ensure photos are properly formatted as Base64 with the required prefix
            return this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + food.photo);
          } else {
            console.warn(`Missing photo for food item: ${food.foodName}`);
            return null; // Handle case where `photo` is missing
          }
        });
      },
      (error) => {
        console.error('Error fetching food images:', error); // Logs the error
        this.foodImages = []; // Clears the array in case of failure
      }
    );
  }
  

  fetchTestimonials(): void {
    this.feedbackService.getFeedbacks().subscribe(
      (feedbacks: any[]) => {
        console.log(feedbacks)

        this.testimonials = feedbacks.map((feedback) => ({
          message: feedback.feedbackText,
          customerName: feedback.user.username
        }));
      },
      (error) => {
        console.error('Error fetching testimonials:', error);
      }
    );
  }

  fetchOrderStatistics(): void {
    this.orderService.getAllOrders().subscribe(
      (orders: any[]) => {
        console.log(orders)
        this.totalOrders = orders.length;
        this.pendingOrders = orders.filter(order => order.orderStatus === 'Ordered').length; 
        this.totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      },
      (error) => {
        console.error('Error fetching order statistics:', error);
      }
    );
  }
}
