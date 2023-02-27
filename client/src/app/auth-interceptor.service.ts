import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const token = JSON.parse(localStorage.getItem("TOKEN") as string);

    if(token){
      const clone = req.clone({
        headers: req.headers.set("Authorization",
          "Bearer "+token.token)
      });

      return next.handle(clone);
    }else{
      return next.handle(req);
    }
  }
}
