import { ToastrService } from 'ngx-toastr';
import { CartApiDataService } from 'src/app/core/services/cart-api-data.service';
import { Component } from '@angular/core';
import { MainApiDataService } from 'src/app/core/services/main-api-data.service';
import { NgxPaginationModule } from 'ngx-pagination';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  constructor( private _MainApiDataService:MainApiDataService  
    ,private _CartApiDataService:CartApiDataService 
    ,private _ToastrService:ToastrService){}
  productsData:any[]=[];
  categories:any[]=[];
  wishListData:any[]=[];
  term:string='';
  pageSize : number=0;
  currentPage : number = 0;
  total : number=0;

  ngOnInit(): void {
    this._MainApiDataService.getProducts().subscribe({
      next:(response)=>{
        this.productsData=response.data;
        this.pageSize=response.metadata.limit;
        this.currentPage=response.metadata.currentPage;
        this.total=response.results;
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

  addProduct(id:string):void{
    this._CartApiDataService.addToCart(id).subscribe({
      next:(response)=>{
        console.log(response)
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


    pageChanged(event:any):void{
  console.log(event)
  this._MainApiDataService.getProducts(event).subscribe({
    next:(response)=>{
      this.productsData=response.data;
      this.pageSize=response.metadata.limit;
      this.currentPage=response.metadata.currentPage;
      this.total=response.results;
    }
  });

}
  
}
