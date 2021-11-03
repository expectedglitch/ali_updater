import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'countries-update',
  templateUrl: './countries-update.component.html',
  styleUrls: ['./countries-update.component.css']
})
export class CountriesUpdateComponent implements OnInit {

  @Input('shipUpdateMode') shipUpdateMode: number = 0;  
  @Output('shipUpdateModeChange') shipUpdateModeChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  SetShipUpdateMode(from:any) {    
    this.shipUpdateModeChange.emit(from.value)
  }


}
