import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { ProductPageComponent } from './product-page/product-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AddProductComponent } from './add-product/add-product.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthInterceptorService } from './auth-interceptor.service';
import { LogoutComponent } from './logout/logout.component';



@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    ProductPageComponent,
    UserPageComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AddProductComponent,
    NotFoundComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: 'products/:productId', component: ProductPageComponent},
      {path: 'users/:userId', component: UserPageComponent},
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'addProduct', component: AddProductComponent},
      {path: 'logout', component: LogoutComponent},
      {path: '', component: HomeComponent},
      {path: '404', component: NotFoundComponent},
      {path: '**', redirectTo: '404'}
    ], {useHash: true})
  ],
  exports: [RouterModule],
  providers: [{
      provide:HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
