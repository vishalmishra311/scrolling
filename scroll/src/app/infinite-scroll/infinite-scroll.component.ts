import { Component, OnInit } from '@angular/core';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from "../header/header.component";

export interface Product {
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-infinite-scroll',
  imports: [InfiniteScrollDirective, CommonModule, MatProgressSpinnerModule, HeaderComponent],
  templateUrl: './infinite-scroll.component.html',
  styleUrl: './infinite-scroll.component.scss'
})
export class InfiniteScrollComponent implements OnInit{


  products: Product[] = [];
  public page: number =  0;
  public limit: number =10;
  public loading: boolean = false;
  constructor(private productService: ProductService) {}
  ngOnInit() {
    this.loadProducts();
  }

  private loadProducts() {
    if (this.loading) return;
    this.loading = true;
    this.productService.getAllproduct(this.page, this.limit)
      .subscribe(res => {
        this.products.push(...res.data);
        this.page++;
        this.loading = false;
      });
  }

  public onScroll() {
    this.loadProducts();
  }
}
