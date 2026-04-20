import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';
import {inject} from '@angular/core';

export const authInterceptor: HttpInterceptorFn =
  (req:HttpRequest<any>,
   next:HttpHandlerFn): Observable<HttpEvent<any>> => {

    const cookieService = inject(CookieService);
    const token = cookieService.get('token');

    if (!token) {
      return next(req);
    }

    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next(cloned);
  };
