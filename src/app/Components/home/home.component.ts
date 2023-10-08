import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartApiDataService } from 'src/app/core/services/cart-api-data.service';
import { MainApiDataService } from 'src/app/core/services/main-api-data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  constructor( private _MainApiDataService:MainApiDataService 
    ,private _CartApiDataService:CartApiDataService
    ,private _ToastrService:ToastrService){}
  productsData:any[]=[];
  categories:any[]=[];
  wishListData:any[]=[];
  term:string='';

  ngOnInit(): void {
    this._MainApiDataService.getProducts().subscribe({
      next:(response)=>{
        console.log(response.data)
        this.productsData=response.data;
      }
    });

    this._MainApiDataService.getCategories().subscribe({
      next:(response)=>{
        this.categories=response.data;
      }
    })


    this._CartApiDataService.getWishlistItem().subscribe({
      next:(response)=>{
        console.log(response)
        const newData=response.data.map((item:any)=>item._id)
        this.wishListData=newData
      }
    })
  };
    
  firstslider: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    nav: true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplaySpeed:1000,
  };
secondslider: OwlOptions = {
  loop: true,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  dots: false,
  navSpeed: 700,
  navText: ['prev', 'next'],
  autoplay:true,
  autoplayTimeout:3000,
  autoplaySpeed:1000,
  responsive: {
    0: {
      items: 1
    },
    400: {
      items: 2
    },
    740: {
      items: 3
    },
    940: {
      items: 6
    }
  },
  nav: true
}
addProduct(id:string):void{
  this._CartApiDataService.addToCart(id).subscribe({
    next:(response)=>{
      console.log(response);
      this._CartApiDataService.cartNumber.next(response.numOfCartItems);

      this._ToastrService.success(response.message +'🛒🛒')
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
