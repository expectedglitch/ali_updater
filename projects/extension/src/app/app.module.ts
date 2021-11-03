import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShippingComponent } from './shipping/shipping.component';
import { ShipMethodsComponent } from './ship-methods/ship-methods.component';

import {MatListModule} from '@angular/material/list';
import { CountriesListComponent } from './countries-list/countries-list.component';
import { FormsModule } from '@angular/forms';
import { MaxTimeComponent } from './max-time/max-time.component';
import { ShipsFromComponent } from './ships-from/ships-from.component';

import {MatRadioModule} from '@angular/material/radio';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment.prod';
import { CountriesUpdateComponent } from './countries-update/countries-update.component';

import {MatButtonModule} from '@angular/material/button';
import { ProductComponent } from './product/product.component';
import { LoadingIndicatorComponent } from './loading-indicator/loading-indicator.component';

import {DragDropModule} from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    ShippingComponent,
    ShipMethodsComponent,
    CountriesListComponent,    
    MaxTimeComponent,
    ShipsFromComponent,
    CountriesUpdateComponent,
    ProductComponent,
    LoadingIndicatorComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,    
    MatListModule,
    FormsModule,
    MatRadioModule,
    AngularFireModule.initializeApp(environment.firebase),    
    MatButtonModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
}
