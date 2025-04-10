import { Component, OnInit } from '@angular/core';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { AuthUser } from 'src/app/models/auth-user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName:string="";
  userRole:string="";
  constructor(private userStore :UserStoreService) { }

  ngOnInit(): void {
    localStorage.getItem("authUser")
    this.userStore.user$.subscribe((user:AuthUser)=>{
      if(user){
        this.userName = user.userName;
        this.userRole = user.role
      }
    })
  }


}
