import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/services/myservice.service';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { getLocaleDateTimeFormat } from '@angular/common';
import { async } from '@angular/core/testing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  Price=0;
  prodquantity;
  ShippingCounter=0;
  shippingArr=[];
  ShippingAmount=0;
 myproducts;

  constructor(private service:MyserviceService,private router:Router) {
    this.myproducts=this.service.GetcartProduct();
   
     
   }

  ngOnInit(): void {
    this.myproducts=this.service.GetcartProduct();
    this.service.orderlistchanged.subscribe((prdlst:[])=>{ 
      this.myproducts=prdlst
     }

     )
 

    this.Price=0;
    for(let p of this.myproducts){
     
  
    this.Price =this.Price+p["price"]*p["userQuantity"];
  
    }

  }
  createImgPath (imgpath: string) {

    return this.service.Getimg(imgpath)
   }
   increase_quantity(temp_package){
    if(temp_package.quantity == temp_package.userQuantity){
      return alert("Can't add more")
    }else{
      this.service.addQuantitytocart(1);
      temp_package.userQuantity++
      this.Price += temp_package.price
    }
  }
remove(p){
  this.service.removeproductfromcart(p);
  this.Price-=(p.price*p.userQuantity);
}
pay(){
  this.router.navigateByUrl('/checkout')
}
  decrease_quantity(temp_package){
      if(temp_package.userQuantity == 0){
        return alert("can't be in minus")
      }
      this.service.removeQuantityfromcart(1);
      temp_package.userQuantity--
      this.Price -= temp_package.price
  }
  countPrice(){
    this.Price = 0;
     

      for(let p of this.myproducts){
        this.Price += p.price*p.userQuantity
        
      }
      
  }
 
  couponid;
shipping;
  discountamount=0;
  validateCoupon(){

    this.service.Getcoupon(this.couponid).subscribe(
      (res)=>{
       
       this.discountamount=res["discountPercent"]
       this.Price=this.Price-(this.Price*(this.discountamount/100))
      
       this.service.makediscount(this.discountamount);
      },(err)=>{alert("invalid coupon")})
  }
 Shippingclick(e){
    this.shippingArr.push(e);
  
  if (this.ShippingCounter>0)
  {
    this.Price-=this.shippingArr[this.ShippingCounter-1];
    
  }
  this.ShippingCounter++;

if (e==5)
{
  this.Price+=5;
  this.service.changeService(5);
}
else if (e==10)
{
  this.Price+=10;
  this.service.changeService(10);
}
else if (e==2)
{
  this.Price+=2;
  this.service.changeService(2);
}
else if (e==0)
{
  this.Price+=0;
  this.service.changeService(0);
}
 }
 

  
  }
  

