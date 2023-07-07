import { Product } from '../models/product/product.modelnewdata';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { ProductRegistrationDTO } from '../models/dto/product/productRegistrationDTO';
import { PutProductDTO } from '../models/dto/product/putProduct.dto';
import { ApiResponse } from '../models/dto/apiResponse.dto';


@Injectable({
  providedIn: 'root'
})

export class ProductService {
  products: Product[];

  constructor(private http: HttpClient) { }

  getProducts(): any {
    return this.http.get<ApiResponse<Product[]>>(`${environment.baseUrl}/store/products`);
  }

  getProduct(productId: string): Observable<Product> {
    return this.http.get<Product>(`${environment.baseUrl}/store/product/${productId}`);
  }

  postProduct(dto: ProductRegistrationDTO): void {
    this.http.post<number[]>(`${environment.baseUrl}/store/product`, dto).subscribe();
  }

  putProduct(dto: PutProductDTO): void {
    this.http.put<void>(`${environment.baseUrl}/store/product`, dto).subscribe();
  }

  deleteProduct(productId: string): void {
    this.http.delete<void>(`${environment.baseUrl}/store/product/${productId}`).subscribe();
  }
}
