import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { orders } from '../models/orders.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl:string = "https://ide-fbcaaeabbdebdefbbddcfebfcdbbfbdcfeda.premiumproject.examly.io/proxy/8080/api/orders"

  constructor(private httpClient:HttpClient) { }

  placeOrder(order:orders):Observable<any>{
    return this.httpClient.post(this.apiUrl,order);
  }

  getAllOrders():Observable<any>{
    return this.httpClient.get(this.apiUrl);
  }

  getOrderById(orderId:number):Observable<any>{
    return this.httpClient.get(this.apiUrl+'/'+orderId);
  }

  getAllOrdersByUserId(userId:number):Observable<any>{
    return this.httpClient.get(this.apiUrl+'/'+userId);
  }

  updateOrder(orderId:number,order:orders):Observable<any>{
    return this.httpClient.put(this.apiUrl+'/'+orderId,order);
  }

  deleteOrder(orderId:number):Observable<any>{
    return this.httpClient.delete(this.apiUrl+'/'+orderId);
  }


}
