import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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
  foodId: number;
  showPopup: boolean = false;
  showSuccessPopup: boolean = false; // Addition: Controls visibility of success popup
  successMessage: string = ''; 

  showPreview: boolean = false;
  selectedImage: any = null;
  selectedFood: any = null;

  constructor(private foodService: FoodService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.loadfood();
  }

  loadfood() {
    this.foodService.getAllFoods().subscribe((data) => {
      this.foods = data.map(food => ({
        ...food,
        photo: food.photo ? this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + food.photo) : null
        
      }));
      console.log("after deleting food updating filtered foods array")
      this.filteredFoods = this.foods;
      console.log(this.foods)
    }, error => {
      this.foods=[];
      this.filteredFoods = [];
      console.error('Error fetching food details:', error);
    });
  }


  public filterFoods(): void {
  this.filteredFoods = this.foods.filter((food) => {
    const matchesName = food.foodName.toLowerCase().includes(this.searchName.toLowerCase());
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
  this.loadfood();
}



confirmDelete(id: number): void {
  this.showPopup = true;
  this.foodId = id;

}

onConfirm(): void {
  this.foodService.deleteFood(this.foodId).subscribe(
    (response) => {
      this.loadfood();
      this.showPopup = false; // Close the delete confirmation popup
      this.successMessage = 'Food item successfully deleted.'; // Set success message
      this.showSuccessPopup = true; // Show success popup
    },
    (error) => {
      console.error('Error occurred while deleting food:', error);
      this.foods = [];
      this.filteredFoods = [];
    }
  );
}

onCancel(): void {
  this.showPopup = false;
  console.log('Deletion cancelled');
}

closeSuccessPopup(): void {
  this.showSuccessPopup = false; // Close the success popup
}

  // Show preview for the selected food image
  // openPreview(image: any): void {
  //   this.selectedImage = image;
  //   this.showPreview = true;
  // }

  openPreview(food: any,image: any): void {
    console.log(food)
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
    this.showPreview = true;
  }
  

  closePreview(): void {
    this.showPreview = false;
    this.selectedImage = null;
  }

}



























