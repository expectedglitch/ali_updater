import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

//import { AuthService } from 'projects/ebayali/src/lib/auth.service';

interface clock {
  hours: number,
  minutes: number,
  seconds: number,
  expiring: boolean
}

@Component({
  selector: 'count-down',
  templateUrl: './count-down.component.html',
  styleUrls: ['./count-down.component.css']
})
export class CountDownComponent implements OnInit {

  constructor(private auth: AuthService) { }

  time$ = new Observable<clock>();

  ngOnInit(): void {    
    this.time$ = this.auth.countDown();
  }

}
