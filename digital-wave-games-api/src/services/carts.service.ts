import { PostCartDTO, Cart, CartItem, ResponseBody, PostCartItemDTO } from '../models';
import { ICartsRepository } from '../interfaces';
import logger from '../utils/logger';

export class CartsService {

    constructor(private cartsRepository: ICartsRepository) { }

    async getCartByUser(clientId: number): Promise<ResponseBody<{ cart: Cart, items: CartItem[] }>> {
        try {
            const cart: Cart | null = await this.cartsRepository.getCartByUserId(clientId);
            if (!cart) return { success: false, message: 'Cart not found' };

            const cartItens: CartItem[] = await this.cartsRepository.getCartItems(cart.id!);
            return {
                success: true,
                body: {
                    cart: cart,
                    items: cartItens
                }
            };

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async addCartItem(postCartItemDTO: PostCartItemDTO): Promise<number[] | null> {
        try {
            const response: number[] | null = await this.cartsRepository.addCartItem(postCartItemDTO);
            return response;
        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }

    // async cleanCart(cartId: number): Promise<boolean> {
    //     try {
    //         return this.cartsRepository.cleanCart(cartId);

    //     } catch (error: any) {
    //         logger.error(error);
    //         throw new Error(error);
    //     }
    // }

    async postCart(postCartDTO: PostCartDTO): Promise<number[] | null> {

        try {

            const response: number[] | null = await this.cartsRepository.postCart(postCartDTO);

            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }
}
