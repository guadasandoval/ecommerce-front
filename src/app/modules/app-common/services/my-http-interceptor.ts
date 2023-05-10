import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthServiceService } from './auth-service.service';


@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
 
  constructor(private authService: AuthServiceService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = request.headers;
    if (this.authService.authorization != null) {
      headers = headers.set('Authorization', `Bearer ${this.authService.authorization}`);
    }
    const authReq = request.clone({
      headers,
    });
    // Send the newly created request
    return next.handle(authReq).pipe(
      catchError((error, caught) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.authService.logout(true);
            setTimeout(() => this.router.navigateByUrl(`/login?url=${this.router.url}`), 0);
            return EMPTY;
          }
        }
        return throwError(error);
      }) as any,
    );
  }
}
