import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Food } from '../models/food.model';
import { url } from '../Global/global';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  public apiUrl = url.apiUrl+"/api/food"
  constructor(private htppClient : HttpClient) { }

  public getAllFoods() : Observable<any>{
    return this.htppClient.get(this.apiUrl);
  }

  public getFoodById(foodId : number) : Observable<any>{
    return this.htppClient.get(this.apiUrl+"/"+foodId);
  }

  public addFood(food : FormData) : Observable<any>{
    return this.htppClient.post(this.apiUrl,food);
  }

  public updateFood(foodId : number, food : Food) : Observable<any>{
    return this.htppClient.put(this.apiUrl+"/"+foodId,food);
  }

  public deleteFood(foodId : number) : Observable<any>{
    return this.htppClient.delete(this.apiUrl+"/"+foodId);
  }
}
