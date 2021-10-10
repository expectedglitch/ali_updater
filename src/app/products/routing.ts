import { UpdateWrapComponent } from './../update-wrap/update-wrap.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [      
    { path: '',  component: UpdateWrapComponent}          
];

@NgModule({        
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModuleRoutingModule { }