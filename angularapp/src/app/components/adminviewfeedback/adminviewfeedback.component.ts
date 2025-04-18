import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { Feedback } from 'src/app/models/feedback.model';
import { AuthService } from 'src/app/services/auth.service';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {

  feedbacks: Feedback[] = [];
  showDeletePopup: boolean = false;
  selectedFeedbackId: number | null = null;
  showLogoutPopup: boolean = false;
  filteredFeedbacks: Feedback[] = []; // For filtered data
  selectedRating: number | string = '';

  loading : boolean = false;

  constructor(
    private feedbackService: FeedbackService,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getAllFeedBacks();
  }

  public getAllFeedBacks() {
    this.loading = true;
    this.feedbackService.getFeedbacks().subscribe(data => {
      this.feedbacks = data ? data : [];
      this.filteredFeedbacks = [...this.feedbacks];
      this.loading = false;
    })
  }

  filterByRating(): void {
    if (this.selectedRating === '' || this.selectedRating === null) {
      this.filteredFeedbacks = [...this.feedbacks];
    } else {
      this.filteredFeedbacks = this.feedbacks.filter(
        feedback => feedback.rating === Number(this.selectedRating)
      );
    }
  }

  sortByRating(): void {
    this.filteredFeedbacks.sort((a, b) => b.rating - a.rating);
  }

  triggerDelete(feedbackId: number): void {
    this.selectedFeedbackId = feedbackId;
    this.showDeletePopup = true;
  }

  confirmDelete(): void {
    if (this.selectedFeedbackId !== null) {
      this.feedbackService.deleteFeedback(this.selectedFeedbackId).subscribe(
        response => {
          const index = this.feedbacks.findIndex(f => f.feedbackId === this.selectedFeedbackId);
          if (index !== -1) {
            this.feedbacks.splice(index, 1);
            this.filteredFeedbacks = [...this.feedbacks];
          }
          this.closeDeletePopup();
        },
        error => {
          console.error('Error deleting feedback:', error);
        }
      );
    }
  }

  closeDeletePopup(): void {
    this.showDeletePopup = false;
    this.selectedFeedbackId = null;
  }


  triggerLogout(): void {
    this.showLogoutPopup = true;
  }

  confirmLogout(): void {
    this.authService.logout();
    this.showLogoutPopup = false;
    this.router.navigate(['/login']);
  }

  cancelLogout(): void {
    this.showLogoutPopup = false;
  }

}
