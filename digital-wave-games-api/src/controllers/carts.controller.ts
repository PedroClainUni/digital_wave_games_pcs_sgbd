import { Response, Request } from 'express';
import { CartsService, CartItemsService } from '../services';

export class CartsController {

    constructor(private cartsService: CartsService, private cartItemsService: CartItemsService) {}

    
    async getCartItems(request: Request, response: Response): Promise<Response> {

        try {

            const result = await this.cartItemsService.getCartItemsByCart(parseInt(request.params.cart_id));
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async cleanCart(request: Request, response: Response): Promise<Response> {

        try {
            await this.cartsService.cleanCart(parseInt(request.params.cart_id));
            return response.status(200);
        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async postCart(request: Request, response: Response): Promise<Response> {
        const {
            clientId
         } = request.body;

        try {

            const result = await this.cartsService.postCart({
                clientId: clientId
            });

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async postCartItem(request: Request, response: Response): Promise<Response> {
        const {
            cartId,
            productId,
            amount
         } = request.body;

        try {

            const result = await this.cartItemsService.postCartItem({
                cartId: cartId,
                productId: productId,
                amount: amount
            });

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async putCartItem(request: Request, response: Response): Promise<Response> {
        const {
            amount
         } = request.body;

        try {

            const result = await this.cartItemsService.putCartItem({
                amount: amount
            }, parseInt(request.params.item_id));

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async deleteCartItem(request: Request, response: Response): Promise<Response> {
        
        try {

            const result = await this.cartItemsService.deleteCartItem(parseInt(request.params.item_id));
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
}
