import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router){}

  canActivate(route:any, state:RouterStateSnapshot) {              
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login'], {queryParams:{returnUrl: state.url}});
      return false;
    }
    return true;
  }
  
}
