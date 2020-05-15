import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../services/myservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessengerService } from '../services/messenger.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:MyserviceService, private router:Router,private messenger:MessengerService) { }

  ngOnInit(): void {
  }
  registerationForm = new FormGroup({
   
    password:new FormControl('',[Validators.required,Validators.pattern("(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*")]),
   
    email:new FormControl("",[Validators.required])
  
  })
  
  get controlsvalid(){return this.registerationForm.valid}
 
  gotoregister(){
    this.router.navigateByUrl('register');
  }
 
 user={};
  login(){
    
    if(this.registerationForm.valid){
      this.user = {
        password:this.registerationForm.controls.password.value,
        email:this.registerationForm.controls.email.value,
        
      }
   
    
      this.service.userlogin(this.user).subscribe((res)=>{
       
      
        localStorage.setItem('access_token', res["token"]);
        localStorage.setItem('userRole',res["role"]);
        this.messenger.sendMsg(res["role"])     
         this.router.navigateByUrl('profile');
       },(err)=>{
       alert("Invalid Email or Password");
         
       })
 

    }
    this.registerationForm.reset();
  }
  forgetpass(){
  var email=  prompt("Enter your Email to reset password");
  var password=prompt("Enter your new password")
  this.service.forgetpassword({email:email,password:password}).subscribe((res)=>{},(err)=>{alert("invalid email")})
  }
}
