import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { VerifyResetToken } from 'src/app/models/verify-reset-password.model';

@Component({
  selector: 'app-verify-reset-token',
  templateUrl: './verify-reset-token.component.html',
  styleUrls: ['./verify-reset-token.component.css']
})
export class VerifyResetTokenComponent implements OnInit {
    token:string;
    newPassword :string;
    otp : number;
    secretKey : string;

  
  constructor(private authService :AuthService ) { }

  
   onSubmit() {
     this.authService.verifyResetToken(this.token, this.newPassword, this.otp, this.secretKey).subscribe(response => {

    
     });
     }
    


  ngOnInit(): void {
  }

}
