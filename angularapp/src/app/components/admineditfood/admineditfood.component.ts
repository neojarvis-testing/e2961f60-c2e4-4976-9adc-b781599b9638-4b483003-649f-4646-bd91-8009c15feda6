import { Component, OnInit } from '@angular/core';
import { FormBuilder,  FormGroup,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  foodId : number = 0;
  food : Food = {
    foodName: "", price: 0, stockQuantity: 0, userId: 1,
    user: undefined
  }

  constructor(private foodService : FoodService, private fb: FormBuilder, private router:Router,private activatedRouter : ActivatedRoute) { 
    this.editForm = this.fb.group({
      foodName : this.fb.control("",Validators.required),
      price: this.fb.control("",[Validators.required, Validators.pattern('^[0-9]*$')]),
      stockQuantity: this.fb.control("",[Validators.required, Validators.pattern('^[0-9]*$')]),
      photo:this.fb.control('')
    });
    
  }

  ngOnInit(): void {

      this.activatedRouter.paramMap.subscribe(data=>{
        this.foodId = parseInt(data.get("id"));
      })
    
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
        this.router.navigate(['/admin/view/foods']);
      })
    } else {
      console.log('Form Invalid');
    }
  }

  
  onBack(): void {
    this.router.navigate(['/admin/view/foods']);
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


  

