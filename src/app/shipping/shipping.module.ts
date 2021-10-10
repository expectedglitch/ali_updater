import { UpdatingModule } from './../updating/updating.module';
import { TASK } from './../inject-tokens';
import { ModuleRoutingModule } from './routing';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [],
  imports: [    
    ModuleRoutingModule,
    UpdatingModule,        
  ], 
  providers: [
    {provide:TASK, useValue:'shipping'}
  ]
})
export class ShippingModule { }
