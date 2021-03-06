import { environment } from 'src/environments/environment.prod';
//import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AuthService } from 'projects/ebayali/src/lib/auth.service';

//import {keys} from 'ebayali'
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class RelDBInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, headers, body, params } = request;
        
    if (url.includes(environment.rel_host+'/api/')){
      console.log('Add Auth Headers interceptor...')
      return next.handle(
          request.clone({
              headers: headers.set('Authtoken','Bearer '+(this.auth.authToken?this.auth.authToken:'')) 
          })
      );
    } else return next.handle(request);

  }              

}












