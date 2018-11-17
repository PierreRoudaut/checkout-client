import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './thirdparties/material.module';
import { ShopPageComponent } from './shop/shop-page/shop-page.component';
import { AdminPageComponent } from './admin/admin-page/admin-page.component';
import { ProductService } from './core/product.service';
import { HttpClientModule } from '@angular/common/http';
import { ShopItemComponent } from './shop/shop-item/shop-item.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ShopPageComponent,
    AdminPageComponent,
    ShopItemComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
  ],
  providers: [
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
