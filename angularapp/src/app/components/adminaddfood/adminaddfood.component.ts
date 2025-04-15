import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';

import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-adminaddfood',
  templateUrl: './adminaddfood.component.html',
  styleUrls: ['./adminaddfood.component.css']
})
export class AdminaddfoodComponent implements OnInit {

  foodForm: FormGroup;
  successMessage: string = '';
  selectedFile: File | null = null;
  categoriesArray: string[] = ["Chineese", "Italian", "North Indian","South Indian","Gujarati","Punjabi","Bengali"]

  constructor(private foodService: FoodService, private fb: FormBuilder, private userStore: UserStoreService, private router: Router) {


  }



  ngOnInit(): void {
    this.foodForm = this.fb.group(
      {
        foodName: this.fb.control("", [Validators.required]),
        price: this.fb.control("", [Validators.required, Validators.min(1)]),
        stockQuantity: this.fb.control("", [Validators.required, Validators.min(1)]),
        photo: this.fb.control(""),
        user: this.fb.group({
          userId: this.fb.control("", Validators.required)
        }),
        description: this.fb.control("", [Validators.required]),
        proteins: this.fb.control("", [Validators.required, Validators.min(0)]),
        carbs: this.fb.control("", [Validators.required, Validators.min(0)]),
        fats: this.fb.control("", [Validators.required, Validators.min(0)]),
        calories: this.fb.control("", [Validators.required, Validators.min(0)]),
        type: this.fb.control("", [Validators.required]),
        categories: this.fb.control("", [Validators.required])
      }
    )
  }

  handleFileChange(event: any) {

    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }



  addFood() {
    this.foodForm.patchValue({
      user: {
        userId: this.userStore.authUser.userId
      }
    });

    const foodData = {
      foodName: this.foodForm.get('foodName')?.value,
      price: this.foodForm.get('price')?.value,
      stockQuantity: this.foodForm.get('stockQuantity')?.value,
      user: { userId: this.foodForm.get('user.userId')?.value },
      foodDescription: {
        description: this.foodForm.get('description')?.value,
        proteins: this.foodForm.get('proteins')?.value,
        carbs: this.foodForm.get('carbs')?.value,
        fats: this.foodForm.get('fats')?.value,
        calories: this.foodForm.get('calories')?.value,
        type: this.foodForm.get('type')?.value,
        categories: this.foodForm.get('categories')?.value,
      }

    };

    const formData = new FormData();
    if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
    }
    formData.append('food', JSON.stringify(foodData));

    if (this.foodForm.valid) {
      console.log(formData);
      this.foodService.addFood(formData).subscribe(data => {
        this.successMessage = "Successfully Added!";
        setTimeout(() => {
          this.router.navigate(['/admin/view/foods']);
        }, 2222);
      }, error => {
        console.error("Error adding food:", error);
        alert("Failed to add food");
      });
    } else {
      alert("Form is invalid. Please check your inputs.");
    }
  }

  closePopUp() {
    this.successMessage = '';
  }

  public get foodName() {
    return this.foodForm.get("foodName");
  }

  public get price() {
    return this.foodForm.get("price");
  }

  public get stockQuantity() {
    return this.foodForm.get("stockQuantity");
  }

  public get photo() {
    return this.foodForm.get("photo");
  }

  public get description() {
    return this.foodForm.get("description");
  }

  public get proteins() {
    return this.foodForm.get("proteins");
  }

  public get carbs() {
    return this.foodForm.get("carbs");
  }

  public get fats() {
    return this.foodForm.get("fats");
  }

  public get calories() {
    return this.foodForm.get("calories");
  }

  public get type() {
    return this.foodForm.get("type");
  }

  public get categories() {
    return this.foodForm.get("categories");
  }


}