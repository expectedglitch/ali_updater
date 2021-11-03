import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

//import { AuthService } from 'projects/ebayali/src/lib/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(public auth:AuthService, private router: Router) { }

  signout(){
    this.auth.signout();
    this.router.navigate(['/login']);
  }
}