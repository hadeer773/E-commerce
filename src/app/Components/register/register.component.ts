import { FormGroup, FormControl, Validators ,FormBuilder, FormControlOptions} from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService, private _Router:Router ,private _FormBuilder:FormBuilder ){}

  isLoading:boolean=false;
  errMessage:string=""


// validation all controls of form
  registerForm:FormGroup= this._FormBuilder.group({
    name:['',[Validators.required, Validators.minLength(3),Validators.maxLength(20)]],
    email:['' ,[Validators.required, Validators.email]],
    password:['',[Validators.required,Validators.pattern(/^\w{6,}$/)]],
    rePassword:[''],
    phone:['',[Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]], 
  },
            {  validators:[this.confirmPassword]   }as FormControlOptions
  );



  confirmPassword(group:FormGroup):void{
    const password = group.get('password');
    const rePassword = group.get('rePassword'); 
// validation required
    if(rePassword?.value===''){
      rePassword.setErrors({required:true})
    }
// validation confirm password
    else if( password?.value !== rePassword?.value )
    {rePassword?.setErrors({mismatch:true})
    }
  }

  handleRegister():void{
    this.isLoading=true;
    if(this.registerForm.valid){
      this._AuthService.registerForm(this.registerForm.value).subscribe(
        {
          next:(response)=>{
            // console.log(response)
            if(response.message==="success"){
              this._Router.navigate(['/login'])
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
  }

}
