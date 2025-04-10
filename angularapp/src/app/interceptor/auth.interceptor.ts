import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserStoreService } from '../helpers/user-store.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userStoreService: UserStoreService) {}
 
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userStoreService.authUser?.token;
 
    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(clonedReq);
    }
 
    return next.handle(req);
  }
}
