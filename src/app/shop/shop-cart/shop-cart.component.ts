import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Cart, CartItem } from 'src/app/core/cart';
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
  @Output() removeItem = new EventEmitter<number>();
  @Output() clearCart = new EventEmitter();
  @Output() setItem = new EventEmitter();
  get cartItems() {
    const items = [];
    if (!this.cart || !this.cart.cartItems) {
      return [];
    }
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

  decrementQuantity(cartItem: any) {
    const item: CartItem = {
      productId: cartItem.id,
      quantity: -1
    };
    this.setItem.emit(item);
  }

  incrementQuantity(cartItem: any) {
    const item: CartItem = {
      productId: cartItem.id,
      quantity: 1
    };
    this.setItem.emit(item);
  }

  removeItemHandler(productId: number) {
    this.removeItem.emit(productId);
  }

  clearCartHandler() {
    this.clearCart.emit();
  }

  productImgUrl(imageFilename: string) {
    return `${environment.apiEndpoint}/api/public/images/products/${imageFilename}`;
  }

  constructor() { }

  ngOnInit() {
  }

}
