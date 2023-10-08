import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MainApiDataService } from 'src/app/core/services/main-api-data.service';

@Component({
  selector: 'app-details-categery',
  templateUrl: './details-categery.component.html',
  styleUrls: ['./details-categery.component.scss']
})
export class DetailsCategeryComponent implements OnInit {
constructor(private _ActivatedRoute:ActivatedRoute , private _MainApiDataService:MainApiDataService){}

  categoryId:any='';
  categeryDetails:any={}

ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(params)=>{
      this.categoryId = params.get('id')
    }
  })

  this._MainApiDataService.getCategoriesDetails(this.categoryId).subscribe({
    next:(response)=>{
      this.categeryDetails=response.data;
    }
  })
}
}
