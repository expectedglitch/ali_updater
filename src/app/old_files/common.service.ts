// import { Injectable } from '@angular/core';
// import { Subject } from 'rxjs';
// //import { AppModule } from '../app.module';
// //import { itemforTransfer } from '../reldb-communication/reldb-communication.component';
// import { metaObj } from './fire-requests.service';

// export interface ident {
//   code: string,
//   country: string
// }

// export interface itemforTransfer {
//   code: string,
//   country: string,
//   modules: any,
//   basic_country: boolean,
//   state: number,
//   time: number  
// }

// @Injectable({
//   providedIn: 'root'
//   //providedIn: AppModule,
// })
// export class CommonService {
  
//   constructor() {
//     // let i=0;
//     // setInterval(()=>{
//     //   i++;
//     //   this.test1$.next(i)
//     // },1000)

//    }

//   // //*********************************** */
//   // i=0;
//   // test() {            
//   //   this.i++;
//   //   this.test1$.next(this.i)    
//   // } 
//   // test1$ = new Subject<number>();
//   //*********************************** */

//   task: string='';
  
//   // _shipOptions: string[] =[];

//   // get shipUpdateOptions(){
//   //   return this._shipOptions;
//   // }
//   // set shipUpdateOptions(mode:any){
//   //   switch (mode){
//   //     case 0: {
//   //       this._shipOptions = this.cntList6;
//   //       break;
//   //     }
//   //     case 1: {
//   //       this._shipOptions = this.cntList12;
//   //       break;
//   //     }
//   //     case 2: {
//   //       this._shipOptions = this.cntList36;
//   //       break;
//   //     }
//   //     case 3: {
//   //       this._shipOptions = this.cntList50;
//   //       break;
//   //     }
//   //   }    
//   // }

//   shipUpdateOptionsChange$ = new Subject<string[]>();
//   selectionEvent$ = new Subject();
//   updateStatusEvent$ = new Subject();

//   shipLastKey$ = new Subject<string>();
//   shipListData$ = new Subject<any>();

  
//   cntList50 = ['AT','AU','BE','BG','BY','CA','CH','CY','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU','ID','IE','IL','IN','IS','IT','JP','KR','LT','LU','LV','MC','NL','NO','NZ','PH','PL','PT','RO','RU','SA','SE','SG','SI','SK','TH','TR','UA','UK','US','VN','ZA'];
//   cntList36 = ['AT','AU','BE','CA','CH','CZ','DE','DK','EE','ES','FI','FR','GR','HR','HU','IE','IL','IN','IS','IT','JP','LT','LU','LV','NL','NO','NZ','PL','PT','SE','SG','SI','SK','TR','UK','US'];
//   cntList12 = ['AU','CA','DE','EE','FI','HR','IL','JP','NO','TR','UK','US'];
//   cntList6 = ['AU','CA','HR','IL','NO','US'];

//   cntNames:{[key:string]:string} ={
//   'AT':	'Austria',
//   'AU':	'Australia111',
//   'BE':	'Belgium',
//   'BG':	'Bulgaria',
//   'BY':	'Belarus',
//   'CA':	'Canada111',
//   'CH':	'Switzerland',
//   'CY':	'Cyprus',
//   'CZ':	'Czech Republic',
//   'DE':	'Germany',
//   'DK':	'Denmark',
//   'EE':	'Estonia',
//   'ES':	'Spain',
//   'FI':	'Finland',
//   'FR':	'France',
//   'GR':	'Greece',
//   'HR':	'Croatia (local name: Hrvatska)111',
//   'HU':	'Hungary',
//   'ID':	'Indonesia',
//   'IE':	'Ireland',
//   'IL':	'Israel111',
//   'IN':	'India',
//   'IS':	'Iceland',
//   'IT':	'Italy',
//   'JP':	'Japan',
//   'KR':	'Korea',
//   'LT':	'Lithuania',
//   'LU':	'Luxembourg',
//   'LV':	'Latvia',
//   'MC':	'Monaco',
//   'NL':	'Netherlands',
//   'NO':	'Norway111',
//   'NZ':	'New Zealand',
//   'PH':	'Philippines',
//   'PL':	'Poland',
//   'PT':	'Portugal',
//   'RO':	'Romania',
//   'RU':	'Russian Federation',
//   'SA':	'Saudi Arabia',
//   'SE':	'Sweden',
//   'SG':	'Singapore',
//   'SI':	'Slovenia',
//   'SK':	'Slovakia (Slovak Republic)',
//   'TH':	'Thailand',
//   'TR':	'Turkey',
//   'UA':	'Ukraine',
//   'UK':	'United Kingdom',
//   'US':	'United States111',
//   'VN':	'Vietnam',
//   'ZA':	'South Africa'
//   }

  
//   setStatus(status:any) {    
//     this.updateStatusEvent$.next(status);
//   }

//   ident(item:any): ident {
//     return {code: item.code, country: item.country}
//   }

//   isRemoved(metaObj: metaObj){
//     return Object.values(metaObj)
//     .sort((a,b) => {return (b.time-a.time)})    
//       .some(x => x.state>0)//we are taking the 'state from the most fresh country object
//   }

//   outdatedElems(metaObj: metaObj) {             
//     return Object.keys(metaObj).filter(cnt=>
//       (new Date().getTime()) - (metaObj[cnt].time?metaObj[cnt].time:0) > 86400000)
//   }

//   getFlatList(l1: {code:string, countries: string[]}[]):ident[] {    
//     let list:any =[];      
//     l1.map(x=>{
//       if (x.countries.length) 
//         x.countries.map(y => list.push({code:x.code,country:y}))  });
//     return list;
//   }

//   splitInPortions (arr:any[], step:number) {        
//     let arr2=[];
//     for (let i=0; i<=arr.length; i+=step){
//         arr2.push(arr.slice(i, i+step))
//     }
//     return arr2;
//   }

//   mergeSlices(prod: itemforTransfer[], task:string) {
//     let mergedProd:{code:string, 
//                 countries:string[], 
//                 modules:{imageModule:{}, titleModule:{}, skuModule:any[], pageModule:{}|string}, 
//                 basic_country:string, 
//                 time:number, 
//                 state: number, 
//                 links: string[]};
                  
//         mergedProd = { code:prod[0].code, 
//                       countries:[], 
//                       modules:{imageModule:prod[0].modules.imageModule, titleModule:prod[0].modules.titleModule, skuModule:[], pageModule:{}}, 
//                       basic_country:'',
//                       time:prod[0].time,
//                       state:prod[0].state,
//                       links:[] };

//         prod.map(item => {      
//           mergedProd.countries.push(item.country);      
//           mergedProd.modules.skuModule.push([item.country, item.modules.skuModule]);
//           if(item.basic_country) mergedProd.basic_country=item.country;
//           if(item.state) {mergedProd.state=item.state; mergedProd.modules.pageModule='removed';}
//           if (item.time<mergedProd.time) mergedProd.time=item.time;
//         })
//         return mergedProd!;
//   }

//   tableData(metaList: any){
//     return Object.keys(metaList).map(code => {           
//       let b_cnt=Object.keys(metaList[code]).find(country => metaList[code][country].basic_country)!;      
//       return {
//         code:code,         
//         basic_country: b_cnt,
//         title: metaList[code][b_cnt]?.title,
//         removed: this.isRemoved(metaList[code])
//       }    
//     })        
//   }

  
// }