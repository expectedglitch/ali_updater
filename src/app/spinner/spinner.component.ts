import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit(): void {
    console.log('spinner start='+Date.now());
  }

  ngOnDestroy() {
    console.log('spinner finish='+Date.now());
  }

}
