import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-useraddfeedback',
  templateUrl: './useraddfeedback.component.html',
  styleUrls: ['./useraddfeedback.component.css']
})
export class UseraddfeedbackComponent implements OnInit {

  userFeedbackForm: FormGroup;
  showPopup: boolean = false;

  foodOptions = [
    { foodId: 1, foodName: 'Pizza' },
    { foodId: 2, foodName: 'Burger' },
    { foodId: 3, foodName: 'Pasta' }
  ];

  currentUser = { userId: 101, userName: 'John Doe' };

  constructor(private feedbackService: FeedbackService, private fb: FormBuilder) {
    this.userFeedbackForm = fb.group({
      food: fb.control('', [Validators.required]),
      feedbackText: fb.control('', [Validators.required]),
      rating: fb.control('', [Validators.required, Validators.min(1), Validators.max(5)])
    });
  }

  ngOnInit(): void { }

  createFeedback() {
    if (this.userFeedbackForm.valid) {
      const feedback: Feedback = {
        feedbackText: this.userFeedbackForm.value.feedbackText,
        date: new Date(),
        food: this.userFeedbackForm.value.food,
        rating: this.userFeedbackForm.value.rating,
        user: this.currentUser }; // Creating Feedback object
      console.log(feedback);
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
