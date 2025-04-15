import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Carousel} from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { EmailService } from 'src/app/services/email.service';
import { Email } from 'src/app/models/email.model';




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn : boolean = false;
  userId : number;
  isSubmit : boolean = false;

  emailData: Email={
    name:'',
    email:'',
    message:''
  };

  constructor(private authService : AuthService , private emailService:EmailService) { }

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    if(this.userId){
      this.isLoggedIn = true;
    }
    
  }

  ngAfterViewInit(): void {
    const carouselElement = document.getElementById('carousel-example-generic');
    if (carouselElement) {
      new Carousel(carouselElement);
      console.log('Bootstrap carousel initialized');
    }
  }
 
  onSubmit(){
    this.emailService.sendEmail(this.emailData).subscribe({
     
      next:(response) =>{
        console.log(this.emailData)
        alert(response);
        this.emailData = {name:'',email:'',message:''};
      },
      error:(error) =>{
        alert('Failed to send Email please try again....');
        console.log(error);
      }
    })
  }

}
