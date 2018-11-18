import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
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
export class ShopPageComponent implements OnInit, AfterViewInit {

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

  ngAfterViewInit() {
  }


  addToCart(cartItem: CartItem) {
    let item = this.cart.cartItems[cartItem.productId];
    if (item) {
      item.quantity += cartItem.quantity;
    } else {
      item = cartItem;
    }
    this.cartService.setItem(this.cart.id, cartItem).subscribe(() => {
      this.cart.cartItems[item.productId] = item;
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

}
