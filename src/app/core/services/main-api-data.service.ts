import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MainApiDataService {

 constructor(private _HttpClient:HttpClient) { }


//  products Api data
  getProducts(pageNum:number = 1):Observable<any>{
return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products?page=${pageNum}`);
  }
  getProductsById(id:any):Observable<any>{
return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }


  // api of all categories
  getCategories():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }

  getCategoriesDetails(categ_id:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/categories/${categ_id}`)
  }


  // api of all brands

  getBrands():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  getspecificBrands(brandId:string):Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`);
  }
}
