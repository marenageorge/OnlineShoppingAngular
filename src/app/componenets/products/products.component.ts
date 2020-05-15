import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MyserviceService } from 'src/app/services/myservice.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productservice:MyserviceService,private router :Router) { }
myproducts;
 createImgPath (imgpath: string) {

 return this.productservice.Getimg(imgpath)
}
  ngOnInit(): void {
    this.productservice.getProducts().subscribe((res)=>{
     // console.log(res)
      this.myproducts=res
    },(err)=>{
      console.log(err)
      
    })
    
  }
  arr=[];
  addTocart(product){
    console.log("added");

   this.productservice.addProductTocart(product)
   
  
  }
  Viewcart(){
    this.router.navigateByUrl('cart');
  }

}
