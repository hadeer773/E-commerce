import { Component, OnInit } from '@angular/core';
import { MainApiDataService } from 'src/app/core/services/main-api-data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit{
  constructor(private _MainApiDataService:MainApiDataService){}
  
  CategoriesData:any[]=[];
  ngOnInit(): void {
    this._MainApiDataService.getCategories().subscribe({
      next:(response)=>{
        console.log(response)
        this.CategoriesData=response.data;

      }
    })
  }
}
