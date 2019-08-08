import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token = '';
  constructor() {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.token = localStorage.getItem('access_token');
    if (this.token !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: localStorage.getItem('access_token')
        }
      });
    }
    return next.handle(request);
  }
}
