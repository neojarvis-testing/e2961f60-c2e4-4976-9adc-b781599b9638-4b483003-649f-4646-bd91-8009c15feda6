import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { tap } from 'rxjs/operators';
import { UserStoreService } from '../helpers/user-store.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = 'https://ide-ccccfbfebdefbbddcfebfcdbbfbdcfeda.premiumproject.examly.io/proxy/8080/api'
  constructor(private httpClient: HttpClient, private userStore: UserStoreService) {
  }

  register(user: User): Observable<any> {
    return this.httpClient.post(this.apiUrl + "/register", user).pipe(
      tap(registeredUser => {
        console.log("User registered successfully", registeredUser);
      })
    );
  }
  login(credentials: Login): Observable<any> {
    return this.httpClient.post(this.apiUrl + "/login", credentials);
  }
  logout(): void {
    this.userStore.setUser(null);
  }

  isAuthenticated(): boolean {
    return this.userStore.isLoggedIn();
  }
  isAdmin(): boolean {
    const authUser = this.userStore.authUser;
    return authUser?.role === 'ADMIN';
  }
  getCurrentUserId(): number | null {
    const authUser = this.userStore.authUser;
    return authUser ? authUser.userId : null;

  }

  getCustomerName(): string | null {
    const authUser = this.userStore.authUser;
    return authUser?.userName;
  }

}
