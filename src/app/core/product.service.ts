import { Injectable, Injector } from '@angular/core';
import { APIService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class ProductService extends APIService {

  protected readonly API_URL = this.API_BASE_URL + '/products';

  constructor(injector: Injector) {
    super(injector);
  }

  /**
   * List all products
   */
  list(): Observable<Product[]> {
    return this.httpClient
      .get<any[]>(this.API_URL)
      .pipe(map(items => items.map(i => new Product(i))));
  }

  /**
   * Creates a new product
   * @param product with product image
   */
  createProduct(product: Product): Observable<Product> {
    const body = JSON.stringify(product);
    return this.httpClient
      .post<Product>(`${this.API_URL}/create`, body, this.options)
      .pipe(map(p => new Product(p)));
  }

  /**
   * Updates an existing product
   * @param product with product image
   */
  updateProduct(product: FormData): Observable<Product> {
    const body = JSON.stringify(product);
    return this.httpClient
      .post<Product>(`${this.API_URL}/update`, body, this.options)
      .pipe(map(p => new Product(p)));
  }

  /**
   * Delete an existing product
   * @param productId product to delete
   */
  deleteProduct(productId: number): Observable<boolean> {
    return this.httpClient
      .delete<boolean>(`${this.API_URL}/delete/${productId}`);
  }
}
