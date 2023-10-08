import { Component, OnInit } from '@angular/core';
import { MainApiDataService } from 'src/app/core/services/main-api-data.service';


@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
  constructor(private _MainApiDataService:MainApiDataService){}

  brandsData:any[]=[];
  specificBrand:any={};


  ngOnInit(): void {
    this._MainApiDataService.getBrands().subscribe({
      next:(response)=>{
        this.brandsData=response.data
        console.log(response.data)
      }
    });


  }


  openBrand(brandId:string){
    this._MainApiDataService.getspecificBrands(brandId).subscribe({
      next:(response)=>{
        this.specificBrand=response.data;
        console.log(response.data)
        
      }
    })
  }

  closeBrand():void{
    this.specificBrand=null;
  }
}
