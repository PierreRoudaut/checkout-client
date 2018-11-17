import { Injectable, Injector } from '@angular/core';
import { APIService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class CartService extends APIService {

  protected readonly API_URL = this.API_BASE_URL + '/cart';

  constructor(injector: Injector) {
    super(injector);
  }


    /**
     * List all products
     */
    get(): Observable<Product[]> {
      return this.httpClient
          .get<any[]>(this.API_URL)
          .pipe(map(items => items.map(i => new Product(i))));
  }
}
