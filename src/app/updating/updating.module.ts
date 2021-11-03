import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AliUpdateComponent } from '../ali-update/ali-update.component';
import { AliListComponent } from '../ali-list/ali-list.component';
import { ReldbCommunicationComponent } from '../reldb-communication/reldb-communication.component';
import { UpdateWrapComponent } from '../update-wrap/update-wrap.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableModule } from '@angular/material/table';
import { AngularFireModule } from '@angular/fire';
//import { environment } from 'src/environments/environment.prod';
import { SpinnerComponent } from '../spinner/spinner.component';
import { environment } from 'src/environments/environment.prod';

//import {keys} from 'ebayali';
//import {MatListModule} from '@angular/material/list';



@NgModule({
  declarations: [
    AliUpdateComponent,
    AliListComponent,    
    ReldbCommunicationComponent,        
    UpdateWrapComponent,
    SpinnerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,    

    MatTableModule,
    MatRadioModule,
    MatCheckboxModule,
    MatButtonModule,

    //AngularFireModule.initializeApp(keys.firebase),     
    AngularFireModule.initializeApp(environment.firebase),     
    
    //MatListModule
  ]
})
export class UpdatingModule { }
