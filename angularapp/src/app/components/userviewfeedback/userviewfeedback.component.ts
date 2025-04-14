import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-userviewfeedback',
  templateUrl: './userviewfeedback.component.html',
  styleUrls: ['./userviewfeedback.component.css']
})
export class UserviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  showDeletePopup: boolean = false;
  selectedFeedbackId: number | null = null;
  showLogoutPopup: boolean = false;

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private router: Router,
    private userStore:UserStoreService
  ) { }

  ngOnInit(): void {
    const currentUser = this.userStore.authUser?.userId

    if (currentUser!=null) {

      console.log(currentUser);
      this.feedbackService.getAllFeedbacksByUserId(currentUser).subscribe(
        (data: Feedback[]) => {
          this.feedbacks = data ? data : [];
        },
        error => {
          console.error('Error fetching feedback:', error);
        }
      );
    }
  }

  triggerDelete(feedbackId: number): void {
    this.selectedFeedbackId = feedbackId;
    this.showDeletePopup = true;
  }

  confirmDelete(): void {
    if (this.selectedFeedbackId) {
      console.log(this.selectedFeedbackId);
      this.feedbackService.deleteFeedback(this.selectedFeedbackId).subscribe(
        data => {
          const currentUser = this.userStore.authUser?.userId;
          this.feedbackService.getAllFeedbacksByUserId(currentUser).subscribe(
            (data: Feedback[]) => {

              this.feedbacks = data ? data : [];
              this.closeDeletePopup();
            })
        }
      );
    }
  }
  navigateToEdit(feedbackId: number): void {
    this.router.navigate(['/user/edit/feedback', feedbackId]);
  }
  

  closeDeletePopup(): void {

    this.showDeletePopup = false;
    this.selectedFeedbackId = null;
  }

}
