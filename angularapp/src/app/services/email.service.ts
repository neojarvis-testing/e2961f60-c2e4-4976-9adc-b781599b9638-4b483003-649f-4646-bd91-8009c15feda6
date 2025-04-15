import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from '../Global/global';
import { Email } from '../models/email.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  public apiUrl = url.apiUrl+"/api/mail/send";

  constructor(private httpClient:HttpClient) { }

  sendEmail(data:Email):Observable<any>{
    const headers = { 'Authorization': 'Bearer YOUR_ACCESS_TOKEN' };
    return this.httpClient.post(this.apiUrl , data ,{responseType:'text'});
  }
  


}
