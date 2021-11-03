import { AfterViewChecked, ChangeDetectorRef, ElementRef, Inject, ViewChild } from '@angular/core';
// import { CommonService } from 'projects/ebayali/src/lib/common.service';
// import { FireRequestsService, prod } from 'projects/ebayali/src/lib/fire-requests.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel} from '@angular/cdk/collections';
import { TASK } from '../inject-tokens';
import { CommonService, FireRequestsService, prod } from 'ebayali';

interface listElem extends prod {  
  outdated: string[];
  removed: boolean;
  update_state: {
    [key: string]: string;
  };
}

@Component({
  selector: 'app-ali-list',
  templateUrl: './ali-list.component.html',
  styleUrls: ['./ali-list.component.css']
})

export class AliListComponent implements OnInit, OnDestroy, AfterViewChecked {

  constructor(public fireReq: FireRequestsService, 
              public common: CommonService, 
              @Inject(TASK) public updateTask: string,
              private cdRef:ChangeDetectorRef) { }  

  metaSubscription: any;
  outdatedSubscription: any;
  statusSubscription: any;
  shipOptionSubscription: any;


  @ViewChild('table', {read: ElementRef}) 
  table!: ElementRef;

 

  get tableRowsDisplayed() {
    return this.table?.nativeElement.getElementsByTagName('tr').length>10;    
  }


  detectChanges=true;

  ngAfterViewChecked(){                
    if (this.detectChanges) this.cdRef.detectChanges();              
    if (this.tableRowsDisplayed) this.detectChanges=false;
  }




  ngOnInit(): void {  

    console.log('ali list on init='+Date.now());
   
    this.metaSubscription = this.fireReq.getList('aliItems').subscribe (result=>{
        this.metaList = result;      
        console.log(result)      ;
        this.dataSource = new MatTableDataSource (this.common.tableData( this.metaList ).map(                    
                prod => ({  countries: Object.keys(this.metaList[prod.code]),...prod})                                                  
            ))
        console.log('ali list got data='+Date.now());
    });


    let outDated$ = this.updateTask=='shipping'?this.fireReq.getList('aliShips'):this.fireReq.getList('aliItems');
    this.outdatedSubscription = outDated$.subscribe(result =>
      this.outdated = Object.keys(result as any).reduce((obj,code)=>Object.assign(obj, {[code]:this.common.outdatedElems((result as any)[code])}), {})      
    )                

    this.statusSubscription = this.common.updateStatusEvent$.subscribe(x => {      
      if ((x as any).task ==this.updateTask){
        this.updateStatus((x as any).status);
        this.update_states[(<any>x).status.code]={...this.update_states[(<any>x).status.code], ...{[(<any>x).status.country]: (<any>x).status.msg}};
      }
    });        
                                                   
    
    if (this.updateTask=='shipping') this.shipOptionSubscription = this.common.shipUpdateOptionsChange$.subscribe(cnts =>this.shipUpdateList=cnts)
    
    this.selection.isSelected = this.isChecked.bind(this);    
    
  }

  ngOnDestroy() {
    if (this.metaSubscription) this.metaSubscription.unsubscribe();
    if (this.outdatedSubscription) this.outdatedSubscription.unsubscribe();
    if (this.statusSubscription) this.statusSubscription.unsubscribe();
    if (this.shipOptionSubscription) this.shipOptionSubscription.unsubscribe();
  }


  metaList: any = {};  
  update_states: any = {};
  outdated: any = {};

  @Input('updateMode') updateMode: number = 0;

  shipUpdateList: string[] = this.common.cntList6;    

  displayedColumns: string[] = ['select', 'code', 'title', 'countries' ];  
  selection = new SelectionModel<listElem>(true, []);    
  dataSource: any;
  
  

  isRowOutdated(code:string){       
    if (this.outdated[code]) {      
      if (this.updateTask=='shipping') return this.shipUpdateList.some(x => (this.outdated[code] && this.outdated[code].includes(x)) )
      return this.outdated[code].length;
    }
    return true;  
  }

  updateStatus(status:any) {        
    //let prod = ((this.common.task=='products')?(<listElem[]>this.dataSource.data):(<listElem[]>this.dataSource.data))
    let prod = (<listElem[]>this.dataSource.data)
        .find(x=>x.code==status.code);
    if (prod) prod['update_state']={...prod['update_state'], ...{[status.country]: status.msg}};            
  }
  
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  isChecked(row: any) {
    const found = this.selection.selected.find(el => el.code==row.code)
    if (found) return true;
    return false;
  }

  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();   
      this.common.selectionEvent$.next({task: this.updateTask, rows:this.selection.selected});
      return;
    }    
    this.selection.select(...this.dataSource.data);    
    this.common.selectionEvent$.next({task: this.updateTask, rows:this.selection.selected});    
  }

  rowToggle(row: listElem) {          
    const found = this.selection.selected.find(el => el.code==row.code)
    if (found) this.selection.deselect(found); else this.selection.select(row);
    this.common.selectionEvent$.next({task: this.updateTask, rows:this.selection.selected});    
  }
  
  getAliLink(code:string) {
    return "https://www.aliexpress.com/item/"+code+".html";
  }

}