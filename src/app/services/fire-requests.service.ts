import { AngularFireDatabase } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { CommonService, ident } from './common.service';
import { itemforTransfer } from '../reldb-communication/reldb-communication.component';
import { Observable } from 'rxjs';


export interface metaObj {
  [key: string]: {
    time: number;
    state: number;
    title: string;
    basic_country: boolean;
  }
}

export interface prod {
    basic_country: string;
    countries: string[];
    code: string;   
    title: string;    
}


@Injectable({
  providedIn: 'any'
})
export class FireRequestsService {     

  links: any = {};
   
  constructor(public db: AngularFireDatabase, private common: CommonService) {    

      this.db.database.ref('/links/').on('value', x => {                   
          x.forEach( y=> {           
            this.links[y.key!]=y.val();          
          });            
      });            

   }

   getList(param: string) {
    return this.db.list('/meta/').snapshotChanges()    
      .pipe(                  
              map(snap => snap.find(x=>x.key==param )!.payload.val()   )                                          
          )
   }


  //-----------
  //temp_prop=false; 
  //-----------

  pushItemsToDb (forRecording: any[], task:string) {   
    let multiPaths: any = {};

    //-----------------------------------------------------------------
    // if (forRecording.find(x=>(x.code==1000007352219)&&(x.country='IL'))) {
    //   this.temp_prop=!this.temp_prop;
    // }

    // if (this.temp_prop){
    //   forRecording.map(item=>{
    //     // this.status.totalSessionCounter(item,true);
    //     // this.status.setStatus( {...this.common.ident(item), msg: "firebase_recording_ERROR"}  );
    //     this.common.updateStatusEvent$.next( {task: task, status: {...this.common.ident(item), msg: "firebase_recording_ERROR", type:'err'} } )
    //   })   
    //   return;     
    //}
    //-----------------------------------------------------------------

    forRecording.forEach(item =>{
      if (task=='products'){
          if (item.new) {
              multiPaths['meta/aliItems/' + item.code]=item.value;
              multiPaths['links/' + item.code]=item.links;
          } else if (item.err_status == 404) {          
              multiPaths['meta/aliItems/' + item.code + '/' + item.country +'/'+ 'state']=404;
              multiPaths['meta/aliItems/' + item.code + '/' + item.country +'/'+ 'time']=new Date().getTime();        
          } else {
              multiPaths['aliItems/' + item.code + '/' + item.country]={           
                imageModule: item.result.imageModule,
                skuModule: item.result.skuModule,
                titleModule: item.result.titleModule };

              multiPaths['meta/aliItems/' + item.code + '/' + item.country +'/'+ 'state']=item.result.actionModule.itemStatus;
              multiPaths['meta/aliItems/' + item.code + '/' + item.country +'/'+ 'title']=item.result.titleModule.subject;
              multiPaths['meta/aliItems/' + item.code + '/' + item.country +'/'+ 'time']=new Date().getTime();                        
          }
      }
      if (task=='shipping'){
        if (item.new){
            multiPaths['meta/aliShips/' + item.code]=item.value;
        } else {
            multiPaths['aliShips/' + item.code + '/' + item.country] = item.result.body.freightResult ? {freightResult:item.result.body.freightResult} : {};          
            multiPaths['meta/aliShips/' + item.code + '/' + item.country +'/'+ 'time']=new Date().getTime();                                
        }
      }  
    })            

    this.db.database.ref('/').update(multiPaths).then(
      ()=>{
        forRecording.map(item=>{                                
          if (!item.new) this.common.updateStatusEvent$.next( {task: task, status: {...this.common.ident(item), msg: "recorded_successfully", type:'OK'} } )
        })
        console.log(forRecording.length +" products - Recorded Successfully! ")
      },
      
      err=>{
        forRecording.map(item=>{            
          if (!item.new) this.common.updateStatusEvent$.next( {task: task, status: {...this.common.ident(item), msg: "firebase_recording_ERROR", type:'err'} } );
        })        
        console.log("ERROR! FireBase Recording Error! " + err.message)
      }
    )

  }

  getItem(ident: ident, metaData:any): Observable<itemforTransfer> {           
      return this.db.list('/aliItems/'+ident.code+'/'+ident.country+'/').snapshotChanges()        
              .pipe(map(modules => ({code: ident.code,                 
                                    country: ident.country, 
                                    modules: modules.reduce((obj,module)=>({...obj, ...{[<any>module.key]:module.payload.val()}}),{}),                   
                                    basic_country: metaData.basic_country,
                                    state: metaData.state,
                                    time: metaData.time}) as itemforTransfer              
                  ),take(1));                    
  }

  getLastKey(task:string){    
    if (task='shipping') 
        this.db.database.ref('/aliShips/').orderByKey().limitToLast(1).once("value", lastSnap=> {
          if (lastSnap.val()) this.common.shipLastKey$.next(Object.keys(lastSnap.val())[0]);          
        });    
  }

  getShipData(start?:string){
    let serriesLength: number = 20;
    if (!start) 
      this.db.database.ref('/aliShips/').orderByKey().limitToFirst(serriesLength).once("value", snap=> {
        this.common.shipListData$.next(snap.val())
      });
    else 
      this.db.database.ref('/aliShips/').orderByKey().startAfter(start).limitToFirst(serriesLength).once("value", snap=> {    
        this.common.shipListData$.next(snap.val())
      });
    }

  clearProdsData() {
    this.db.database.ref('/aliItems/').set({});
  }

  clearShipData() {
    this.db.database.ref('/aliShips/').set({});
  }

}