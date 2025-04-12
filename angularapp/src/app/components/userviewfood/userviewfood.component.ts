import { Component, OnInit } from '@angular/core';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-userviewfood',
  templateUrl: './userviewfood.component.html',
  styleUrls: ['./userviewfood.component.css']
})

export class UserviewfoodComponent implements OnInit {
  foods: any[] = [];
  searchData: string = '';
  minPrice: number = 0;
  maxPrice: number = Infinity;

  constructor(private foodService : FoodService) { }

  ngOnInit(): void {
    this.loadFoods();
  }

  
  public loadFoods() {
    this.foodService.getAllFoods().subscribe((data) => {
        this.foods = data; 
      },
      (error) => {
        console.error('Error fetching food data:', error); 
      }
    );
  }

  public resetFilters() {
    this.searchData = '';
    this.minPrice = 0;
    this.maxPrice = Infinity;
  }

  public  filteredFoods() {
    return this.foods.filter(food =>
      food.name.toLowerCase().includes(this.searchData.toLowerCase()) &&
      food.price >= this.minPrice &&
      food.price <= this.maxPrice
    );
  }
}



   





 
