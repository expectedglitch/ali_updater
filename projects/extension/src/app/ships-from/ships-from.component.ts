import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ships-from',
  templateUrl: './ships-from.component.html',
  styleUrls: ['./ships-from.component.css']
})
export class ShipsFromComponent implements OnInit {

  @Input('shipsFrom') shipsFrom: string='';  
  @Output('shipsFromChange') shipsFromChange = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  updateShipsFrom(from:any) {  
    this.shipsFromChange.emit(from.value)
  }


}
