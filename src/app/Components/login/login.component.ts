import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { FormGroup, Validators, FormBuilder ,FormControl} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
constructor(private _AuthService:AuthService , private _Router:Router ,private _FormBuilder:FormBuilder) {}
isLoading:boolean=false;
errMessage:string="";


LoginForm:FormGroup=this._FormBuilder.group({
  email:['' ,[Validators.required, Validators.email]],
    password:['',[Validators.required , Validators.pattern(/^\w{6,}$/)]],
  });


handleLogin():void{
  this.isLoading=true;
  if(this.LoginForm.valid){
    this._AuthService.loginForm(this.LoginForm.value).subscribe(
      {
        next:(response)=>{
          // console.log(response)
          if(response.message==="success"){
            localStorage.setItem("_token",response.token);
            this._Router.navigate(['/home']);
          }
          this.isLoading=false;

        },
        error:(err)=>{
          this.isLoading=false;
          this.errMessage=err.error.message;
        }
      }
    );
  }
};

}