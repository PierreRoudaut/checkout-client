import { Component, OnInit, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular/ui/data-grid';
import { Product } from 'src/app/core/product';
import { ProductService } from 'src/app/core/product.service';
import { MatSnackBar } from '@angular/material';
import { remove } from 'lodash';
import * as helper from 'src/app/core/helpers';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {
  public helper = helper;
  @ViewChild(DxDataGridComponent) dataGrid: DxDataGridComponent;

  products: Product[] = [];

  constructor(private service: ProductService, private matSnackbar: MatSnackBar) { }

  ngOnInit() {
    this.service.list().subscribe(products => this.products = products);
  }

  onRowRemoving(e) {
    e.cancel = true;
    this.service
      .deleteProduct(e.data.id)
      .subscribe(
        () => {
          remove(this.products, u => u.id === e.data.id);
          this.matSnackbar.open('Product deleted', 'OK', { duration: 3000, panelClass: 'toast-primary' });
        },
        err => {
          this.matSnackbar.open(err.error.message, 'OK', { duration: 3000, panelClass: 'toast-warn' });
        });
  }

  onRowUpdating(e) {
    e.cancel = true;
    const updatedProduct = { ...e.oldData, ...e.newData };
    this.service
      .updateProduct(updatedProduct)
      .subscribe(
        () => {
          this.dataGrid.instance.cancelEditData();
          Object.assign(this.products.find(u => u.id === updatedProduct.id), updatedProduct);
          this.matSnackbar.open('Product updated', 'OK', { duration: 3000, panelClass: 'toast-primary' });
        },
        err => {
          this.matSnackbar.open(err.error.message, 'OK', { duration: 3000, panelClass: 'toast-warn' });
        });
  }

  onRowInserting(e) {
    e.cancel = true;
    this.service
      .createProduct(e.data)
      .subscribe(
        product => {
          this.dataGrid.instance.cancelEditData();
          this.products.push(product);
          this.matSnackbar.open('Product created', 'OK', { duration: 3000, panelClass: 'toast-primary' });
        },
        err => {
          this.matSnackbar.open(err.error.message, 'OK', { duration: 3000, panelClass: 'toast-warn' });
        });
  }

}
