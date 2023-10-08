import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { ProductsComponent } from './Components/products/products.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { DetailsproductComponent } from './Components/detailsproduct/detailsproduct.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { authGuard } from './core/guards/auth.guard';
import { CategoriesComponent } from './Components/categories/categories.component';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { DetailsCategeryComponent } from './Components/details-categery/details-categery.component';

const routes: Routes = [

    
  {path:"",component:BlankLayoutComponent,children:[
    {path:'',redirectTo:'home',pathMatch:'full'},
    {path:"home",canActivate:[authGuard]  ,component:HomeComponent,title:"Home Component"},
    {path:"cart",canActivate:[authGuard]  ,component:CartComponent,title:"Cart Component"},
    {path:'produts',canActivate:[authGuard]  ,component:ProductsComponent,title:'Product Component'},
    {path:'payment/:id',canActivate:[authGuard]  ,component:PaymentComponent,title:'Payment Component'},
    {path:'details/:id',canActivate:[authGuard]  ,component:DetailsproductComponent ,title:'Details product'},
    {path:'brands',canActivate:[authGuard]  ,component:BrandsComponent,title:'Brands Component'},
    {path:'wishList',canActivate:[authGuard]  ,component:WishListComponent,title:"Wish List"},
    {path:'categories',canActivate:[authGuard],component:CategoriesComponent,title:'Categories'},
    {path:'detailscategories/:id',canActivate:[authGuard],component:DetailsCategeryComponent,title:'Details Categories'},

  ]},

  {path:'',component:AuthLayoutComponent,children:[
    {path:'login',component:LoginComponent,title:'Login Now'},
    {path:'register',component:RegisterComponent,title:'Sign Up'},

  ]},
  {path:'forgotpassword',component:ForgetpasswordComponent,title:'Forgot Password'},
  {path:'**' ,component:NotfoundComponent ,title:'NotFounded'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
