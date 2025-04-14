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
        })
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
      user: { userId: this.foodForm.get('user.userId')?.value }
  };

  const formData = new FormData();
  if (this.selectedFile) {
      formData.append('photo', this.selectedFile);
  }
  formData.append('food', new Blob([JSON.stringify(foodData)], { type: 'application/json' }));

  if (this.foodForm.valid) {
      console.log(this.foodForm.value);
      this.foodService.addFood(formData).subscribe(data => {
          this.successMessage = "Successfully Added!";
          setTimeout(() => {
              this.router.navigate(['/admin/view/food']);
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




}
