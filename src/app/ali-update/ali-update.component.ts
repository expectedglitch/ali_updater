import { environment } from 'src/environments/environment.prod';
// import { AliRequestsService } from 'projects/ebayali/src/lib//alirequests.service';
import { TASK } from '../inject-tokens';
// import { CommonService, ident } from 'projects/ebayali/src/lib/common.service';
// import { FireRequestsService } from 'projects/ebayali/src/lib/fire-requests.service';
import { Component, OnInit, Output, OnDestroy, Inject } from '@angular/core';
//import { AliRequestsService } from '../services/ali-requests.service';
import { EventEmitter } from '@angular/core';
//import { CommonService } from '../services/common.service';
import { combineLatest } from 'rxjs';
import { AliRequestsService, CommonService, FireRequestsService, ident } from 'ebayali';


interface update_states {
  [key:string]: 
      {[key:string]: 
          {msg:string, type: string}    
      }
}


@Component({
  selector: 'app-ali-update',  
  templateUrl: './ali-update.component.html',
  styleUrls: ['./ali-update.component.css']
})
export class AliUpdateComponent implements OnInit, OnDestroy {

  constructor(public aliReq: AliRequestsService, public fireReq: FireRequestsService, public common: CommonService, @Inject(TASK) public updateTask: string) { }

  //www=new AliRequestService

  ngOnInit(): void { 
    
    this.statusSubscription = this.common.updateStatusEvent$.subscribe(x => {            
      if ((x as any).task == this.updateTask)
      this.update_states[(<any>x).status.code]={...this.update_states[(<any>x).status.code], ...{[(<any>x).status.country]: {msg:(<any>x).status.msg, type:(<any>x).status.type}} };
    }); 
    
    this.listsSubscription = combineLatest([this.fireReq.getList('aliItems'),this.fireReq.getList('aliShips')])
      .subscribe(combined => {              
          this.metaList = combined[0];
          this.shipList = combined[1];       
          
          this.fullList = this.fList!;
          this.activeList = this.aList!;
          this.outdatedList = this.oList!;          

          this.fireReq.getLastKey(this.updateTask);
      })

    this.common.selectionEvent$
      .subscribe(obj => {
        if ((obj as any).task==this.updateTask){
          this.selectedRows = (obj as any).rows;
          this.selectedList = this.sList;
        }
      })

  }  

  ngOnDestroy() {
    if (this.statusSubscription) this.statusSubscription.unsubscribe();
    if (this.listsSubscription) this.listsSubscription.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();
  }

  statusSubscription:any;
  listsSubscription: any;

  //methods=[1,2,3,4,5]

  update_states: update_states = {};

  @Output() modeChanged = new EventEmitter();

  fullList: ident[] = [];
  activeList: ident[] = [];
  outdatedList: ident[] = [];  
  selectedList:  ident[] = [];

  metaList:any = {};
  shipList:any = {};
  selectedRows: any[] = [];
  
  updateMode = [ 
    {value:0, mode:"Automatically", description: "Select products automatically"},
    {value:1, mode:"Selected", description: "Select products manually"}  
  ]

  automaticModeOptions = [
    {value: 0, option: "Outdated out of Active"},
    {value: 1, option: "Active products"},
    {value: 2, option: "All products inculding 'removed'"}    
  ]

  shipUpdateOptions = [
    {value: 0, option: 6, cnts:[...this.common.cntList6]},
    {value: 1, option: 12, cnts:[...this.common.cntList12]},
    {value: 2, option: 36, cnts:[...this.common.cntList36]},
    {value: 3, option: 50, cnts:[...this.common.cntList50]}    
  ]
  
  chosenUpdateMode = 0;
  chosenAutomaticUpdateOption = 0;
  shippingUpdateMode = 0;

  subscription: any;
  forRecording: any[] = [];

  modeChangeEvent() {
    this.modeChanged.emit(String(this.chosenUpdateMode))
  }
  shipUpdateOptionEvent() {    
    console.log('ship options changed!')
    this.fullList = this.fList!;
    this.activeList = this.aList!;
    this.outdatedList = this.oList!;          
    this.selectedList = this.sList;

    this.common.shipUpdateOptionsChange$.next(this.shipUpdateOptions.find(x => x.value==this.shippingUpdateMode)!.cnts);    
  }

  
  hasAliPending() {    
    return Object.values(this.update_states).map(x => Object.values(x as any)
      .some(status => (<any>status).msg=='ali_pending')).some(y=>y==true);        
  }
  hasFirebasePending() {
    return Object.values(this.update_states).map(x => Object.values(x as any)
      .some(status => (<any>status).msg=='200_recording_to_db' || (<any>status).msg=='404_recording_to_db')).some(y=>y==true);               
  }

  get totalSuccess () {
    return Object.values(this.update_states).reduce((a,b) => {return a + Object.values(b).filter(status=>status.msg=='recorded_successfully').length}, 0);
  }
  get totalFailed () {
    return Object.values(this.update_states).reduce((a,b) => {return a + Object.values(b).filter(status=>status.type=='err').length}, 0);
  }

  
  get updateList() {            
    let mode = this.chosenUpdateMode;
    let option = this.chosenAutomaticUpdateOption;
    if (!mode){
      if (option==0) return this.outdatedList;        
      if (option==1) return this.activeList;
      if (option==2) return this.fullList;
      return;    
    } else return this.selectedList;    
  }
  
  get fList() {    
    if (this.updateTask=='products') return Object.keys(this.metaList).reduce((total, code) =>             
        Object.keys(this.metaList[code]).reduce((arr, cnt)=>[...arr, {code:code, country:cnt} ],total),  [] as any[]);

    let updCnts=this.shipUpdateOptions.find(x => x.value==this.shippingUpdateMode)!.cnts;
    
    if (this.updateTask=='shipping') return Object.keys(this.metaList).reduce((total, code) =>       
      [...total, ...updCnts.map(cnt=>({code:code, country:cnt}) )],   [] as any[]);        
      
    return;
  }

  get aList() {    
    if (this.updateTask=='products') return Object.keys(this.metaList).reduce((total, code) =>             
        (!this.common.isRemoved(this.metaList[code]))?
            Object.keys(this.metaList[code]).reduce((arr, cnt)=>[...arr, {code:code, country:cnt} ],total):
            total,  [] as any[]);

    let updCnts=this.shipUpdateOptions.find(x => x.value==this.shippingUpdateMode)!.cnts;    

    if (this.updateTask=='shipping') return Object.keys(this.metaList).reduce((total, code) =>             
        (!this.common.isRemoved(this.metaList[code]))? 
            [...total, ...updCnts.map(cnt=>({code:code, country:cnt}) )]:            
            total,  [] as any[]);

    return;
  }

  get oList() {    
    if (this.updateTask=='products') return Object.keys(this.metaList).reduce((total, code)=> 
        [...total, ...!this.common.isRemoved(this.metaList[code])?
            this.common.outdatedElems(this.metaList[code]).map(cnt=>({code:code, country:cnt})):
            []   ], [] as any[]); 

    let updCnts=this.shipUpdateOptions.find(x => x.value==this.shippingUpdateMode)!.cnts;

    if (this.updateTask=='shipping') return Object.keys(this.metaList).reduce((total, code)=>                    
          [...total, ...!this.common.isRemoved(this.metaList[code])?
          this.common.outdatedElems(
          updCnts.reduce((obj,cnt)=>Object.assign(obj,{[cnt]:this.shipList[code][cnt]}),{})
          ).map(cnt=>({code:code, country:cnt})):[]],  [] as any[]);    

    return;
  }

  get sList() {
    if (this.updateTask=='products') return this.selectedRows.reduce((total, row)=>
        [...total, ...(row.countries as string[]).map(cnt=>({code: row.code, country:cnt})) ],[])

    let updCnts=this.shipUpdateOptions.find(x => x.value==this.shippingUpdateMode)!.cnts;
    if (this.updateTask=='shipping') return this.selectedRows.reduce((total, row)=>[...total, ...updCnts.map(cnt=>({code: row.code, country:cnt})) ],[])

    return;
  }


  get updateListLength() {
    switch (true){
      case this.chosenUpdateMode==0:
        switch (true) {
          case this.chosenAutomaticUpdateOption==0: return this.outdatedList?.length;
          case this.chosenAutomaticUpdateOption==1: return this.activeList?.length;
          case this.chosenAutomaticUpdateOption==2: return this.fullList?.length;
          default: return 0;
        }              
      case this.chosenUpdateMode==1: return this.selectedList?.length;
      default: return 0
    }    
  }
 

  get errorListToFix() {    
    let errorListToFix: any[] = []
    Object.keys(this.update_states).map(code => Object.keys(this.update_states[code]).map(cnt => {
          if (this.update_states[code][cnt].type=='err') errorListToFix.push({code:code, country:cnt})
        }
    ))
    return errorListToFix;
  }


  apiUpdateBridge(list: any){                
    this.subscription = this.aliReq.getElems(list, this.updateTask, environment.ali_key).subscribe(
            series => {
              this.forRecording = [];
              (<any[]>series).forEach(item => {              
                  if (this.updateTask=='products'){
                      if (!item.err_status){
                          if (!item.result.skuModule) {
                              this.common.updateStatusEvent$.next( {task: this.updateTask, status: {...this.common.ident(item), msg: "no_SKU_module", type:'err'} } )
                              console.log ( `\n Code: ${item.code}, \n Country: ${item.country}, \n SKU module not found!! Incorrect Structure!` );                        
                          } else {
                              this.common.updateStatusEvent$.next( {task: this.updateTask, status: {...this.common.ident(item), msg: "200_recording_to_db", type:'OK'} } )
                              this.forRecording.push(item);                              
                          }
                      } else if (item.err_status==404) {                      
                          this.common.updateStatusEvent$.next( {task: this.updateTask, status: {...this.common.ident(item), msg: "404_recording_to_db", type:'OK'} } )
                          console.log ( `\n ERROR! Code: ${item.code}, \n Country: ${item.country}, \n Status: ${item.err_status}, \n Message: ${item.message}, \n url: ${item.url}` );                                  
                          this.forRecording.push(item);                      
                      }
                      else {
                        this.common.updateStatusEvent$.next( {task: this.updateTask, status: {...this.common.ident(item), msg: "other_error_from_Ali", type:'err'} } )
                        console.log ( `\n ERROR! Code: ${item.code}, \n Country: ${item.country}, \n Status: ${item.err_status}, \n Message: ${item.message}, \n url: ${item.url}` );                                  
                      }
                  }
                  if (this.updateTask=='shipping') {
                      if (!item.err_status){                          
                          this.common.updateStatusEvent$.next( {task: this.updateTask, status: {...this.common.ident(item), msg: "200_recording_to_db", type:'OK'} } )
                          this.forRecording.push(item);                                                        
                      } else {
                        this.common.updateStatusEvent$.next( {task: this.updateTask, status: {...this.common.ident(item), msg: "other_error_from_Ali", type:'err'} } )
                        console.log ( `\n ERROR! Code: ${item.code}, \n Country: ${item.country}, \n Status: ${item.err_status}, \n Message: ${item.message}, \n url: ${item.url}` );                                  
                      }
                  }
              });
                                          
              if (this.forRecording.length) this.fireReq.pushItemsToDb(this.forRecording, this.updateTask);              

            },
  
            err => console.log(err)            
    );    
  }


  cancelUpdating() {
    this.subscription.unsubscribe();
    Object.keys(this.update_states).forEach(code_pr=>{  
      Object.keys(this.update_states[code_pr]).forEach(code_cnt=>{
          if (['ali_pending', 'ali_received'].indexOf(this.update_states[code_pr][code_cnt].msg)>-1) 
          this.common.updateStatusEvent$.next( {task: this.updateTask, status: {...{code:code_pr, country:code_cnt}, msg:"canceled", type:'canceled'} } )
        })
    })    
  }


}