import { Injectable, Injector } from '@angular/core';
import { APIService } from './api.service';
import { Observable, of } from 'rxjs';
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
    const cardId = localStorage.getItem('cartId');
    localStorage.removeItem('cartId');
    if (!cardId) {
      return of(new Cart({
        id: '_',
        cartItems: {}
      }));
    }
    return this.httpClient
      .get<Cart>(this.API_URL + '/' + cardId)
      .pipe(map(c => new Cart(c)));
  }

  /**
   * Update the desired quantity of an item into the cart
   * Creates the cart if non exists
   * @param cartId unique id of a cart
   * @param cartItem item to add
   */
  setItem(cartId: string, cartItem: CartItem): Observable<Cart> {
    const body = JSON.stringify(cartItem);
    return this.httpClient
      .post<any>(`${this.API_URL}/${cartId}/setItem`, body, this.options)
      .pipe(
        map(c => new Cart(c)),
        tap(c => {
          localStorage.setItem('cartId', c.id);
        }));
  }

  /**
   * Remove an item for a given cart
   * @param cartId Unique cart id
   * @param productId Product id
   */
  removeItem(cartId: string, productId: number): Observable<Cart> {
    return this.httpClient
      .delete<any>(`${this.API_URL}/${cartId}/removeItem/${productId}`)
      .pipe(
        map((c) => new Cart(c)));
  }

  /**
   * Clear the content of a cart
   * @param cartId Unique cart id
   */
  clear(cartId: string): Observable<Cart> {
    return this.httpClient.post<any>(`${this.API_URL}/${cartId}/clear`, null)
      .pipe(
        map((c) => new Cart(c)));
  }

}
