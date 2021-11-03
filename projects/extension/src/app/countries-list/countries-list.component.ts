import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'countries-list',
  templateUrl: './countries-list.component.html',
  styleUrls: ['./countries-list.component.css']
})
export class CountriesListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  
  _countriesfree:string[] = [];  

  @Input('countriesfree') set countriesfree(countries: any) {    
    this._countriesfree=countries;    
  };

  get countriesfree(){
    return this._countriesfree;
  }

}
