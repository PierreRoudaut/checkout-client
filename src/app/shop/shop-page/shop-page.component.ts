import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { ProductService } from 'src/app/core/product.service';
import { Product } from 'src/app/core/product';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { trigger, transition, query, stagger, animate, style } from '@angular/animations';
import { CartService } from 'src/app/core/cart.service';
import { Cart, CartItem } from 'src/app/core/cart';
import { SignalRService } from 'src/app/core/signalR.service';
import { findIndex, remove } from 'lodash';


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
  cart: Cart = this.newCart();

  @ViewChild('sidenav')
  private sidenav: MatSidenav;
  constructor(private productService: ProductService,
    private cartService: CartService,
    public matSnackBar: MatSnackBar,
    private signalrService: SignalRService,
    private zone: NgZone) {
    this.cartExpired = this.cartExpired.bind(this);
    this.productUpdated = this.productUpdated.bind(this);
    this.productDeleted = this.productDeleted.bind(this);
  }

  newCart() {
    return new Cart({
      id: '_',
      cartItems: {}
    });
  }

  ngOnInit() {
    this.productService.list().subscribe(p => this.products = p);
    this.cartService.getCart().subscribe(c => {
      this.cart = c;
    });

    this.signalrService.connectionEstablished.subscribe(() => {
      console.log('Shope page: Hub connection established');
    });

    this.signalrService.cartExpired.subscribe(this.cartExpired);
    this.signalrService.productUpdated.subscribe(this.productUpdated);
    this.signalrService.productDeleted.subscribe(this.productDeleted);
  }

  productDeleted(product: Product) {
    console.log('Product deleted');
    remove(this.products, p => p.id === product.id);
    this.products = Object.assign([], this.products);
  }

  productUpdated(product: Product) {
    console.log('Product updated');
    console.log(product);
    product.available = product.stock - product.retained;
    const idx = findIndex(this.products, p => p.id === product.id);
    if (idx !== -1) {
      this.products[idx] = product;
    } else {
      this.products.push(product);
    }
    this.products = Object.assign([], this.products);
  }

  cartExpired(cartId: string) {
    console.log('Cart expired');
    console.log(cartId);
    this.sidenav.close();
    if (this.cart.id === cartId) {
      this.matSnackBar.open('Your cart has expired', 'OK', {
        duration: 3000,
        panelClass: 'toast-primary'
      });
      this.cart = this.newCart();
    }
  }

  get nbItems() {
    return Object.keys(this.cart.cartItems).length;
  }

  addToCart(cartItem: CartItem) {
    let item = this.cart.cartItems[cartItem.productId];
    if (item) {
      item.quantity += cartItem.quantity;
    } else {
      item = cartItem;
    }
    this.cartService.setItem(this.cart.id, item).subscribe(cart => {
      this.cart = cart;
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

  removeItem(productId: number) {
    this.cartService
      .removeItem(this.cart.id, productId)
      .subscribe(cart => {
        this.cart = cart;
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
      .subscribe(cart => {
        this.cart = cart;
        this.sidenav.close();
      }, error => {
        this.matSnackBar.open(error.message, 'OK', {
          duration: 3000,
          panelClass: 'toast-warn'
        });
      });
  }

}
