import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn : boolean = false;
  userId : number;

  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    if(this.userId){
      this.isLoggedIn = true;
    }
  }

}
