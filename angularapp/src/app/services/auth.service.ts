import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { Login } from '../models/login.model';
import { tap } from 'rxjs/operators';
import { UserStoreService } from '../helpers/user-store.service';
import { url } from '../Global/global';
import { VerifyResetToken } from 'src/app/models/verify-reset-password.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public apiUrl = url.apiUrl + "/api"
  constructor(private httpClient: HttpClient, private userStore: UserStoreService) {
  }

  register(user: User): Observable<any> {
    return this.httpClient.post<string>(this.apiUrl + "/register", user, { responseType: 'text' as 'json' });
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


  requestPasswordReset(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.httpClient.post(this.apiUrl+'/reset-password', null, {params} );
  }

  verifyResetToken(token: string, newPassword: string, otp: number, secretKey: string): Observable<any> {
    return this.httpClient.post(this.apiUrl+"/verify-reset-token", {
      token,
      secretKey
    });
  }

}

