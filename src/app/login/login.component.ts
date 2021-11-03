import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { wrongAuth } from '../services/auth-errors';
//import { wrongAuth } from 'ebayali';
import { AuthService } from '../services/auth.service';
// import { wrongAuth } from 'projects/ebayali/src/lib/auth-errors';
// import { AuthService } from 'projects/ebayali/src/lib/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private auth: AuthService, public router: Router, private route:ActivatedRoute) { }

  ngOnInit() {
    this.auth.signout();
  }

  incorrectCredentials: boolean = false;
  otherAuthError: boolean = false;

  login(f_value:any){    
    this.auth.signin(f_value)      
      .subscribe( () => this.route.queryParamMap.subscribe(resp => this.router.navigate([resp.get('returnUrl') || '/'])),        
        error => {
          if (error instanceof wrongAuth) {
            console.log("User name or Password is incorrect!");
            this.incorrectCredentials = true;
          }
          else {
            console.log("Unknown Error while Authenticating the User!")
            this.otherAuthError = true;
            throw error;
          }
        }
      )          
  }

}
