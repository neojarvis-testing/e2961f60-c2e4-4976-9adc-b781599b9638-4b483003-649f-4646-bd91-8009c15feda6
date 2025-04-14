import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-request-password-reset',
  templateUrl: './request-password-reset.component.html',
  styleUrls: ['./request-password-reset.component.css']
})
export class RequestPasswordResetComponent implements OnInit {

  email:string;
  constructor(private authService : AuthService) { }

  onSubmit(){
    this.authService.requestPasswordReset(this.email).subscribe(response=>{
      console.log("sent successfuly")
    });
  }
  ngOnInit(): void {
  }

}
