import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartApiDataService } from 'src/app/core/services/cart-api-data.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit{
  constructor(private _ActivatedRoute:ActivatedRoute ,private _CartApiDataService:CartApiDataService) {}
  cartId:any=''

 orderForm:FormGroup=new FormGroup({
  details: new FormControl('', [Validators.required]),
  phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  city: new FormControl('', [Validators.required]),
 })

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(params)=>{
        this.cartId= params.get('id');
        console.log(this.cartId);

      }
    })
  }

  handleForm():void{
    this._CartApiDataService.CheckOut(this.cartId , this.orderForm.value).subscribe({
      next:(response)=>{
        if(response.status == 'success'){
            window.open(response.session.url);
        }
      }
    })

  }
}
