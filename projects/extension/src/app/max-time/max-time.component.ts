import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'max-time',
  templateUrl: './max-time.component.html',
  styleUrls: ['./max-time.component.css']
})
export class MaxTimeComponent implements OnInit {

  @Input('maxTime') maxTime: number=0;  
  @Output('maxTimeChange') maxTimeChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  updateMaxTime(time:any) {
    this.maxTimeChange.emit(time)
  }

}