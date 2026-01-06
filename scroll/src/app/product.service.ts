import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


export interface product {
  name:string,
  price:number,
  image:string
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';
  private apiUrlForProduct = 'http://localhost:3000/products/getAllProduct';


  constructor(private http: HttpClient) { }

  public addProduct(formData: FormData): Observable<product> {
    console.log("coming");
    console.log(formData);
    
    return this.http.post<product>(this.apiUrl, formData);
  }

   public getAllproduct(page:number,limit:number){
    console.log("coming");
    return this.http.get<{data:product[] , total:number}>(`${this.apiUrlForProduct}?page=${page}&limit=${limit}`);
  }
}
