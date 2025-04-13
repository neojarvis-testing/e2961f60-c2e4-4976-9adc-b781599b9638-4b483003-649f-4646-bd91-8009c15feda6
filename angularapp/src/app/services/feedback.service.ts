
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feedback } from '../models/feedback.model';
import { Observable } from 'rxjs';
import { url } from '../Global/global';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private httpClient:HttpClient) { }

  public apiUrl = url.apiUrl+"/api/feedback"


  sendFeedback(feedback:Feedback):Observable<any>
  {
    return this.httpClient.post(this.apiUrl,feedback);
  }

  getAllFeedbacksByUserId(userId:number):Observable<any>
  {
    console.log("get all feedbacks");
    return this.httpClient.get(this.apiUrl+"/user/"+userId);
  }

  deleteFeedback(feedbackId:number):Observable<any>
  {
    return this.httpClient.delete(this.apiUrl+"/"+feedbackId,{ responseType: 'text' });
  }

  getFeedbackById(feedbackId: number): Observable<Feedback> {
    return this.httpClient.get<Feedback>(`${this.apiUrl}/${feedbackId}`);
  }
  
  updateFeedback(feedbackId: number, feedback: Feedback): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/${feedbackId}`, feedback);
  }  

  getFeedbacks():Observable<any>
  {
    return this.httpClient.get(this.apiUrl);
  }

}
