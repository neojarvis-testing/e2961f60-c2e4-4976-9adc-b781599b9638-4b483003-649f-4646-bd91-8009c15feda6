import { Component, OnInit } from '@angular/core';
import { Feedback } from 'src/app/models/feedback.model';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-adminviewfeedback',
  templateUrl: './adminviewfeedback.component.html',
  styleUrls: ['./adminviewfeedback.component.css']
})
export class AdminviewfeedbackComponent implements OnInit {

  feedbacks : Feedback[] = [];
  constructor(private feedbackService : FeedbackService) { }


  ngOnInit(): void {
    this.getAllFeedBacks();
  }

  public getAllFeedBacks(){
    this.feedbackService.getFeedbacks().subscribe(data=>{
      this.feedbacks=data;
    })

  }

}
