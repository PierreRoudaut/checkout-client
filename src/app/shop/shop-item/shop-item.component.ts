import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/core/product';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-shop-item',
  templateUrl: './shop-item.component.html',
  styleUrls: ['./shop-item.component.scss']
})
export class ShopItemComponent implements OnInit {

  @Input() product: Product;

  constructor() { }

  get productImgUrl() {
    return `${environment.apiEndpoint}/api/public/images/products/${this.product.imageFilename}`;
  }

  ngOnInit() {
  }

}
