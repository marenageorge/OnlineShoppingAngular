import { Component, OnInit } from '@angular/core';
import { MyserviceService } from 'src/app/services/myservice.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {

  constructor(private productservice:MyserviceService) { }
  MyOrders;
  Product_name;
  countToKnowSatuts=1;

  dateOptionsSelect= [
    { value: '1', label: 'Accepted' },
    { value: '2', label: 'Rejected' },
    { value: '3', label: 'Pending' }
  ];
  selectedValue = '1';



  ngOnInit(): void {
    this.productservice.GetOrders().subscribe((res)=>{
      this.MyOrders=res
     
      
        
     
    },(err)=>{

    })
  }
  options = ['Accepted','Rejected','Pending'];
 
  optionSelected: any;
  
 

  selectedSortOrder: string = "Sort by...";
  ChangeSortOrder(newSortOrder: string,order) {
   
    this.selectedSortOrder = newSortOrder;
   
    if(newSortOrder == "Accepted")
     order.status = 2;
     else if(newSortOrder == "Rejected")
     order.status = 3;
     else
     order.status = 1;


      this.productservice.EditOrdersStatus(order.id, order).subscribe((res) => {
        
    this.MyOrders = res;

  }, (err) => {
 

  })
    }
}
