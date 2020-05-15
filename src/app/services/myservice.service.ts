import { Injectable, EventEmitter } from '@angular/core';
import {HttpClient, HttpHeaders}from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  orderlist=[];
  orderlistchanged=new EventEmitter();
  cartcounterchanged=new EventEmitter<number>();
  changeServiceAmout=new EventEmitter<number>();
ServiceAmount=0;
discount=0;
changediscountevent=new EventEmitter<number>();
makediscount(amount){
  this.discount=amount;
  this.changediscountevent.emit(this.discount)
}
getDiscount(){
  return this.discount;
}

changeService(service){
  this.ServiceAmount=service;
  this.changeServiceAmout.emit(this.ServiceAmount);
}
getShipping(){
  return this.ServiceAmount;
}
  counter:number=this.orderlist.length;
  addQuantitytocart(itemquantity){
  this.counter+=itemquantity;
 this.cartcounterchanged.emit(this.counter)
  return this.counter;
}
removeQuantityfromcart(itemquantity){
  this.counter-=itemquantity;
  this.cartcounterchanged.emit(this.counter)

  return this.counter;
}

removeproductfromcart(product){
  for (let i=0; i<this.orderlist.length;i++)
  {
   
    if (this.orderlist[i].id===product["id"])
    {
      this.orderlist.splice(i,1);
      
      break;
  }
 }
  
  this.counter-=1;
  this.cartcounterchanged.emit(this.counter)
  // console.log("wna be mit",this.orderlist)
  this.orderlistchanged.emit(this.orderlist)
}
  addProductTocart(product){
    let isExist=false;
   for (let i of this.orderlist)
   {

     if (i["id"]===product["id"])
     {

       isExist=true;
       break;
   }
  }
   if (!isExist)
  {
    product["userQuantity"]=1;

  this.orderlist.push(product);
  this.counter+=1;
  this.cartcounterchanged.emit(this.counter)
  this.orderlistchanged.emit(this.orderlist)

} 
  
  }
  GetcartProduct(){
    return this.orderlist;
  }
baseurl:string="https://shoppingangularapi.azurewebsites.net/api"
  constructor( private myclient:HttpClient) { }
 
getProducts(){
  const header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + (localStorage.getItem('access_token'))
  })
  return this.myclient.get(`${this.baseurl}/products`,{observe:'body',headers:header});
}
 getProductbyId(id){
  const header = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + (localStorage.getItem('access_token'))
  })
  return this.myclient.get(`${this.baseurl}/products/${id}`,{headers:header});
 }
 AddUser(user){
  return this.myclient.post(`${this.baseurl}/users/register`, user );
 
  }
  Getimg (imgpath: string) {

    return `https://shoppingangularapi.azurewebsites.net/${imgpath}`;
   }
  postimage(fd){
  
    return this.myclient.post(`${this.baseurl}/users/Upload`, fd);
  }
  getProfileinfo(): Observable<any> {

    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('access_token'))
    })
    return this.myclient.get(`${this.baseurl}/profile/GetUserDetails`,{ headers:header});
  }
  logout(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('userRole');
  }
    loggedIn(): boolean{
    return localStorage.getItem('access_token') !==  null &&  (localStorage.getItem('userRole')==="User"|| localStorage.getItem('userRole')==="Admin");
  }
  Isuser():boolean
  {
    return localStorage.getItem('access_token') !==  null &&  localStorage.getItem('userRole')==="User";

  }
 


  IsAdmin(): boolean{
  
    return localStorage.getItem('access_token') !==  null &&  localStorage.getItem('userRole')==="Admin";
  }



  changeuserphoto(user){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('access_token'))
    })
    return this.myclient.post(`${this.baseurl}/profile/changeuserphoto`, user ,{headers:header});
  }
  
  userlogin(user){
    return this.myclient.post(`${this.baseurl}/users/Login`, user );

  }
  forgetpassword(user){
    return this.myclient.post(`${this.baseurl}/users/resetpass`, user );

  }
  
  updateProfile(user){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('access_token'))
    })
    return this.myclient.post(`${this.baseurl}/profile/updateinfo`, user ,{headers:header});
  }
  addOrder(order){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('access_token'))
    })
    return this.myclient.post(`${this.baseurl}/orders/submitorder`, order,{headers:header})



  }
  addOrderProducts(orderProduct){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('access_token'))
    })
    return this.myclient.post(`${this.baseurl}/OrderDetails/completeorder`, orderProduct,{headers:header} );

  }
  getuserorders(id){
    
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('access_token'))
    })

    return this.myclient.get(`${this.baseurl}/orders/userorders?uid=${id}`,{headers:header});

  }
  deleteOrder(id){
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('access_token'))
    })
    return this.myclient.delete(`${this.baseurl}/orders/${id}`,{headers:header});

  }
  Getcoupon(id){
    return this.myclient.get(`${this.baseurl}/Coupons/${id}`);
  }


  //------------------------------------------- ADMIN -------------------------------------
  GetOrders() {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('access_token'))
    })
    return this.myclient.get(`${this.baseurl}/orders`, { observe: 'body', headers:header });
  }
  EditOrdersStatus(id , order) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('access_token'))
    })
    return this.myclient.put(`${this.baseurl}/orders/${id}`,order,{headers:header});
  }
  AddPost(post) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('access_token'))
    })
    return this.myclient.post(`${this.baseurl}/products/addProduct`, post,{headers:header});
  }

  DeleteProducts(id) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('access_token'))
    })
    return this.myclient.delete(`${this.baseurl}/products/${id}`,{headers:header});
  }
  EditProducts(id , product) {
    const header = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + (localStorage.getItem('access_token'))
    })
    return this.myclient.put(`${this.baseurl}/products/${id}`,product,{headers:header});
  }

}

 
