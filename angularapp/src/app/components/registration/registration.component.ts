import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm :FormGroup
  user:User={email:"",password:"",username:"",mobileNumber:"",userRole:""}
  constructor(private authService:AuthService,private fb :FormBuilder, private router :Router) { 
    this.registrationForm = this.fb.group({
    //userId : fb.control("",Validators.required),
    email : fb.control("",[Validators.required,Validators.email]),
    password : fb.control("",[Validators.required,Validators.pattern('^(?=.*[A-Z])(?=.*\\d)[A-Za-z\\d]{8,}$')]),//Contains at least one uppercase letter ,Contains at least one digit,Is at least 8 characters long
    username : fb.control("",Validators.required),
    mobileNumber : fb.control("",[Validators.required,Validators.pattern('[0-9]{10}$')]),
    userRole : fb.control("",Validators.required)
    })
  }
  


  ngOnInit(): void {
  }

addRegister(){
  if(this.registrationForm.valid){
    console.log(this.registrationForm.value);
    this.authService.register(this.registrationForm.value).subscribe(data=>{
      this.router.navigate(['/login'])
      
    })
  }
}

}