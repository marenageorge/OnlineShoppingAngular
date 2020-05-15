import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/services/myservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  Price=0;
  Shipping=0;
  userid:string;
  constructor(private service:MyserviceService,private router:Router) { 
    this.service.getProfileinfo().subscribe((res)=>{
      this.userid=res["id"]
     },(err)=>{
       //console.log(err)
     })
    
  }
  Discount;
myproducts;
  ngOnInit(): void {
    this.Price=0;
    this.myproducts=this.service.GetcartProduct();
   this.Shipping= this.service.getShipping();

    this.Price=this.Shipping;
      for(let p of this.myproducts){
      this.Price =this.Price+p["price"]*p["userQuantity"];

      }
     this.Discount= this.service.getDiscount()
    
     this.Price=this.Price-((this.Price-this.Shipping)*(this.Discount/100));
  }
  orderobj={};
  orderproduct={};
  orderid
  makeorder() {
    this.orderobj={
      "UserId":this.userid,
      "TotalPrice":this.Price,
      "OrderDate":new Date()

    }
    this.service.addOrder(this.orderobj).subscribe((res)=>{
  

    this.orderid=res
    for(let p of this.myproducts){
      this.orderproduct={
       "OrderId" :this.orderid,
      "ProductId": p.id,
      "UnitPrice":p.price,
       "Quantity":p.userQuantity
 
      }
      this.service.addOrderProducts(this.orderproduct).subscribe((res)=>{
        alert("your order has been submitted")
        this.router.navigateByUrl('/')
      },(err)=>{})
  
         
      }
    })
  }

}
