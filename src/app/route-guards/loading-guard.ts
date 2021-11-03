import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';

//import { AuthService } from 'projects/ebayali/src/lib/auth.service';

@Injectable({
  providedIn: 'root'
})

export class LoadingGuard implements CanLoad{

  constructor(private auth:AuthService, private router: Router) { }
      
    canLoad(route: Route, segments: UrlSegment[]) {
    if (!this.auth.isLoggedIn) {
      this.router.navigate(['/login'], {queryParams:{returnUrl: route.path}});
      return false;    
    }
    return true;
  }

}