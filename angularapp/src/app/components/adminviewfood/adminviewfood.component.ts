import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-adminviewfood',
  templateUrl: './adminviewfood.component.html',
  styleUrls: ['./adminviewfood.component.css']
})
export class AdminviewfoodComponent implements OnInit {
  foods: any[] = [];
  filteredFoods: any[] = [];
  searchName: string = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;
  foodId: number = 1;

  constructor(private foodService: FoodService, private router: Router) { }

  ngOnInit(): void {
    this.loadfood();
  }

  loadfood() {
    this.foodService.getAllFoods().subscribe((data) => {
      this.foods = data;
      console.log(data);
      this.filteredFoods = data;
    },
      (error) => {
        console.error('Error fetching food details:', error);
      }
    );
  }
  public filterFoods(): void {
    this.filteredFoods = this.foods.filter((food) => {
      const matchesName = food.name.toLowerCase().includes(this.searchName.toLowerCase());
      const matchesPrice =
        (this.minPrice === null || food.price >= this.minPrice) &&
        (this.maxPrice === null || food.price <= this.maxPrice);
      return matchesName && matchesPrice;
    });
  }

  public resetFilters(): void {
    this.searchName = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.filteredFoods = [this.foods];
  }

  confirmDelete(foodId: number): void {
    const confirmation = window.confirm('Are you sure you want to delete this food item?');

    if (confirmation) {
      this.foodService.deleteFood(foodId).subscribe(response => {
        this.loadfood();
      },
        error => {
          console.error('Error occurred while deleting food:', error);
        }
      );
    } else {
      console.log('Deletion cancelled');
    }
  }

}



























