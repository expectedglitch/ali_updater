import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import { AuthGuard } from './route-guards/auth-guard.guard';
import { LoadingGuard } from './route-guards/loading-guard';




const routes: Routes = [
     
  { path: '',  component: HomeComponent, canActivate: [AuthGuard] },          
  { path: "login", component: LoginComponent },    
  
  { path: 'updating/products', loadChildren: () => import ('./products/products.module').then(m=>m.ProductsModule), canActivate: [AuthGuard], canLoad:[LoadingGuard] },          
  { path: 'updating/shipping', loadChildren: () => import ('./shipping/shipping.module').then(m=>m.ShippingModule), canActivate: [AuthGuard], canLoad:[LoadingGuard] },
      
  { path: '**', component: NotFoundPageComponent }      

];

@NgModule({
  declarations: [
    AppComponent,
    
    MenuComponent,
    HomeComponent,    
    LoginComponent,         
    CountDownComponent
  ],
  imports: [    
    RouterModule.forRoot(routes),
    FormsModule,    
    //AppRoutingModule,
    HttpClientModule,

    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    BrowserAnimationsModule,
    
    MatInputModule,
    MatCardModule,
    
  ],
  providers: [myInterceptors],  
  bootstrap: [AppComponent]
})

export class AppModule { }