import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-userviewfood',
  templateUrl: './userviewfood.component.html',
  styleUrls: ['./userviewfood.component.css']
})

export class UserviewfoodComponent implements OnInit {
  foods: Food[] = [];
  searchData: string = '';
  minPrice: number = 0;
  maxPrice: number = Infinity;

  constructor(private foodService : FoodService) { }

  ngOnInit(): void {
    this.loadFoods();
  }

  
  public loadFoods() {
    this.foodService.getAllFoods().subscribe((data) => {
      console.log(data)
        this.foods = data; 
        console.log(this.foods)
    },
    (error) => {
      console.error('Error fetching food data:', error); 
    }
    );
  }

  // public resetFilters() {
  //   this.searchData = '';
  //   this.minPrice = 0;
  //   this.maxPrice = Infinity;
  // }

  // public filteredFoods() {
  //   return this.foods.filter(food =>
  //     food.foodName.toLowerCase().includes(this.searchData.toLowerCase()) &&
  //     food.price >= this.minPrice &&
  //     food.price <= this.maxPrice
  //   );
  // }
}



   





 
