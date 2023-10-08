import { Component, OnInit } from '@angular/core';
import { CartApiDataService } from 'src/app/core/services/cart-api-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
constructor(private _CartApiDataService:CartApiDataService){}


CartData:any=null;

ngOnInit(): void {
  this._CartApiDataService.getCartItem().subscribe({
    next:(response)=>{
      this.CartData=response.data;
    },
  });
};


removeItem(id:string):void{
  this._CartApiDataService.removeCartItem(id).subscribe({
    next:(response)=>{
      console.log(response);
      this.CartData=response.data;
      this._CartApiDataService.cartNumber.next(response.numOfCartItems)
    },
  });

};



changeCount(count:number, id:string):void{
    if(count >= 1){
      this._CartApiDataService.updateCartItems(id,count).subscribe({
        next:(response)=>{
          this.CartData=response.data;
          console.log("hello")
          console.log(count)
        },
      });
    };
  };


  clear():void{
    this._CartApiDataService.clearCart().subscribe({
      next:(response)=>{
        if(response.message === 'success'){
          this.CartData=null;
          this._CartApiDataService.cartNumber.next(0)
        }
      }
    })
  }
}
