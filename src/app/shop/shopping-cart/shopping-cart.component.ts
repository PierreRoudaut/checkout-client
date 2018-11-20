import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { Cart, CartItem } from 'src/app/core/cart';
import { Product } from 'src/app/core/product';
import { environment } from 'src/environments/environment';
import * as helper from 'src/app/core/helpers';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnChanges {
  @Input() cart: Cart = new Cart({});
  @Input() products: Product[] = [];
  @Output() removeItem = new EventEmitter<number>();
  @Output() clearCart = new EventEmitter();
  @Output() setItem = new EventEmitter();
  helper = helper;
  items: any[] = [];
  // displayedColumns = ['image', 'name', 'quantity', 'price', 'total'];
  displayedColumns = ['image', 'name', 'unitPrice', 'quantity', 'price', 'actions'];
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
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.cart || !this.cart.cartItems) {
      return;
    }
    this.items = [];
    const keys = Object.keys(this.cart.cartItems);
    for (let i = 0; i < keys.length; i++) {
      const product = this.products.find(p => p.id.toString() === keys[i]);
      this.items.push({ ...product, quantity: this.cart.cartItems[keys[i]].quantity });
    }
  }

  ngOnInit() {
  }

  debug(obj: any) {
    alert(JSON.stringify(obj));
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

}
