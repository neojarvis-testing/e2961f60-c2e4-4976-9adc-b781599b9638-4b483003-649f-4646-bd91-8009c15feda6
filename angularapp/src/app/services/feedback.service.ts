import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpClient:HttpClient) { }

  public apiUrl:string = "https://ide-affbecdbcccfcdfbdefbbddcfebfcdbbfbdcfeda.premiumproject.examly.io/proxy/8080/api/feedback";


  sendFeedback(feedback:Feedback):Observable<any>
  {
    return this.httpClient.post(this.apiUrl,feedback);
  }

  getAllFeedbacksByUserId(userId:number):Observable<any>
  {
    return this.httpClient.get(this.apiUrl+"/user/"+userId);
  }

  deleteFeedback(feedbackId:number):Observable<any>
  {
    return this.httpClient.delete(this.apiUrl+"/"+feedbackId);
  }

  getFeedbacks():Observable<any>
  {
    return this.httpClient.get(this.apiUrl);
  }

}
