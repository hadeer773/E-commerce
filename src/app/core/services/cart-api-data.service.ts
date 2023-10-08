import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CartApiDataService {

  constructor(private _HttpClient:HttpClient) { }
  myHeaders:any={
    token:localStorage.getItem('_token')
  };
  cartNumber:BehaviorSubject<number> =new BehaviorSubject(0);



  // cart apis data

  addToCart(id:string):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/cart` ,
    {
      "productId":id,
    },
    {
      headers:this.myHeaders,
    }
    );
  };

  getCartItem():Observable<any>{
    return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers:this.myHeaders,
    },
    )
  };

  removeCartItem(id:String):Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`
    ,{
      headers:this.myHeaders,
    }
    );
  };


  updateCartItems(id:string,countItem:number):Observable<any>{
    return this._HttpClient.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
    {
      count : countItem,
    },
    {
      headers:this.myHeaders,
    }
    );
  };




  CheckOut(cart_id:string , order_details:object):Observable<any>{
    return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart_id}`,
    {
      shippingAddress  : order_details,
    },
    {
      headers : this.myHeaders,
    }
    );
  };


  clearCart():Observable<any>{
    return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
    {
      headers:this.myHeaders
    }
    );
  };




//  wishlist apis data

addToWishlist(id:string):Observable<any>{
  return this._HttpClient.post(`https://ecommerce.routemisr.com/api/v1/wishlist`  ,
  {
    productId: id,
},
{
  headers : this.myHeaders,
}
  );
};


getWishlistItem():Observable<any>{
  return this._HttpClient.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
  {
    headers : this.myHeaders,
  }
    );
  
}




removeProductFromWishlist(id:string):Observable<any>{
  return this._HttpClient.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
  {
    headers : this.myHeaders,
  }
  );

}

}
