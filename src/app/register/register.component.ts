import { Component, OnInit, Optional} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MyserviceService } from 'src/app/services/myservice.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private service:MyserviceService,private router:Router) { }

  ngOnInit(): void {
   
  }
  imageurl:string="";
  fileToupload:File=null;
    registerationForm = new FormGroup({
    FirstName:new FormControl('',[Validators.required]),
    LastName:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.pattern("(?=^.{6,255}$)((?=.*\d)(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[^A-Za-z0-9])(?=.*[a-z])|(?=.*[^A-Za-z0-9])(?=.*[A-Z])(?=.*[a-z])|(?=.*\d)(?=.*[A-Z])(?=.*[^A-Za-z0-9]))^.*")]),
    gender:new FormControl('',[Validators.required]),
    email:new FormControl("",[Validators.required])
    ,Url:new FormControl(this.imageurl,[])
  })
  
  get FirstNameStatus(){return this.registerationForm.controls.FirstName.valid}
  get LastNameStatus(){return this.registerationForm.controls.LastName.valid}
  get genderStatus(){return this.registerationForm.controls.gender.valid}
  get emailStatus(){return this.registerationForm.controls.email.valid}
  get passStatus(){return this.registerationForm.controls.password.valid}
  get controlsvalid(){return this.registerationForm.valid}

  handlefileinput(file:FileList){
this.fileToupload=file.item(0);
var reader=new FileReader();
reader.onload=(event:any)=>{ this.imageurl=event.target.result}
reader.readAsDataURL(this.fileToupload)
const formData = new FormData();
    formData.append('file', this.fileToupload, this.fileToupload.name);
    this.service.postimage(formData).subscribe((res)=>{  
     this.imageurl=res["dbPath"]
      },(err)=>{});
  }

 user={};
  Register(){
    if(this.registerationForm.valid){
      this.user = {
        FirstName: this.registerationForm.controls.FirstName.value,
        password:this.registerationForm.controls.password.value,
        email:this.registerationForm.controls.email.value,
        gender:this.registerationForm.controls.gender.value,
        LastName:this.registerationForm.controls.LastName.value,
        Url: this.imageurl
      }
   

      this.service.AddUser(this.user).subscribe((res)=>{
     
       this.router.navigateByUrl('login');
       },(err)=>{
        
         
       })

    }
    this.registerationForm.reset();
  }
}
