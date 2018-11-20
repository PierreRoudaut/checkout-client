import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductService } from 'src/app/core/product.service';
import { Product } from 'src/app/core/product';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { trigger, transition, query, stagger, animate, style } from '@angular/animations';
import { CartService } from 'src/app/core/cart.service';
import { Cart, CartItem } from 'src/app/core/cart';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss'],
  animations: [
    trigger('shopItemsAnimation', [
      transition('* => *', [
        query(':leave', [
          stagger(100, [
            animate('0.2s', style({ transform: 'scale(0)', opacity: 0 }))
          ])
        ], { optional: true }),
        query(':enter', [
          style({ transform: 'scale(0.5)', opacity: 0.1 }),
          stagger(100, [
            animate('0.2s', style({ transform: 'scale(1)', opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
export class ShopPageComponent implements OnInit {
  products: Product[] = [];
  cart: Cart = null;

  @ViewChild('sidenav')
  private sidenav: MatSidenav;

  constructor(private productService: ProductService,
    private cartService: CartService,
    public matSnackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.productService.list().subscribe(p => this.products = p);
    this.cartService.getCart().subscribe(c => this.cart = c);
  }

  get nbItems() {
    if (!this.cart || !this.cart.cartItems) {
      return 0;
    }
    return Object.keys(this.cart.cartItems).length;
  }

  addToCart(cartItem: CartItem) {
    let item = this.cart.cartItems[cartItem.productId];
    if (item) {
      item.quantity += cartItem.quantity;
    } else {
      item = cartItem;
    }
    this.cartService.setItem(this.cart.id, item).subscribe(() => {
      this.cart.cartItems[item.productId] = item;
      this.cart = Object.assign({}, this.cart);
      if (!this.sidenav.opened) {
        this.sidenav.open();
      }
    }, error => {
      this.matSnackBar.open(error.message, 'OK', {
        duration: 3000,
        panelClass: 'toast-warn'
      });
    });
  }

  debug(obj: any) {
    alert(JSON.stringify(obj));
  }

  removeItem(productId: number) {
    this.cartService
      .removeItem(this.cart.id, productId)
      .subscribe(() => {
        delete this.cart.cartItems[productId];
        this.cart = Object.assign({}, this.cart);
        if (this.nbItems === 0) {
          this.sidenav.close();
        }
      }, error => {
        this.matSnackBar.open(error.message, 'OK', {
          duration: 3000,
          panelClass: 'toast-warn'
        });
      });
  }

  clear() {
    this.cartService
      .clear(this.cart.id)
      .subscribe(() => {
        this.cart.cartItems = {};
        this.cart = Object.assign({}, this.cart);
        this.sidenav.close();
      }, error => {
        this.matSnackBar.open(error.message, 'OK', {
          duration: 3000,
          panelClass: 'toast-warn'
        });
      });
  }

}
