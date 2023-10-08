import { Component, OnInit } from '@angular/core';
import { CartApiDataService } from 'src/app/core/services/cart-api-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss']
})
export class WishListComponent implements OnInit {

  constructor(private _CartApiDataService:CartApiDataService, private _ToastrService:ToastrService){}

  

wishListData:any=null;
wishremoveData:any[]=[];

ngOnInit(): void {
  this._CartApiDataService.getWishlistItem().subscribe({
    next:(response)=>{
      this.wishListData=response.data;
      const newData=response.data.map((item:any)=>item._id)
      this.wishremoveData=newData
      console.log(response.data);
    },
  });
};




  addProduct(id:string):void{
    this._CartApiDataService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._CartApiDataService.cartNumber.next(response.numOfCartItems);
        this._ToastrService.success(response.message);
      }
    })
  }

  addProductToWishlist(id:string):void{
    this._CartApiDataService.addToWishlist(id).subscribe({
      next:(response)=>{
        console.log(response);
        this._ToastrService.success(response.message +'❤️❤️');
        this.wishListData=response.data;
      }
    })
  }
  
  
  removeFavouriteItem(id:string):void{
    this._CartApiDataService.removeProductFromWishlist(id).subscribe({
      next:(response)=>{
        console.log(response)
        this._ToastrService.success(response.message +'🚮🚮');
        this._CartApiDataService.getWishlistItem().subscribe({
          next:(response)=>{
            this.wishListData=response.data;

          },
        });

      }
    })
  }
}
