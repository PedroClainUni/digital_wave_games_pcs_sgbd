import { CartItem } from "../models";
import { PostCartItemDTO } from "../models";
import { PutCartItemDTO } from "../models";

export interface ICartItemsRepository {

  getCartItemsByCart(cartId: number): Promise<CartItem[]>;
  postCartItem(postCartDTO: PostCartItemDTO): Promise<number[]>;
  putCartItem(putCartDTO: PutCartItemDTO, cartItemId: number): Promise<number | null>;
  deleteCartItem(cartItemId: number): Promise<void>;
}
