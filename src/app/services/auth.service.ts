import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { authError, wrongAuth } from '../auth-errors';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription, interval } from 'rxjs';

@Injectable({
  providedIn: 'root'  
})
export class AuthService {  

  constructor(private http: HttpClient, private router: Router) {     
  }

  tokenSubscription = new Subscription();
  jwtHelper = new  JwtHelperService();

  get authToken(){    
    return <string>localStorage.getItem('authToken');
  }

  set authToken(token: string){
    localStorage.setItem('authToken',token);
  }

  signout() {
    localStorage.removeItem('authToken');
    this.tokenSubscription.unsubscribe();
  }

  signin(form_value:any){        
    return this.http.post<string>(environment.rel_host+"/authentication.php", form_value, {observe: 'response'})
      .pipe(
        map(response => {                
          this.authToken=response.body!;                                          
          return true;
        }),
        catchError((error:HttpErrorResponse) => {          
          if (error.status == 401) throw(new wrongAuth());
          throw(new authError());
        })
      )
  }

  get isLoggedIn() {
    if (this.authToken) return !this.jwtHelper.isTokenExpired(this.authToken);    
    return false;
  }

  get userName() {
    if (this.authToken) return this.jwtHelper.decodeToken(this.authToken).username;
    return false;
  }

  countDown(){
    let expTimeStamp=this.jwtHelper.decodeToken(this.authToken).exp;
    return interval(1000).pipe(
      map(_=>{
        let totalSeconds = Math.floor(expTimeStamp-Date.now()/1000);

        if (totalSeconds<=0) {
          this.signout();
          this.router.navigate(['/login']);
        }

        let hours = Math.floor(totalSeconds/3600);
        let minutes = Math.floor((totalSeconds - hours*3600)/60);
        let seconds = totalSeconds - hours*3600 - minutes*60;
        let expiring = totalSeconds>300?false:true;
        return {hours:hours,
                minutes:minutes,
                seconds:seconds, 
                expiring: expiring};
      })
  )}

}