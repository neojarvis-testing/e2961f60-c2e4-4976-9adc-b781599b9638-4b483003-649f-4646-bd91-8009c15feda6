import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Food } from 'src/app/models/food.model';
import { FoodService } from 'src/app/services/food.service';

@Component({
  selector: 'app-admineditfood',
  templateUrl: './admineditfood.component.html',
  styleUrls: ['./admineditfood.component.css']
})
export class AdmineditfoodComponent implements OnInit {
  editForm : FormGroup;
  successMessage : string = '';
  foodId : number = 3;
  food : Food = {foodName:"",price:0,stockQuantity:0,userId:1}

  constructor(private foodService : FoodService, private fb: FormBuilder, private router:Router) { 
    this.editForm = this.fb.group({
      foodName : this.fb.control("",Validators.required),
      price: this.fb.control("",[Validators.required, Validators.pattern('^[0-9]*$')]),
      stockQuantity: this.fb.control("",[Validators.required, Validators.pattern('^[0-9]*$')])
    });
  }

  ngOnInit(): void {
      this.foodService.getFoodById(this.foodId).subscribe((data: any) => {
        console.log(data);
        this.editForm.patchValue(data);
      });
    }

  onSubmit(): void {
    if (this.editForm.valid) {
     
      console.log('Form Submitted', this.editForm.value);
      this.foodService.updateFood(this.foodId,this.editForm.value).subscribe(data=>{
        console.log("after update")
        this.successMessage = "Successfully updated!"
        this.router.navigate(['/admin/view/food']);
      })
    } else {
      console.log('Form Invalid');
    }
  }

  
  onBack(): void {
    this.router.navigate(['/admin/view/food']);
  }

  public get foodName(){
    return this.editForm.get("foodName");
  }

  public get price(){
    return this.editForm.get("price");
  }

  public get stockQuantity(){
    return this.editForm.get("stockQuantity");
  }

}


  

