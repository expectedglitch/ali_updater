import { Component, OnInit, Inject } from '@angular/core';
import { TASK } from '../inject-tokens';

@Component({
  selector: 'app-update-wrap',
  templateUrl: './update-wrap.component.html',
  styleUrls: ['./update-wrap.component.css']
})

export class UpdateWrapComponent implements OnInit {

  constructor(@Inject(TASK) public updateTask: string) { }

  ngOnInit(): void {}

  updateMode: number = 0;
  setUpdateMode(event: any) {
    this.updateMode=Number(event)   
  }
  
}
