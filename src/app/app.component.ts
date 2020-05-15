import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MyserviceService } from './services/myservice.service';
import { TranslateService } from '@ngx-translate/core'
import { Router } from '@angular/router';
import { MessengerService } from './services/messenger.service';
@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css']

})

export class AppComponent implements OnInit {
  title = 'hello'
  Cartitems;
  isadmin=false;
  

  constructor(private service: MyserviceService,private messenger:MessengerService, public translate: TranslateService, private router: Router) {

   this.isadmin=false;
    translate.addLangs(['en','ar' ,'fr'])
    translate.setDefaultLang('en')
    const Browserlang = translate.getBrowserLang()
    translate.use(Browserlang.match('/en|fr/') ? Browserlang : 'en')
  }
  ngOnInit(): void {
  
     this.messenger.getMsg().subscribe((res)=>{  this.isadmin=this.service.IsAdmin()})
    this.service.cartcounterchanged.subscribe((count) => { this.Cartitems = count });
  }

  logout() {

   this.service.logout()
   this.isadmin=false;
   this.Cartitems=0
    this.router.navigateByUrl('/');
  }
  myaccount() {
    if (this.service.loggedIn()) {
     

      this.router.navigateByUrl('/profile');
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }
  checkout() {
    if (this.service.loggedIn()) {
      this.router.navigateByUrl('/checkout');
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }
  gocart() {

    if (this.service.loggedIn()) {
      this.router.navigateByUrl('/cart');
    }
    else {
      this.router.navigateByUrl('/login');
    }

  }
  gotoproducts() {
    if (this.service.loggedIn()) {
      this.router.navigateByUrl('/products');
    }
    else {
      this.router.navigateByUrl('/login');
    }
  }
  adminorder() {
    this.router.navigateByUrl('/adminorders');
  }
  adminprod() {
    this.router.navigateByUrl('/adminproducts');
  }
 
}
