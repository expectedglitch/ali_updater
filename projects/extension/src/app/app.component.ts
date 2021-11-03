import { CommonService, AliRequestsService, FireRequestsService } from 'ebayali';
import { DataService } from './services/data.service';
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

//export interface dtState {is:boolean}
export interface dataProvided {[key:string]: boolean}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'extension';

  constructor(private aliReq: AliRequestsService, public dt: DataService, public common: CommonService, private fireReq: FireRequestsService) { }

  //-----fake--------------------
  //tab_url='https://www.aliexpress.com/item/4001111972047.html';  
  tab_url='https://www.aliexpress.com/item/32564035920.html';    
  //tab_url='https://www.aliexpress.com/item/4001090133801.html';    
  
  //-----fake--------------------

  countries: string[] = [];
    
  dataProvided: dataProvided = {'product':false, 'shipping':false}

  shippingVisible = false;

  existingPolicy: any[] = [];

  settings: any = {};

  ngOnInit() {
    this.countries=this.common.cntList50;
              
    // chrome.runtime.onMessage.addListener(                                   //
    //   request => {                                                          //
    //       this.ngZone.run(()=>{                                             //
    //                                                                         //
    //         if (request.message === "tab_url" ) {                           //                
    //           this.tab_url=request.url;                                     //    
    
    this.fireReq.getShipPolicy(this.code).subscribe(x => this.existingPolicy = x)

    this.fireReq.getSettings()
      .subscribe(settings => this.settings=settings.reduce((obj, s) => ({...obj, ...{[s.key!]:s.payload.val()}}), {}))
 
    this.fillData('aliItems');
    this.fillData('aliShips');    
          
    //               }                                                                //
    //                                                                                //
    //       })                                                                       //
    // })                                                                             //
    //                                                                                //    
    // chrome.runtime.sendMessage({"message": "get_tab_url"});                        //
  }
  
  
  fillData(par: string) {
    let idents=this.countries.map(cnt=>({code:this.code, country:cnt}));        
    let dtArr=(par=='aliShips'?this.dt.shipping:this.dt.product);
    let parTask=(par=='aliShips'?'shipping':'product');

    this.fireReq.getList(par).subscribe(meta => {
        let outdated = this.common.outdatedElems((meta as any)[this.code]);      
        this.fireReq.getOne(this.code, par).subscribe(cnts=> {                 
            dtArr.splice(0, dtArr.length)
            if (cnts.length) {
                cnts.map(cnt => {                                     
                    dtArr.push( {code: this.code, 
                                 country:cnt.key, 
                                 result: par=='aliShips'?{body:cnt.payload.val()}:cnt.payload.val() })                  
                    this.common.updateStatusEvent$.next( {
                        task: parTask, 
                        status: {...{code:this.code, country: cnt.key}, msg: outdated.includes(cnt.key!)?"from_firebase_outdated":"from_firebase", type:'OK'} 
                    } )                                    
                })                                                        
                if (par=='aliItems') this.dt.priceDifferences();            
                this.dataProvided[parTask]=true;
                console.log(par+' data is taken from firebase')                
            } else {                         
                this.dataBridge(idents, parTask);             
            }        
        });  
    })
  }


  dataBridge(idents: any[], task: string) {   
      console.log('bridge!')         
      let got_errors=false;
      let successful: any[] = [];
      this.aliReq.getElems(idents, task, environment.ali_key)      
        .subscribe(series => {
              (<any[]>series).forEach(item => {   
                    console.log('subscribe inside bridge!')                           
                    if (!item.err_status) {
                        successful.push(item);        
                    }
                    else {
                        got_errors=true;
                        this.common.updateStatusEvent$.next( {task: task, status: {...this.common.ident(item), msg: "other_error_from_Ali", type:'err'} } )
                        console.log ( `\n ERROR! Code: ${item.code}, \n Country: ${item.country}, \n Status: ${item.err_status}, \n Message: ${item.message}, \n url: ${item.url}` );                                  
                    }
                    
              });
              if (task=='product') this.dt.priceDifferences();                     
              this.dataProvided[task]=!got_errors;
              this.fireReq.pushItemsToDb(successful, task=='product'?'products':'shipping');
        },                      
          err => console.log(err)            
        );    
  }

  nextStep() {
    this.shippingVisible=true;    
  }

  saveListing() {    
    let existingShipList = this.existingPolicy.find(x=>x.key=='countries')?.payload.val();        

    if (JSON.stringify(existingShipList)!==JSON.stringify(this.dt.calculatedShipList)) {
    
        this.fireReq.pushItemsToDb([{
          code: this.code,
          time: new Date().getTime(),
          countries:this.dt.calculatedShipList
        }],'listing');
    }
  }

  get code() {    
    return this.tab_url.substring(32,this.tab_url.search('.html'));
  }

  fixes(fixes: any) {    
    this.dataBridge(fixes.list, fixes.task);                  
  }

}