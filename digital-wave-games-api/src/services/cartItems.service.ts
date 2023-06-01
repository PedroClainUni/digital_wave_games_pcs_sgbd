import { CartItem, PostCartItemDTO, PutCartItemDTO } from '../models';
import { ICartItemsRepository } from '../interfaces';
import logger from '../utils/logger';

export class CartItemsService {

    constructor(private cartItemsRepository: ICartItemsRepository) { }

    async getCartItemsByCart(cartId: number): Promise<CartItem[]> {

        try {
            const response = await this.cartItemsRepository.getCartItemsByCart(cartId);

            return response;

        } catch (error: any) {
            throw new Error(error);
        }
    }

    async postCartItem(postCartItemDTO: PostCartItemDTO): Promise<number[]> {

       try {

        const cartItem: PostCartItemDTO = {
            cartId: postCartItemDTO.cartId,
            productId: postCartItemDTO.productId,
            amount: postCartItemDTO.amount
        }


        return await this.cartItemsRepository.postCartItem(cartItem)
       
        } catch (error: any) {
           logger.error(error);
           throw Error(error);
       }

    }

    async putCartItem(putCartItemDTO: PutCartItemDTO, cartItemId: number): Promise<number | null> {
        try {

        const cartItem: PutCartItemDTO = {
            amount: putCartItemDTO.amount
        }

        return await this.cartItemsRepository.putCartItem(cartItem, cartItemId);
       
        } catch (error: any) {
           logger.error(error);
           throw Error(error);
       }

    }

    async deleteCartItem(cartItemId: number): Promise<void> {
        try {
    
            return await this.cartItemsRepository.deleteCartItem(cartItemId);
           
            } catch (error: any) {
               logger.error(error);
               throw Error(error);
           }

    }
}
