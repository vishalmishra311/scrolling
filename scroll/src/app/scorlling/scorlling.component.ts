import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { CommonModule, NgFor } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PageEvent } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HeaderComponent } from "../header/header.component";




export interface Product {
  name: string;
  price: number;
  image: string;
}

@Component({
  selector: 'app-scorlling',
  standalone: true,
  imports: [CommonModule, NgFor, MatPaginatorModule, MatProgressSpinnerModule, HeaderComponent],
  templateUrl: './scorlling.component.html',
  styleUrl: './scorlling.component.scss'
})



export class ScorllingComponent implements OnInit {

  public products: Product[] = [];
  public totalItems: number  = 0;
  public pageSize: number = 8;
  public currentPage: number = 0; // paginator is 0-based
  public loading: boolean = false

  constructor(private productService: ProductService) {

  }


  ngOnInit(): void {
    this.loadProduct(this.currentPage, this.pageSize)
  }

  public loadProduct(currentPage: number, pageSize: number) {
    this.loading = true
    this.productService.getAllproduct(currentPage, pageSize).subscribe(res => {
      if (res) {
        {
          this.products = res.data,
          this.totalItems = res.total
          this.loading = false
        }
      }
    });
  }


  public getImageUrl(image: string) {
    return `http://localhost:3000/uploads/${image}`;
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadProduct(this.currentPage, this.pageSize);
  }

}
