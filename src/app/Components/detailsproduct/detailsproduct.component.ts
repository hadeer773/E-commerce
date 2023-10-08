import { OwlOptions } from 'ngx-owl-carousel-o';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainApiDataService } from 'src/app/core/services/main-api-data.service';
import { CartApiDataService } from 'src/app/core/services/cart-api-data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detailsproduct',
  templateUrl: './detailsproduct.component.html',
  styleUrls: ['./detailsproduct.component.scss']
})
export class DetailsproductComponent {
  constructor(private _ActivatedRoute:ActivatedRoute 
    , private _MainApiDataService:MainApiDataService 
    , private _CartApiDataService:CartApiDataService
    ,private _ToastrService:ToastrService){}

  productId:any;
  productDetails:any={}
  wishListData:any[]=[];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.productId=params.get('id');
      },
    });
  


  this._MainApiDataService.getProductsById(this.productId).subscribe({
        next:(response)=>{
          this.productDetails=response.data
        }
      })
      this._CartApiDataService.getWishlistItem().subscribe({
        next:(response)=>{
          console.log(response)
          const newData=response.data.map((item:any)=>item._id)
          this.wishListData=newData
        }
      })
  
  }
    productslider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: false,
    autoplay:true
  }

addProduct(id:string):void{
  this._CartApiDataService.addToCart(id).subscribe({
    next:(response)=>{
      console.log(response);
      console.log(response.data)
      this._ToastrService.success(response.message+'🛒🛒')
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
      this._ToastrService.success(response.message +'🚮🚮')
      this.wishListData=response.data;
    }
  })
}
}
