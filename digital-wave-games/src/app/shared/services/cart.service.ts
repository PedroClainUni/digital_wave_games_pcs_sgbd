import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { CartItem } from '../models/cartItem.model';
import { Cart } from '../models/cart.model';
import { PostCartItemDTO } from '../models/dto/cartItem/postCartItem.dto';
import { PutCartItemDTO } from '../models/dto/cartItem/putCartItem.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient) { }

  getCartItems(cartId: number):Observable<CartItem[]>{
    return this.http.get<CartItem[]>(`${environment.baseUrl}/store/cart/${cartId}/items`);
  }

  getCartByClient(clientId: number):Observable<Cart>{
    return this.http.get<Cart>(`${environment.baseUrl}/users/${clientId}/cart`);
  }

  postCartItem(postCartItemDTO: PostCartItemDTO){
    return this.http.post<number[]>(`${environment.baseUrl}/store/cart/items`, postCartItemDTO).subscribe();
  }

  putCartItem(putCartItemDTO: PutCartItemDTO, cartItemId: number){
    return this.http.put<void>(`${environment.baseUrl}/store/cart/items/${cartItemId}/`, putCartItemDTO).subscribe();

  }

  deleteCartItem(cartItemId: number) {
    return this.http.delete<void>(`${environment.baseUrl}/store/cart/items/${cartItemId}`).subscribe();

  }

  cleanCart(cartId: number) {
    return this.http.delete<void>(`${environment.baseUrl}/store/cart/${cartId}/clean`).subscribe();
  }
}
