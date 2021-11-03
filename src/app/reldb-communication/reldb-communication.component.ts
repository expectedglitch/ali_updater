import { environment } from 'src/environments/environment.prod';
//import { ReldbRequestsService } from 'projects/ebayali/src/lib/reldb-requests.service';
import { Component, Input, OnInit, OnDestroy, NgZone } from '@angular/core';
import { CommonService, FireRequestsService, itemforTransfer, ReldbRequestsService } from 'ebayali';
import { combineLatest, concat, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
//import { CommonService, itemforTransfer } from 'projects/ebayali/src/lib/common.service';
//import { FireRequestsService } from 'projects/ebayali/src/lib/fire-requests.service';


// export interface itemforTransfer {
//   code: string,
//   country: string,
//   modules: any,
//   basic_country: boolean,
//   state: number,
//   time: number  
// }

@Component({
  selector: 'app-reldb-communication',
  templateUrl: './reldb-communication.component.html',
  styleUrls: ['./reldb-communication.component.css']
})
export class ReldbCommunicationComponent implements OnInit, OnDestroy {

  constructor(private relDBReq: ReldbRequestsService, private fireReq: FireRequestsService, public common: CommonService, private ngZone: NgZone) { }


  ngOnInit(): void { 
    this.shipOptionSubscription = this.common.shipUpdateOptionsChange$.subscribe(cnts =>this.shipUpdateList=cnts)

    this.shipLastKeySubscription = this.common.shipLastKey$.subscribe(key => this.shipLastKey=key);

    this.shipListDataSubscription = this.common.shipListData$.subscribe(data => {    

      if (data) this.ngZone.run(()=>{      
        let lastKeyInPortion = Object.keys(data).slice(-1)[0];            
        let merged = Object.keys(data).reduce((arr, code) => [...arr, {'code':code, 'shipping':
          Object.keys(data[code]).reduce((obj,cnt) => ({...obj,           
              ...{[cnt]:{country:cnt, name:this.common.cntNames[cnt], freight:{body: {freightResult:data[code][cnt].freightResult}}}}
          }),{})
        } ],[] as any[])
  
        this.relDBReq.uploadShips(merged, environment.rel_host).subscribe(res => {  
          if (res!=='error') {
            this.total+=Object.keys(data).length;        
            this.uploaded+=(<any[]>res).reduce((sum,elem)=>elem.state=='successful'?sum+1:sum,0);        
          } else console.log('Authorization token is either absent or invalid or expired! Please try to sign in again.');
        });
              
        if (lastKeyInPortion!==this.shipLastKey) this.fireReq.getShipData(lastKeyInPortion);
      })

    })
  }

  ngOnDestroy():void {
    if (this.shipOptionSubscription) this.shipOptionSubscription.unsubscribe();
    if (this.shipLastKeySubscription) this.shipLastKeySubscription.unsubscribe();
    if (this.shipListDataSubscription) this.shipListDataSubscription.unsubscribe();
    if (this.relDBSourceSubscription) this.relDBSourceSubscription.unsubscribe();
    if (this.productsForUploadingSubscription) this.productsForUploadingSubscription.unsubscribe();
    if (this.uploadingSubscription) this.uploadingSubscription.unsubscribe();
  }

  @Input('task') task: string = '';

  @Input('metaList') metaList: any;

  shipUpdateList: string[] = this.common.cntList6;

  shipLastKey: string = '';

  uploaded=0;
  total=0;

  shipOptionSubscription: any;
  shipLastKeySubscription: any;
  shipListDataSubscription: any;
  relDBSourceSubscription: any;
  productsForUploadingSubscription: any;
  uploadingSubscription: any;


  getRelDBSources() {
    let sourse$=(this.task=='products'?this.relDBReq.getListOfProductsAndLinks(environment.rel_host):this.relDBReq.getListOfProducts(environment.rel_host));
    if (this.task=='products') this.fireReq.clearProdsData();
    if (this.task=='shipping') this.fireReq.clearShipData();
    this.relDBSourceSubscription = sourse$.subscribe(products => {
              
        if (products!=='error'){
          this.common.splitInPortions(<any[]>products,100).map(prodSeries => 
            this.fireReq.pushItemsToDb(prodSeries.map(prod => ({
                new:true, 
                code:prod.ali_code, 
                value: this.task=='products'?
                    (JSON.parse(prod.countries) as string[]).reduce((obj,cnt)=> 
                          ({...obj, ...{[cnt]:{['basic_country']:cnt==prod.basic_country?true:false }}}),  {}):
                    this.common.cntList50.reduce((obj,cnt) => ({...obj, ...{[cnt]:{['time']:0}}}),  {}),
                links: this.task=='products'?JSON.parse(prod.links):[]
              })), this.task)
          )                  
        } else console.log('Authorization token is either absent or invalid or expired! Please try to sign in again.');
     })
  }

  
  get totalForUpload () {    
    return this.total;
  }

  get successfulUpload () {
    return this.uploaded;    
  }


  upload() {    
    this.total=0;

    let serriesLength=20; //number of PRODUCTS(!) to split the list - so each product contains several country slices.  
    this.uploaded = 0;    

    if (this.task=='products') {            
      this.productsForUploadingSubscription = concat(...this.common.splitInPortions(                          
          Object.keys(this.metaList).map(code =>   ({ code:code, countries: Object.keys((this.metaList)[code]) })   )                   
          .map(prod =>this.common.getFlatList([prod]).map(ident => this.fireReq.getItem(ident, this.metaList[ident.code][ident.country])!))                
          .map(prodArray => combineLatest(prodArray)),serriesLength)
                    .map(serries => forkJoin(serries)))
                            .pipe(
                                  //map (portion => portion.map(prod => this.common.mergeSlices(prod as itemforTransfer[], this.task))),
                                  map (portion => portion.map(prod => this.common.mergeSlices(prod as itemforTransfer[]))),
                                  map (portion => portion.map(prod => ({...prod, ...{links: this.fireReq.links[prod.code]} }) ))
                                  )                  
      .subscribe (portion => {                                                              
            this.uploadingSubscription = this.relDBReq.uploadItems(portion, environment.rel_host)
              .subscribe(res => {
                if (res!=='error'){
                  this.total+=portion.length;
                  this.uploaded+=(<any[]>res).reduce((sum,elem)=>elem.state=='successful'?sum+1:sum,0);                                  
                } else console.log('Authorization token is either absent or invalid or expired! Please try to sign in again.');
              });
      })
    }

    
    if (this.task=='shipping') {       
      this.fireReq.getShipData();     
    }

  }

}