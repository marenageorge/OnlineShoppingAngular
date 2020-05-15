import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../services/myservice.service';

@Component({
  selector: 'app-orders-view',
  templateUrl: './orders-view.component.html',
  styleUrls: ['./orders-view.component.css']
})
export class OrdersViewComponent implements OnInit {
orders;
userid;
orderstatus:string;
  constructor(private service:MyserviceService) 
  { 
    this.service.getProfileinfo().subscribe((res)=>{
     this.userid=res["id"]
     this.service.getuserorders(this.userid).subscribe((res)=>
     {this.orders=res
    
      });
    },(err)=>{})
   


  }
  CancelOrder(id){
    this.service.deleteOrder(id).subscribe((res)=>{
      this.service.getuserorders(this.userid).subscribe((res)=>
      {      

        this.orders=res})
    })
  }
  ngOnInit(): void {
  }

}
