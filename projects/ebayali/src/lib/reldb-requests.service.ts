import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { AuthService } from './auth.service';
//import { environment } from 'src/environments/environment.prod';
//import {keys} from './keys'


@Injectable({
  providedIn: 'root'
})
export class ReldbRequestsService {

  //constructor(private http:HttpClient, private auth:AuthService) { }
  constructor(private http:HttpClient) { }

  getListOfProducts(rel_host: string){
    //return this.http.get(keys.rel_host+'/api/getProducts')
    return this.http.get(rel_host+'/api/getProducts')
  }

  getListOfProductsAndLinks(rel_host: string){
    return this.http.get(rel_host+'/api/getProductsAndLinks')
  }

  uploadItems(portion:any, rel_host: string) {
    return this.http.post(rel_host+'/api/recordProducts', portion)
  }

  uploadShips(portion:any, rel_host: string) {
    return this.http.post(rel_host+'/api/recordShipping', portion)
  }

}