import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../../services/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private $authService: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let headers = new HttpHeaders();
    if (this.$authService.token) {
      headers = headers.set('Authorization', `Bearer ${this.$authService.token}`)
      request = request.clone({headers: headers})
    }

    return next.handle(request);
  }
}
