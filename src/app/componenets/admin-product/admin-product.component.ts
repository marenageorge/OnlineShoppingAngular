import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { MyserviceService } from 'src/app/services/myservice.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.css']
})
export class AdminProductComponent implements OnInit {

  constructor(private productservice:MyserviceService) { }
myproducts;
 createImgPath (imgpath: string) {

 return this.productservice.Getimg(imgpath)
}
  ngOnInit(): void {
    this.productservice.getProducts().subscribe((res)=>{
      this.myproducts=res
    },(err)=>{
     
    })
   
    
  }
  imageurl:string=this.createImgPath("Resources/Images/avatar.jpg")
  fileToupload:File=null;

  registerationForm = new FormGroup({
    name:new FormControl('',Validators.required),
    description:new FormControl('',Validators.required),
    price:new FormControl(20,[Validators.min(15),Validators.max(10000)]),
    Quantity: new FormControl(''),
    Url:new FormControl(this.imageurl,[])
  })
  get nameStatus(){return this.registerationForm.controls.name.valid}
  get descriptionStatus(){return this.registerationForm.controls.description.valid}

  get priceStatus(){return this.registerationForm.controls.price.valid}

  handlefileinput(file:FileList){
    this.fileToupload=file.item(0);
    var reader=new FileReader();
    reader.onload=(event:any)=>{ this.imageurl=event.target.result}
    reader.readAsDataURL(this.fileToupload)
    const formData = new FormData();
        formData.append('file', this.fileToupload, this.fileToupload.name);
        this.productservice.postimage(formData).subscribe((res)=>{  
         this.imageurl=res["dbPath"]
         console.log(res["dbPath"])
          },(err)=>{});
      }

    post={}
    productUpdated={}
    CreatePost(){
    
      if(this.registerationForm.valid){
        this.post = {
          ProductName: this.registerationForm.controls.name.value,
          Description:this.registerationForm.controls.description.value,
          Price:this.registerationForm.controls.price.value,
          Quantity:this.registerationForm.controls.Quantity.value,
          Url: this.imageurl
        }
      
  
        this.productservice.AddPost(this.post).subscribe((res)=>{
       this.myproducts=res;
      
          
         },(err)=>{
          
           
         })
         this.registerationForm = new FormGroup({
          name:new FormControl('',Validators.required),
          description:new FormControl('',Validators.required),
          price:new FormControl(20,[Validators.min(15),Validators.max(10000)]),
          Quantity: new FormControl(''),
          Url:new FormControl(this.imageurl,[])
        })
          }
  }
 @Input() Delete(p)
  {
    const {id , productName} = p;

    this.productservice.DeleteProducts(id).subscribe((res)=>{
      this.myproducts=res;
  
     },(err)=>{

     })
      }
      EditForm = new FormGroup({
        name:new FormControl('',Validators.required),
        description:new FormControl('',Validators.required),
        price:new FormControl(20,[Validators.min(15),Validators.max(10000)]),
        Quantity: new FormControl(''),
        Url:new FormControl(this.imageurl,[])
      })
      get nameStatusedit(){return this.EditForm.controls.name.valid}
      get descriptionStatusedit(){return this.EditForm.controls.description.valid}
    
      get priceStatusedit(){return this.EditForm.controls.price.valid}
      imageurlEdit:string=this.createImgPath("Resources/Images/avatar.jpg");
      ProductID;
      @Input() Edit(p)
      {

        const {id , productName} = p;
         this.EditForm  = new FormGroup({
          name:new FormControl(p.productName,Validators.required),
          description:new FormControl(p.description,Validators.required),
          price:new FormControl(p.price,[Validators.min(15),Validators.max(10000)]),
          Quantity: new FormControl(p.quantity),
          Url:new FormControl(this.imageurl)
        })
       this.imageurlEdit = p.url;
       this.ProductID=id;
      }
      @ViewChild('editBtn') editBtn: ElementRef;
     @Input() prodcut;
     @Input() i:any;
 
      Updated(){
  
    if(this.EditForm.valid){
      if(this.imageurl ==this.createImgPath("Resources/Images/avatar.jpg"))
      {
          this.imageurl=this.imageurlEdit;
      }
      this.productUpdated = {
        id:this.ProductID,
        ProductName: this.EditForm.controls.name.value,
        Description:this.EditForm.controls.description.value,
        Price:this.EditForm.controls.price.value,
        Quantity:this.EditForm.controls.Quantity.value,
        Url: this.imageurl
      }
  
      this.productservice.EditProducts(this.ProductID,this.productUpdated).subscribe((res)=>{
     this.myproducts=res;
       
       },(err)=>{
        
         
       })
        }

      }
}
