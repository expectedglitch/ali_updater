import { defer } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concat, forkJoin, of } from 'rxjs';

import { catchError, map, tap } from 'rxjs/operators';

//import { CommonService, ident } from 'src/app/services/common.service';
//import { environment } from 'src/environments/environment.prod';
import { CommonService, ident } from './common.service';
//import { keys } from './keys';

@Injectable({
  providedIn: 'root'
})

export class AliRequestsService {

  constructor(private http:HttpClient, private common:CommonService) { }
  
  getElems(aliIdents:ident[], task:string, api_key:string){
    let basicApiUrl = "https://ali-express1.p.rapidapi.com/"+(task=='shipping'?'shipping':'product')+"/";  

    let min_price="10.0";
    // let headers = new HttpHeaders()
    //   .set("x-rapidapi-key", keys.ali_key)
    //   .set("x-rapidapi-host","ali-express1.p.rapidapi.com")          
    let headers = new HttpHeaders()
      .set("x-rapidapi-key", api_key)
      .set("x-rapidapi-host","ali-express1.p.rapidapi.com")          

    let requests = aliIdents.map(
      aliIdent => defer(() => {                
        this.common.updateStatusEvent$.next( {task: task, status: {...aliIdent, msg: "ali_pending", type:'OK'} } )

        let params = (task=='shipping')?
            new HttpParams().set("min_price",min_price).set("count","1").set("destination_country", aliIdent.country):
            new HttpParams().set("language","en").set("country", aliIdent.country);

        return this.http.get(basicApiUrl+aliIdent.code, {headers: headers, params:params} )
        .pipe(  tap (_ => this.common.updateStatusEvent$.next( {task: task, status: {...aliIdent, msg: "ali_received", type:'OK'} } ) ),
                map(result=>({...aliIdent, result:result})),                
                catchError(err => of({...aliIdent, err_status: err.status, message: err.message, url: err.url}))
                )}  )                
    )

    const serriesLength = 50; // number of country slices (not products!)
    let serriesArr = this.common.splitInPortions(requests, serriesLength).map(series => forkJoin(series));
    return concat(...serriesArr);
  }

}