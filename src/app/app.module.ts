import { RouterModule, } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarAppComponent } from './Components/navbar-app/navbar-app.component';
import { NavbarAuthComponent } from './Components/navbar-auth/navbar-auth.component';
import { ProductsComponent } from './Components/products/products.component';
import { HomeComponent } from './Components/home/home.component';
import { CartComponent } from './Components/cart/cart.component';
import { WishListComponent } from './Components/wish-list/wish-list.component';
import { CategoriesComponent } from './Components/categories/categories.component';
import { BrandsComponent } from './Components/brands/brands.component';
import { RegisterComponent } from './Components/register/register.component';
import { DetailsproductComponent } from './Components/detailsproduct/detailsproduct.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PaymentComponent } from './Components/payment/payment.component';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { LoginComponent } from './Components/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SearchPipe } from './core/pipe/search.pipe';
import { CuttextPipe } from './core/pipe/cuttext.pipe';
import { ForgetpasswordComponent } from './Components/forgetpassword/forgetpassword.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './interceptor/loading.interceptor';
import { FormsModule } from '@angular/forms';
import { DetailsCategeryComponent } from './Components/details-categery/details-categery.component';
import { ToastrModule } from 'ngx-toastr';
import { FooterComponent } from './Components/footer/footer.component';
import {NgxPaginationModule} from 'ngx-pagination'; 








@NgModule({
  declarations: [
    AppComponent,
    NavbarAppComponent,
    NavbarAuthComponent,
    ProductsComponent,
    HomeComponent,
    CartComponent,
    WishListComponent,
    CategoriesComponent,
    BrandsComponent,
    RegisterComponent,
    DetailsproductComponent,
    BlankLayoutComponent,
    AuthLayoutComponent,
    PaymentComponent,
    NotfoundComponent,
    LoginComponent,
    SearchPipe,
    CuttextPipe,
    ForgetpasswordComponent,
    DetailsCategeryComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgxSpinnerModule,
    FormsModule,
    ToastrModule.forRoot(),
    NgxPaginationModule
    
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS , useClass:LoadingInterceptor ,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
