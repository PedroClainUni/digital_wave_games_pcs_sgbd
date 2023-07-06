import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { PostOrderDTO } from '../models/dto/postOrder.dto'
import { Observable } from 'rxjs';
import { OrderItem } from '../models/orderItem.model';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  postOrder(postOrderDTO: PostOrderDTO){ 
    return this.http.post<number[]>(`${environment.baseUrl}/store/order`, postOrderDTO).subscribe(); 
  }

  getOrderItems(orderId: number): Observable<OrderItem[]>{ 
    return this.http.get<OrderItem[]>(`${environment.baseUrl}/store/order/${orderId}/items`); 
  }

  getOrdersByClient(clientId: number): Observable<Order[]>{ 
    return this.http.get<Order[]>(`${environment.baseUrl}/clients/user/${clientId}/orders`); 
  }
}