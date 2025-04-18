import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { AuthUser } from 'src/app/models/auth-user.model';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  successMessage :string="";
  errorMessage:string=''
  showResetLink = false;
  constructor(private fb : FormBuilder,private authService : AuthService,private router :Router,private userStore :UserStoreService) {
    this.loginForm = this.fb.group({
      email: fb.control("",[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
      password : fb.control("",Validators.required)
    })
   }

  ngOnInit(): void {
  }

  loginUser() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (user: any) => {
          this.userStore.setUser(user);
          console.log(user);
          this.redirectBasedOnRole();
        },
        error: (err: any) => {
          if (err.status === 401) {
            this.errorMessage = "Invalid Credentials! Please Try Again.";
          } else {
            this.errorMessage = "An unexpected error occurred. Please try again later.";
          }
          console.log("Login Error", err);
        }
      });
    }
  }
    
  

  redirectBasedOnRole(){
    if(this.userStore.authUser.role == "ROLE_ADMIN"){
      this.router.navigate(['/admin/dashboard'])
    }
    else if(this.userStore.authUser.role =="ROLE_USER"){
      this.router.navigate(['/user/view/foods']);
    }
    else{
      this.router.navigate(['home']);
    }
  }
}



