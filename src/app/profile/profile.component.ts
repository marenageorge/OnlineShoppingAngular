import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../services/myservice.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  constructor(private service:MyserviceService) {this.service.getProfileinfo().subscribe((res)=>{
    this.userdata=res;
   this.imageurl =this.createImgPath(this.userdata["url"])
   this.imgpath=this.userdata["url"];

   
  },(err)=>{
  
    
  })
   }
userdata
imgpath
username
email
imageurl:string;
fileToupload:File=null;

  ngOnInit(): void {
    
    this.service.getProfileinfo().subscribe((res)=>{
      this.userdata=res;
     this.imageurl =this.createImgPath(res["url"])
     this.imgpath=res["url"];

     
    },(err)=>{
    
      
    })
    
  
  }
  createImgPath (imgpath: string) {

    return this.service.Getimg(imgpath)
   
}
 registerationForm = new FormGroup({
   
  FirstName:new FormControl('',[Validators.required]),
  LastName:new FormControl('',[Validators.required]),
  gender:new FormControl('',[Validators.required])
})



get FirstNameStatus(){return this.registerationForm.controls.FirstName.valid}
get LastNameStatus(){return this.registerationForm.controls.LastName.valid}
get genderStatus(){return this.registerationForm.controls.gender.valid}
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
  
this.service.changeuserphoto({ Url: this.imageurl,  email:this.userdata.email
}).subscribe((res)=>{  this.userdata=res;})
    },(err)=>{});
}
user={};
Register(){
  if(this.registerationForm.valid){
    this.user = {
      FirstName: this.registerationForm.controls.FirstName.value,
      gender:this.registerationForm.controls.gender.value,
      LastName:this.registerationForm.controls.LastName.value,
      email:this.userdata.email
    }
    
    this.service.updateProfile(this.user).subscribe((res)=>{
     
     
      this.service.getProfileinfo().subscribe((res)=>{
        this.userdata=res;
       this.imageurl =this.createImgPath(res["url"])
       this.imgpath=res["url"];
    
  
      },(err)=>{
        
        
      })
     
      
    
    
     },(err)=>{
       
     })

  }
}
}

