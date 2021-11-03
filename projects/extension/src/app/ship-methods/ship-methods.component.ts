import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'ship-methods',
  templateUrl: './ship-methods.component.html',
  styleUrls: ['./ship-methods.component.css']    
})
export class ShipMethodsComponent implements OnInit {

  
  @Input() methods: string[]=[];

  @Input('activeMethods') activeMethods: string[]=[];  
  @Output('activeMethodsChange') activeMethodsChange = new EventEmitter();

  constructor() { }

  _activeMethods: string[] = [];

  ngOnInit(): void {
  }
  
  updateMethods(list:any) {        
    let diff=this.activeMethods.filter(x=>!this.methods.includes(x));
    this.activeMethodsChange.emit(diff.concat(list.value));        
  }

}
