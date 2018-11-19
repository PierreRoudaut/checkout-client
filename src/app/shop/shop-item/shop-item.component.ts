import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/core/product';
import { environment } from '../../../environments/environment';
import { CartItem } from 'src/app/core/cart';
import * as helper from 'src/app/core/helpers';

@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {
  @Input() product: Product;
  @Output() addToCart = new EventEmitter<CartItem>();
  amount = 1;
  helper = helper;
  constructor() { }

  ngOnInit() {
  }

  add() {
    const item = new CartItem({
      productId: this.product.id,
      quantity: this.amount
    });
    this.addToCart.emit(item);
  }

}
