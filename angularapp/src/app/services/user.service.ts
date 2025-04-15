import { Injectable } from '@angular/core';
import { url } from '../Global/global';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public apiUrl = url.apiUrl + "/api";
  constructor(private httpClient: HttpClient){}

  getUserById(id:number):Observable<any>{
    return this.httpClient.get(this.apiUrl+"/user/"+id);
  }

  updateUser(id:number,user:User):Observable<any>{
    return this.httpClient.put(this.apiUrl+"/user/update/"+id,user);
  }
}
