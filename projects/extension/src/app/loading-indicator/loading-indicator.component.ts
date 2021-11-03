import { CommonService } from 'ebayali';
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'loading-indicator',
  templateUrl: './loading-indicator.component.html',
  styleUrls: ['./loading-indicator.component.css']
})
export class LoadingIndicatorComponent implements OnInit, OnDestroy {


  constructor(public common: CommonService) { }

  @Input('task') task: string='';
  @Input('code') code: string='';

  @Output('fixes') fixes = new EventEmitter();  
  
  statusSubscription: any;
  update_states: any = {};
  
  ngOnInit(): void {    
    this.statusSubscription = this.common.updateStatusEvent$.subscribe(x => {            
      if ((<any>x).task == this.task && (<any>x).status.msg!=='recorded_successfully') this.update_states={
                        ...this.update_states, 
                        ...{[(<any>x).status.country]: {msg: (<any>x).status.msg, type: (<any>x).status.type}}   
                      }                      
            })
  }

  ngOnDestroy(){
    this.statusSubscription.unsubscribe();
  }

  get errorListToFix() {    
    let errorListToFix: any[] = []
    Object.keys(this.update_states).map(cnt => {
          if (this.update_states[cnt].type=='err') errorListToFix.push({code:this.code, country:cnt})                    
    })    
    return errorListToFix;
  }

  get outdated() {
    let outdated: any[] = []
    Object.keys(this.update_states).map(cnt => {
          if (this.update_states[cnt].msg=='from_firebase_outdated') outdated.push({code:this.code, country:cnt})                    
    })    
    return outdated;
  }


  fix(par: string){
    if (par == 'err') this.fixes.emit({task:this.task, list:this.errorListToFix});    
    if (par == 'update') this.fixes.emit({task:this.task, list:this.outdated});    
  }

}
