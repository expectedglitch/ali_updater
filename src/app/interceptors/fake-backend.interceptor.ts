import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, dematerialize, materialize, switchMap } from 'rxjs/operators';

@Injectable()

  export class FakeBackendInterceptor implements HttpInterceptor {
  
  constructor() {}

  isActive: boolean = true;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const { url, method, headers, body, params } = request;
    const self = this;

    if (url.includes('1005001802349781')) {this.isActive = false; console.log('interceptor is turned OFF');}
    if (url.includes('1005001715805048')) {this.isActive = true; console.log('interceptor is turned ON');}

    if (! this.isActive) return next.handle(request);
    
    console.log('Fake Backend interceptor...');
    return of(null)            
            .pipe(
              switchMap(handleRoute),
              materialize(), 
              delay(500),
              dematerialize());            

            function handleRoute(){    

            if (url.includes('https://ali-express1.p.rapidapi.com/product/'))  {
                switch (true) {              

                  case url.includes('1000006783507') &&                    
                          //url.includes('https://ali-express1.p.rapidapi.com/product/') &&
                            ((<HttpParams>params).get('country')=='US' || (<HttpParams>params).get('country')=='IL'):
                    return throwError({status:502, message:"Problem with server!", url:url});                //502 - error from Ali...

                  case url.includes('1005001370290731') &&                    
                        //url.includes('https://ali-express1.p.rapidapi.com/product/') &&
                          (<HttpParams>params).get('country')=='US':              // 404 - removed on ALi-side
                  return throwError({status:404, message:"page not found!", url:url});                

                  case url.includes('1005001465431434') &&                    
                        //url.includes('https://ali-express1.p.rapidapi.com/product/') &&
                          (<HttpParams>params).get('country')=='US':               //incorrect data structure returned
                  return of(new HttpResponse({body: {a:100, b:200}, status: 200}))
                                
                  // default:          
                  //   return next.handle(request).pipe(
                  //     tap(
                  //       resp=>console.log(resp), 
                  //       error => console.log(error)
                  //       )
                  //   );
                }    
            }
            if (url.includes('https://ali-express1.p.rapidapi.com/shipping/')) {
                switch (true) {              
                    case url.includes('1000006783507') &&                                              
                              ((<HttpParams>params).get('destination_country')=='US' || (<HttpParams>params).get('destination_country')=='IL'):
                      return throwError({status:502, message:"Problem with server!", url:url});                //502 - error from Ali...

                    case url.includes('1005001370290731') &&                                            
                            (<HttpParams>params).get('destination_country')=='US':              // 404 - removed on ALi-side
                    return throwError({status:404, message:"page not found!", url:url});                

                    // case url.includes('1005001465431434') &&                                            
                    //         (<HttpParams>params).get('country')=='US':               //incorrect data structure returned
                    // return of(new HttpResponse({body: {a:100, b:200}, status: 200}))                                                  
                }    
            }

            return next.handle(request);


          }
                            
  }
}
