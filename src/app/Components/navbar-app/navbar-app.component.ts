import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartApiDataService } from 'src/app/core/services/cart-api-data.service';

@Component({
  selector: 'app-navbar-app',
  templateUrl: './navbar-app.component.html',
  styleUrls: ['./navbar-app.component.scss']
})
export class NavbarAppComponent implements OnInit {

  constructor(private _Router:Router , private _CartApiDataService:CartApiDataService){}


  cartnum:number=0;
ngOnInit(): void {
  this._CartApiDataService.cartNumber.subscribe({
    next:(data)=>{
      this.cartnum=data;
    }
  });


  this._CartApiDataService.getCartItem().subscribe({
    next:(response)=>{
      this.cartnum=response.numOfCartItems;
    }

  })



}

  LogOut():void{
    localStorage.removeItem('_token');
    this._Router.navigate(['/login'])
  }

}
