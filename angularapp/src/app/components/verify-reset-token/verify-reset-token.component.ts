import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { VerifyResetToken } from 'src/app/models/verify-reset-password.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verify-reset-token',
  templateUrl: './verify-reset-token.component.html',
  styleUrls: ['./verify-reset-token.component.css']
})
export class VerifyResetTokenComponent implements OnInit {
  token: string;
  newPassword: string;
  otp: number;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) { }

  onSubmit() {
    const resetPassword = {
      token: this.token,
      newPassword: this.newPassword,
      otp: this.otp
    };

    this.authService.verifyResetToken(resetPassword).subscribe({
      next: (response) => {
        setTimeout(() => {
          alert("Password Changed Successfully");
          this.router.navigate(['/login']);
        }, 1500);
        console.log("Password reset successfully");
      },
      error: (error) => {
        if (error.status === 400) {
          this.errorMessage = "Invalid Token: " + error.error;
        } else if (error.status === 410) {
          this.errorMessage = "Token Expired: " + error.error;
        } else if (error.status === 403) {
          this.errorMessage = "Invalid OTP: " + error.error;
        } else {
          this.errorMessage = "An unexpected error occurred. Please try again later.";
        }
        console.error("Error resetting password:", error);
      }
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  cancel(){
    this.router.navigate(['/login']);
  }
}
