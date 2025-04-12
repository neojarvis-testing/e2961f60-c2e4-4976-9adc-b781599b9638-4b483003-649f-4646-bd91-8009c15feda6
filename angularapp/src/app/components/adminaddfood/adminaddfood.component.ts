import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserStoreService } from 'src/app/helpers/user-store.service';

import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-adminaddfood',
  templateUrl: './adminaddfood.component.html',
  styleUrls: ['./adminaddfood.component.css']
})
export class AdminaddfoodComponent implements OnInit {

  foodForm: FormGroup;
  successMessage : string = '';

  constructor(private foodService: FoodService, private fb: FormBuilder,private userStore : UserStoreService) {

    
  }



  ngOnInit(): void {
    this.foodForm = this.fb.group(
      {
        foodName: this.fb.control("", [Validators.required]),
        price: this.fb.control("", [Validators.required, Validators.min(1)]),
        stockQuantity: this.fb.control("", [Validators.required, Validators.min(1)]),
        photo: this.fb.control(""),
        user:this.fb.group({
          userId: this.fb.control("",Validators.required)
        })
      }
    )
  }

  handleFileChange(event:any){


    let file = null;

  }
  
  addFood(){
    this.foodForm.patchValue({user:{
      userId:this.userStore.authUser.userId
    }})
    this.foodForm.patchValue({photo:"this is my food photo"})
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
