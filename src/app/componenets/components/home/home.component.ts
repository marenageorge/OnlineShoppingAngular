import { Component, OnInit } from '@angular/core';
import{NgbCarouselConfig}from '@ng-bootstrap/ng-bootstrap';
import { MyserviceService } from 'src/app/services/myservice.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
   providers: [NgbCarouselConfig]  })
export class HomeComponent  {
  constructor(private service:MyserviceService, private router:Router) { }
  images =
  ['../assets/img/product/feature-product/f-p-1.jpg',
  '../assets/img/product/feature-product/f-p-2.jpg',
  '../assets/img/product/feature-product/f-p-3.jpg',
  '../assets/img/product/feature-product/f-p-4.jpg',
  '../assets/img/product/feature-product/f-p-5.jpg',
]
gotoproducts(){
  if(this.service.loggedIn())
  {
    this.router.navigateByUrl('/products');
  }
  else
  {
    this.router.navigateByUrl('/login');
  }
    }
}



