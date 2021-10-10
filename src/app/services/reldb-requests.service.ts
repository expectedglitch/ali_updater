import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReldbRequestsService {

  constructor(private http:HttpClient, private auth:AuthService) { }

  getListOfProducts(){
    return this.http.get(environment.rel_host+'/api/getProducts')
  }

  getListOfProductsAndLinks(){
    return this.http.get(environment.rel_host+'/api/getProductsAndLinks')
  }

  uploadItems(portion:any) {
    return this.http.post(environment.rel_host+'/api/recordProducts', portion)
  }

  uploadShips(portion:any) {
    return this.http.post(environment.rel_host+'/api/recordShipping', portion)
  }

}