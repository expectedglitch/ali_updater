import { AuthGuard } from './route-guards/auth-guard.guard';
import { LoadingGuard } from './route-guards/loading-guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';


const routes: Routes = [
     
    { path: '',  component: HomeComponent, canActivate: [AuthGuard] },      
    { path: "login", component: LoginComponent },    
    
    { path: 'updating/products', loadChildren: () => import ('./products/products.module').then(m=>m.ProductsModule), canActivate: [AuthGuard], canLoad:[LoadingGuard] },          
    { path: 'updating/shipping', loadChildren: () => import ('./shipping/shipping.module').then(m=>m.ShippingModule), canActivate: [AuthGuard], canLoad:[LoadingGuard] },
        
    { path: '**', component: NotFoundPageComponent }      
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
