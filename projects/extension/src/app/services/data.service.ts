import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  private _shipping:any[] = [];
  private _product:any[] = []

  _priceDifferences: any[] = [];
  
  calculatedShipList: string[] =[];
  

  set shipping(shipping:any[]){
    this._shipping=shipping;
  }
  get shipping(){
    return this._shipping;
  }

  set product(product:any[]){
    this._product=product;
  }
  get product(){
    return this._product;
  }

  existingPolicy: any[] = [];

  priceDifferences() {    
    let us_prices=(this.product.find(cnt_slice => cnt_slice.country=='US')?.result.skuModule.skuPriceList as any[])
      ?.map(variation => ({         
              skuId:variation.skuIdStr, 
              price: this.highest([variation.skuVal.actSkuBulkCalPrice, variation.skuVal.actSkuCalPrice]),            
            })  ) as any[];
    
    if (us_prices) this._priceDifferences = this.product?.map(cnt_slice=>({country:cnt_slice.country, price_list:(cnt_slice.result.skuModule.skuPriceList as any[])
      ?.map(variation => ({        
                    skuId:variation.skuIdStr, 
                    price: parseFloat((this.highest([variation.skuVal.actSkuBulkCalPrice, variation.skuVal.actSkuCalPrice]) - 
                        us_prices.find(x=>x.skuId==variation.skuIdStr).price).toFixed(3)),
                    from: JSON.parse(variation.freightExt).p8
                  })  )
            })  )
  }

  highest(prices: any[]):number {
    let highest = -1;
    for (let i=0; i<prices.length; i++) {if (parseFloat(prices[i])>highest) highest=parseFloat(prices[i]);}
    return highest;    
  }
  
}