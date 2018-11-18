import { Component, OnInit, Input } from '@angular/core';
import { Cart } from 'src/app/core/cart';
import { Product } from 'src/app/core/product';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {

  @Input() cart: Cart;

  @Input() products: Product[];

  get cartItems() {
    const items = [];
    const keys = Object.keys(this.cart.cartItems);
    for (let i = 0; i < keys.length; i++) {
      const product = this.products.find(p => p.id.toString() === keys[i]);
      items.push({ ...product, quantity: this.cart.cartItems[keys[i]].quantity });
    }
    return items;
  }

  get total() {
    return this.cartItems.reduce(function (accumulator, currentValue) {
      return accumulator + (currentValue.quantity * currentValue.price);
    }, 0);
  }

  removeItem(productId: number) {
  }

  clearCart() {
  }

  productImgUrl(imageFilename: string) {
    return `${environment.apiEndpoint}/api/public/images/products/${imageFilename}`;
  }


  constructor() { }

  ngOnInit() {
  }

  productName(key: string) {
    // const pr = this.products.find(p => p.id.toString() === key);
    // if (pr) {
    //   return pr.name;
    // }
    // return '';
    return this.products.find(p => p.id.toString() === key).name;
  }

}
