
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserStoreService } from 'src/app/helpers/user-store.service';
import { AuthUser } from 'src/app/models/auth-user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent implements OnInit {
userName: any;
userRole: any;

  constructor(private userStore :UserStoreService,private authService :AuthService,private router :Router) { }

  ngOnInit(): void {
    this.loadUserFromLocalStorage();
    this.userStore.user$.subscribe((user:AuthUser | null )=>{
      if(user){
        this.userName = user.name;
        this.userRole = user.role;
      }
    })
  }

  loadUserFromLocalStorage(): void {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
    const user: AuthUser = JSON.parse(storedUser);
    this.userStore.setUser(user);
   }
    }

    logout(){
      this.authService.logout();
      this.router.navigate(['/login']);

    }

}