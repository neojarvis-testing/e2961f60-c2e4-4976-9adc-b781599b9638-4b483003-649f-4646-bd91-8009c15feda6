import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user : User = {username:'',mobileNumber:'',email:''}
  userId : number = 0;

  constructor(private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
    this.userId = this.authService.getCurrentUserId();
    this.userService.getUserById(this.userId).subscribe(data => {
      if (data) {
        this.user = data;
      }
    });
  }

}