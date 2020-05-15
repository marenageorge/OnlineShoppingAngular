import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyserviceService } from '../services/myservice.service';

@Component({
  selector: 'app-productdetails',
  templateUrl: './productdetails.component.html',
  styleUrls: ['./productdetails.component.css']
})
export class ProductdetailsComponent implements OnInit {
  id: number;
  private sub: any;
  constructor(private route: ActivatedRoute,private productservice:MyserviceService) { }
product;
  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id']; 
     
      
      
   });
   this.productservice.getProductbyId(this.id).subscribe(

     (res)=>{
       this.product=res
     },(err)=>{})
  }
  createImgPath (imgpath: string) {

    return this.productservice.Getimg(imgpath)
   }
   addTocart(product){
   

   this.productservice.addProductTocart(product)
   
  
  }
}
