import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-adminaddfood',
  templateUrl: './adminaddfood.component.html',
  styleUrls: ['./adminaddfood.component.css']
})
export class AdminaddfoodComponent implements OnInit {

  foodForm: FormGroup;
  successMessage : string = '';

  constructor(private foodService: FoodService, private fb: FormBuilder) {

    
  }



  ngOnInit(): void {
    this.foodForm = this.fb.group(
      {
        foodName: this.fb.control("", [Validators.required]),
        price: this.fb.control("", [Validators.required, Validators.min(1)]),
        stockQuantity: this.fb.control("", [Validators.required, Validators.min(1)]),
        photo: this.fb.control("")
      }
    )
  }

  handleFileChange(event:any){


    let file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64result = reader.result?.toString().split(',')[1];
        this.foodForm.patchValue({ photo: base64result });
        console.log('Base64 String:', base64result);
      };

      reader.readAsDataURL(file); 
    } else {
      console.error('No file selected');
    }
  }
  
  addFood(){
    console.log(this.foodForm.value)
    if(this.foodForm.valid){
      console.log(this.foodForm.value)
      this.foodService.addFood(this.foodForm.value).subscribe(data=>{
        this.successMessage = "Successfully Added!"
      })
    }else{
      alert("Failed to add food");
    }
  }

  closePopUp(){
    this.successMessage = '';
  }

  public get foodName(){
    return this.foodForm.get("foodName");
  }

  public get price(){
    return this.foodForm.get("price");
  }

  public get stockQuantity(){
    return this.foodForm.get("stockQuantity");
  }

  public get photo(){
    return this.foodForm.get("photo");
  }




}
