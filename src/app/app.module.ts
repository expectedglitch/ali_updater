import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { myInterceptors } from './interceptors/myInterceptors';
import { HomeComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { CountDownComponent } from './count-down/count-down.component';



@NgModule({
  declarations: [
    AppComponent,
    
    MenuComponent,
    HomeComponent,    
    LoginComponent,         
    CountDownComponent
  ],
  imports: [    
    FormsModule,    
    AppRoutingModule,
    HttpClientModule,

    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    
    MatInputModule,
    MatCardModule
  ],
  providers: [myInterceptors],  
  bootstrap: [AppComponent]
})

export class AppModule { }