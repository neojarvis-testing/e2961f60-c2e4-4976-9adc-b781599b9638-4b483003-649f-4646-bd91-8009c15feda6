import { Component, OnInit } from '@angular/core';
import { FeedbackService } from '../services/feedback.service';
import { OrderService } from '../services/order.service';
import { FoodService } from '../services/food.service';
import { AuthService } from '../services/auth.service';
import { UserStoreService } from '../helpers/user-store.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isLoggedIn: boolean = false;
  userId: number;
  userName: string = '';

  testimonials: { message: string, customerName: string }[] = [];
  totalOrders: number = 0;
  pendingOrders: number = 0;
  totalRevenue: number = 0;

  testimonialIndex = 0;
  testimonial = [...this.testimonials];

  motivationalMessages: string[] = [
    "Success is not final, failure is not fatal: it is the courage to continue that counts. -Winston Churchill",
    "Believe you can and you're halfway there. -Theodore Roosevelt",
    "Do not wait to strike till the iron is hot; but make it hot by striking. -William Butler Yeats",
    "Hardships often prepare ordinary people for extraordinary destiny. -C.S. Lewis",
    "Great things are done by a series of small things brought together. –Vincent Van Gogh"
  ]

  motivationalMessage: string = '';


  nextTestimonial() {
    this.testimonialIndex = (this.testimonialIndex + 1) % this.testimonial.length;
  }

  setMotivationalMessage() {
    const randomIndex = Math.floor(Math.random() * this.motivationalMessages.length);
    this.motivationalMessage = this.motivationalMessages[randomIndex];
    console.log(this.motivationalMessage)
  }


  constructor(
    private authService: AuthService,
    private feedbackService: FeedbackService,
    private orderService: OrderService,
    private userStoreService: UserStoreService
  ) { }

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    this.isLoggedIn = !!this.userId; // Check if the user is logged in
    this.userName = this.userStoreService.authUser.name.toUpperCase();


    this.fetchTestimonials();
    this.fetchOrderStatistics();
    this.setMotivationalMessage();
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
        this.pendingOrders = orders.filter(order => order.orderStatus !== 'Delivered').length;
        this.totalRevenue = orders
          .filter(order => order.orderStatus === 'Delivered') 
          .reduce((sum, order) => sum + order.totalAmount, 0);
      },
      (error) => {
        console.error('Error fetching order statistics:', error);
      }
    );
  }
}
