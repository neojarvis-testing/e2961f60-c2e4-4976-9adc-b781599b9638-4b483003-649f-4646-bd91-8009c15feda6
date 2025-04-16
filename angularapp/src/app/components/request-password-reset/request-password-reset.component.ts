import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.css']
})
export class RequestPasswordResetComponent implements OnInit {

  email:string;
  errorCode : number = null
  constructor(private authService : AuthService ,private router : Router) { }

  onSubmit() {
    this.authService.requestPasswordReset(this.email).subscribe({
      next: (response) => {
        console.log(response);
        console.log("Password reset request sent successfully.");
        this.router.navigate(['verify-reset-token']);
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorCode = 404; 
        } else if (error.status === 400) {
          this.errorCode = 400;
        } else {
         alert("An error occurred. Please try again later.");
        }
        console.error("Error resetting password:", error);
      }
    });
  }
  ngOnInit(): void {
  }

  cancel(){
    this.router.navigate(['/login'])
  }

}
