import { PostCartDTO, Cart, CartItem, PostCartItemDTO } from '../models';

export interface ICartsRepository {

  // getCart(cartId: number): Promise<Cart | null>;
  postCart(postCartDTO: PostCartDTO): Promise<number[]> | null;
  getCartByUserId(clientId: number): Promise<Cart | null>;
  getCartItems(cartId: number): Promise<CartItem[]>;
  addCartItem(postCartItemDTO: PostCartItemDTO): Promise<number[]>
  // cleanCart(cartId: number): Promise<boolean>;
  // getTotalPrice(cartId: number): Promise<number>;
}
