import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import {Carousel} from 'bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn : boolean = false;
  userId : number;
  isSubmit : boolean = false;

  constructor(private authService : AuthService) { }

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
 
  submit(){
    this.isSubmit = true;
  }

}
