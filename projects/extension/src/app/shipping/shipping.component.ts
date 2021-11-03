import { DataService } from './../services/data.service';
import { Component, Input, OnInit } from '@angular/core';
import { FireRequestsService } from 'ebayali';

export interface policy {
  us_cost: number,
  paid_add: number,

}

@Component({
  selector: 'shipping',
  templateUrl: './shipping.component.html',
  styleUrls: ['./shipping.component.css']
})
export class ShippingComponent implements OnInit {
  
  constructor(private fireReq: FireRequestsService,
              public dt: DataService) { }
   
  ngOnInit(): void {
    // this.fireReq.getSettings()
    //   .subscribe(settings=>{
    //     settings.map(
    //       s=>{
    //         if (s.key=='activeMethods')  this._activeMethods = s.payload.val() as any[];
    //         if (s.key=='maxShipTime')  this._maxtime = s.payload.val() as number;
    //         if (s.key=='shipsFrom')  this._shipsfrom = s.payload.val() as string;
    //         if (s.key=='shipUpdateMode')  this._shipupdatemode = s.payload.val() as number;
    //       }
    //     );                
    //   });    
  }

  // @Input('activeMethods') _activeMethods: any[] = [];
  // @Input('maxtime') _maxtime = 0;
  // @Input('shipsfrom') _shipsfrom = '';
  // @Input('shipupdatemode') _shipupdatemode = 12;

  // @Input('activeMethods') _activeMethods: any[] = [];
  // @Input('maxtime') _maxtime = 0;
  // @Input('shipsfrom') _shipsfrom = '';
  // @Input('shipupdatemode') _shipupdatemode = 12;

  @Input('settings') settings: any = {};
    
  


  get shipUpdateMode(){
    //return this._shipupdatemode;
    return this.settings['shipUpdateMode'];
  }
  set shipUpdateMode(mode: number){    
    this.fireReq.pushItemsToDb([{setting:'shipUpdateMode', value:mode}],'settings')
    //this._shipupdatemode = mode;
    this.settings['shipUpdateMode'] = mode;
  }

  get activeMethods(){
    return this.settings['activeMethods'];
    //return this._activeMethods;
  }
  set activeMethods(methods: string[]){      
    this.fireReq.pushItemsToDb([{setting:'activeMethods', value:methods}],'settings')
    this.settings['activeMethods'] = methods;
  }

  get maxtime(){
    return this.settings['maxShipTime'];
  }
  set maxtime(time: number){
    this.fireReq.pushItemsToDb([{setting:'maxShipTime', value:time}],'settings')
    this.settings['maxShipTime'] = time;
  }

  get shipsfrom(){
    return this.settings['shipsFrom'];
  }
  set shipsfrom(from: string){
    this.fireReq.pushItemsToDb([{setting:'shipsFrom', value:from}],'settings')
    this.settings['shipsFrom'] = from;
  }

  get usShCost():number {
    let active = this.active();
    return (this.dt.shipping.find(destination => destination.country=='US')?.result.body.freightResult as any[])
      ?.reduce((min, method) => 
          (this.time(method.time) <= this.maxtime)                
          && active.includes(method.company)  
          && parseFloat(method.freightAmount.value)<min? parseFloat(method.freightAmount.value): min , 10000)
  }

  
  countries(cost: number){              
    let active = this.active();        
    let countries = this.dt.shipping.reduce(
                (countries, destination) => {                   
                    return (destination.result.body.freightResult as any[])?.find(method => {                 
                          let UsShipCostDiff=parseFloat(method.freightAmount.value) - cost;        
                          return (this.time(method.time) <= this.maxtime)                 
                                  && this.compare(destination.country, UsShipCostDiff)
                                  && active.includes(method.company)
                      })? [...countries, destination.country]:countries
                    
                    }, [] );                               
    this.dt.calculatedShipList = countries;    
    return countries;
  }


  compare(destination:string, diff: number){        
    let succ=0;        
    let prices = (this.dt._priceDifferences.find(x=>x.country==destination)?.price_list as any[]).filter(x=>x.from==this.shipsfrom);
    if (!prices) return false;

    for (let i=0; i<prices.length; i++){      
      if ((prices[i].price+diff) <= 0) succ++;                   
    } 

    return (succ/prices.length)>=0.8;
  }


  get allMethods(){   
    let methods: string[] = []; 
    this.dt.shipping.map(destination => (destination.result.body.freightResult as any[])
      ?.map(method =>{
        if (method.sendGoodsCountry==this.shipsfrom && methods.findIndex(x => x==method.company)==-1) methods.push(method.company); 
      })                      
    )
    return methods;
  }


  time(time:string) {
    return parseInt(time.substr(time.indexOf('-')+1));
  }

  active() {
    let allMethods = this.allMethods;
    return allMethods.filter(x=>this.activeMethods.includes(x));
  }

}