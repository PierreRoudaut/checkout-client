import { Injectable, Injector } from '@angular/core';
import { APIService } from './api.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Product } from './product';
import { Cart, CartItem } from './cart';


@Injectable({
  providedIn: 'root'
})
export class CartService extends APIService {

  protected readonly API_URL = this.API_BASE_URL + '/cart';

  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * Get cart for user
   */
  getCart(): Observable<Cart> {
    let cardId = localStorage.getItem('cartId');
    if (!cardId) {
      cardId = '_';
    }
    return this.httpClient
      .get<Cart>(this.API_URL + '/' + cardId)
      .pipe(
        tap((c) => {
          localStorage.setItem('cartId', c.id);
        }),
        map(c => new Cart(c)));
  }

  /**
   * add or update a cartItem and it's quantity into the cart
   */
  setItem(cartId: string, cartItem: CartItem): Observable<boolean> {
    const body = JSON.stringify(cartItem);
    return this.httpClient
      .post<boolean>(`${this.API_URL}/${cartId}/setItem`, body, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
  }

  removeItem(cartId: string, productId: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`${this.API_URL}/${cartId}/removeItem/${productId}`);
  }

  clear(cartId: string): Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.API_URL}/${cartId}/clear`, null);
  }

}
