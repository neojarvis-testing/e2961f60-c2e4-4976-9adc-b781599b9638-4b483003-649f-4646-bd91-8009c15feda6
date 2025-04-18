import { Component, OnInit } from '@angular/core';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-userviewfood',
  templateUrl: './userviewfood.component.html',
  styleUrls: ['./userviewfood.component.css']
})

export class UserviewfoodComponent implements OnInit {
  foods: any[] = [];
  searchData: string = '';
  minPrice: number ;
  maxPrice: number = Infinity;
  filteredFoods : any[] = [];
  selectedType : string = 'all';
  popup : boolean = false;
  selectedImage : any = null;
  selectedFood : any;

  loading : boolean = false;

  constructor(private foodService : FoodService) { }

  ngOnInit(): void {
    this.loadFoods();
  }

  
  public loadFoods() {
    this.loading = true;
    this.foodService.getAllFoods().subscribe((data) => {
      console.log(data)
        this.foods = data; 
        console.log(this.foods)
        this.filteredFoods = this.foods
        this.loading = false;
    },
    (error) => {
      console.error('Error fetching food data:', error); 
      this.loading = false;
    }
    );
  }

  filterMenu(type:string){
    this.selectedType = type
    if(type==='all'){
      this.filteredFoods = this.foods
    }else{
      this.filteredFoods = this.foods.filter(food=>food?.foodDescription?.type === type);
    }
  }

  filterFoods(){
    this.filteredFoods = this.foods.filter(food => {
      const matchesType = this.selectedType === 'all' || food.foodDescription.type === this.selectedType;
      const matchesPrice = food.price >= this.minPrice && food.price <= this.maxPrice;
      return matchesType && matchesPrice;
    });
  }

  resetFilters(): void {
    this.selectedType = 'all';
    this.minPrice = 0 ;
    this.maxPrice = Infinity;
    this.filteredFoods = this.foods;
  }

  
  getPhotoUrl(photo): string {
    return `data:image/jpeg;base64,${photo}`;
  }

  preview(food){
    this.selectedImage = food.photo;
    this.selectedFood = {
      foodName: food.foodName,
      description: food.foodDescription.description,
      proteins: food.foodDescription.proteins,
      carbs: food.foodDescription.carbs,
      fats: food.foodDescription.fats,
      calories: food.foodDescription.calories,
      type: food.foodDescription.type,
      categories: food.foodDescription.categories
    };

    this.popup = true;
  }
  closePreview(){
    this.popup=false;
  }
  


}



   





 
