import { Component } from '@angular/core';
import { tick } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotpassService } from 'src/app/core/services/forgotpass.service';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {

constructor(private _ForgotpassService:ForgotpassService, private _Router:Router){}
  step1:boolean=true;
  step2:boolean=false;
  step3:boolean=false;
  email:string=''
  errMessage:string=''
  forgotpassword : FormGroup = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email])
  })

  resetCodeForm : FormGroup = new FormGroup({
    resetCode:new FormControl('',[Validators.required])
  })


  resetPassword : FormGroup = new FormGroup({
    newPassword:new FormControl('',[Validators.required,Validators.pattern(/^\w{6,}$/)])
  })



  forgotForm():void{
    let userEmail= this.forgotpassword.value;
    this.email=userEmail.email;
this._ForgotpassService.forgotPassword(userEmail).subscribe({
  next:(response)=>{
    console.log(response)
    this.errMessage=response.message;
    this.step1=false;
    this.step2=true;
  }
  ,error:(err)=>{
    this.errMessage=err.error.message;
  }
})
  }

  resetCode():void{
    let resetCode=this.resetCodeForm.value;
    this._ForgotpassService.resetCode(resetCode).subscribe({
      next:(response)=>{
        console.log(response)
        this.errMessage=response.status;
        this.step2=false;
        this.step3=true;
      },error:(err)=>{
        this.errMessage=err.error.message;
      }
    })
    }

  newPassword():void{
    let resetForm=this.resetPassword.value;
    resetForm.email=this.email;
    this ._ForgotpassService.resetPassword(resetForm).subscribe({
      next:(response)=>{  
        if(response.token){
          localStorage.setItem('_token',response.token);
          this._Router.navigate(['/home'])
        }
        console.log(response);
      },error:(err)=>{
        this.errMessage=err.error.message;
      }
    })
  }
}
