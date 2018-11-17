import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ProductService } from 'src/app/core/product.service';
import { Product } from 'src/app/core/product';
import { MatGridList } from '@angular/material';
import { ObservableMedia } from '@angular/flex-layout';
import { trigger, transition, query, stagger, animate, style } from '@angular/animations';

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

  @ViewChild('grid')
  private grid: MatGridList;

  constructor(private productService: ProductService, private media: ObservableMedia) { }

  ngOnInit() {
    this.grid.cols = 1;
    this.productService.list().subscribe(p => this.products = p);
  }

  ngAfterViewInit() {
    this.updateGrid();
    this.media.subscribe(change => { this.updateGrid(); });
  }

  updateGrid(): void {
    if (this.media.isActive('xl')) {
      this.grid.cols = 5;
    } else if (this.media.isActive('lg')) {
      this.grid.cols = 4;
    } else if (this.media.isActive('md')) {
      this.grid.cols = 3;
    } else if (this.media.isActive('sm')) {
      this.grid.cols = 2;
    } else if (this.media.isActive('xs')) {
      this.grid.cols = 1;
    }
  }

}
