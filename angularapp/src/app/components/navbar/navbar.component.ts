import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { AuthUser } from 'src/app/models/auth-user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userName:string="";
  userRole:string="";
  isLoggedIn = false;
  constructor(private userStore :UserStoreService,private authService :AuthService,private router :Router) { }

  ngOnInit(): void {
    this.loadUserFromLocalStorage();
    this.userStore.user$.subscribe((user: AuthUser | null) => {
      if (user) {
        this.isLoggedIn = true;
        this.userName = user.name;
        this.userRole = user.role;
      } else {
        this.isLoggedIn = false;
        this.userName = '';
        this.userRole = '';
      }
    });
  }
  

  
    loadUserFromLocalStorage(): void {
     const storedUser = localStorage.getItem('authUser');
     if (storedUser) {
     const user: AuthUser = JSON.parse(storedUser);
     this.userStore.setUser(user);
    }
     }

    
  public logout(){
    this.authService.logout();
    this.isLoggedIn=false;
    this.userName = '';
    this.userRole = '';
    // this.cdRef.detectChanges();
    this.router.navigate(['/login']);
  }

  updateUserState(){
    this.isLoggedIn = this.userStore.isLoggedIn();
    this.userName = this.userStore.authUser?.name;
    this.userRole = this.userStore.authUser?.role;
  }

}
