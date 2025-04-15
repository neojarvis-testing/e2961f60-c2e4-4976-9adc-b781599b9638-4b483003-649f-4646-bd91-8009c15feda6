import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { VerifyResetToken } from 'src/app/models/verify-reset-password.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-reset-token',
  templateUrl: './verify-reset-token.component.html',
  styleUrls: ['./verify-reset-token.component.css']
})
export class VerifyResetTokenComponent implements OnInit {
    token:string;
    newPassword :string;
    otp : number;
  
  constructor(private authService :AuthService,private activatedRoute : ActivatedRoute ) { }

  
   onSubmit() {
    const resetPassword = {
      token : this.token,
      newPassword : this.newPassword,
      otp : this.otp
    }
     this.authService.verifyResetToken(resetPassword).subscribe(response => {

      console.log("Password reset successfully")
     });
     }
    


  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe(params => {
      this.token = params['token']; 
    });
  }

}
