import { Component, OnInit, Input } from '@angular/core';
import { Cart } from 'src/app/core/cart';
import { Product } from 'src/app/core/product';

@Component({
  selector: 'app-shop-cart',
  templateUrl: './shop-cart.component.html',
  styleUrls: ['./shop-cart.component.scss']
})
export class ShopCartComponent implements OnInit {

  @Input() cart: Cart;

  @Input() products: Product[];


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
