import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import{TranslateModule,TranslateLoader} from'@ngx-translate/core';
import{TranslateHttpLoader} from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { HomeComponent } from './componenets/components/home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductsComponent } from './componenets/products/products.component';
import { MyserviceService } from './services/myservice.service';
import {HttpClientModule, HttpHeaders,HttpClient}from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { CartComponent } from './componenets/components/cart/cart.component';
import { ProductdetailsComponent } from './productdetails/productdetails.component';
import { from } from 'rxjs';
import { OrdersViewComponent } from './orders-view/orders-view.component';
import { AboutComponent } from './componenets/about/about.component';
import { CheckoutComponent } from './componenets/checkout/checkout.component';
import { AdminOrdersComponent } from './componenets/admin-orders/admin-orders.component';
import { AdminProductComponent } from './componenets/admin-product/admin-product.component';
const routes:Routes = [
  {path:'',redirectTo:'Home',pathMatch:'full'},
  {path:'products/:id',component:ProductsComponent},
  {path:'products',component:ProductsComponent},
  {path:'register',component:RegisterComponent},
  {path:'Home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'profile',component:ProfileComponent},
  {path:'cart',component:CartComponent},
  {path:'productdetail/:id',component:ProductdetailsComponent},
  {path:'orders',component:OrdersViewComponent},
  {path:'about',component:AboutComponent},
  {path:'checkout',component:CheckoutComponent},

  {path:'adminorders',component:AdminOrdersComponent},
  {path:'adminproducts',component:AdminProductComponent}


]

export function HttpLoaderFactory(http:HttpClient){
  return new TranslateHttpLoader(http);

}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    RegisterComponent,
    ProfileComponent,
    LoginComponent,
    CartComponent,
    ProductdetailsComponent,
    OrdersViewComponent,
    AboutComponent,
    CheckoutComponent,
    AdminOrdersComponent,
    AdminProductComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]

      }
    }),
    HttpClientModule,
    RouterModule.forRoot(routes),
    Ng2SearchPipeModule    
  ],
  providers: [MyserviceService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
