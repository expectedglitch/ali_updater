import { UpdatingModule } from '../updating/updating.module';
import { ModuleRoutingModule } from './routing';
import { NgModule } from '@angular/core';
import { TASK } from '../inject-tokens';

@NgModule({
  declarations: [],
  imports: [    
    ModuleRoutingModule,
    UpdatingModule,    
  ], 
  providers: [
    {provide:TASK, useValue:'products'}
  ]
})
export class ProductsModule { }
