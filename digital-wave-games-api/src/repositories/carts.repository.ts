import { ICartsRepository } from '../interfaces';
import { Cart, CartItem, PostCartDTO, PostCartItemDTO } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class CartsRepository implements ICartsRepository {

    // async getCart(cartId: number): Promise<Cart | null> {

    //     let cart: Cart | null = null;

    //     const sql = `SELECT * FROM carrinho where id=?`;
    //     try {
    //         await mysqlDatabase.default.raw(sql, [cartId || null]).then(data => {
    //             if (data[0].length > 0) {
    //                 data[0].forEach((result: any) => {

    //                     cart = {
    //                         id: result['id'],
    //                         cartId: result['id_carrinho']
    //                     };
    //                 });
    //             }

    //         }).catch(err => {
    //             logger.error(err);
    //             throw new Error(err);
    //         });

    //     } catch (error: any) {
    //         logger.error(error);
    //         throw new Error(error);
    //     }

    //     return cart;

    // }

    async getCartByUserId(userId: number): Promise<Cart | null> {

        let cart: Cart | null = null;

        const sql = `SELECT * FROM carrinho where car_id_conta = ?`;
        try {
            await mysqlDatabase.default.raw(sql, [userId || null]).then((data: any) => {
                if (data[0].length > 0) {
                    data[0].forEach((result: any) => {

                        cart = {
                            id: result['id'],
                            userId: result['car_id_conta']
                        };
                    });
                }

            }).catch((err: any) => {
                logger.error(err);
                throw new Error(err);
            });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return cart;

    }

    async getCartItems(cartId: number): Promise<CartItem[]> {
        let cartItems: CartItem[] = [];

        const sql = `SELECT * FROM itemcarrinho where id_carrinho = ?`;
        try {
            await mysqlDatabase.default.raw(sql, [cartId || null]).then((data: any) => {
                if (data[0].length > 0) {
                    data[0].forEach((result: any) => {

                        cartItems.push({
                            id: result['id'],
                            cartId: result['id_carrinho'],
                            productId: result['id_produto'],
                            amount: result['quantidade']
                        });

                    });
                }

            }).catch((err: any) => {
                logger.error(err);
                throw new Error(err);
            });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return cartItems;
    }

    async addCartItem(postCartItemDTO: PostCartItemDTO): Promise<number[]> {
        let index: number[] = [];

        try {
            await mysqlDatabase
                .default('itemcarrinho')
                .returning('id')
                .insert([{
                    id_carrinho: postCartItemDTO.cartId || null,
                    id_produto: postCartItemDTO.productId || null,
                    quantidade: postCartItemDTO.amount || null
                }
                ]).then((insertedIndex: any) => {
                    index = insertedIndex;
                })
                .catch((error: any) => {
                    logger.error(error);
                    throw new Error(error);
                });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return index;
    }

    // async getTotalPrice(cartId: number): Promise<number> {

    //     let totalPrice = 0;

    //     const sql = `SELECT sum(ic.quantidade * p.preco) as sum FROM item_carrinho as ic join produto as p on ic.id_produto = p.id where id_carrinho=?`;
    //     try {
    //         await mysqlDatabase.default.raw(sql, [cartId || null]).then(data => {
    //             if (data[0].length > 0) {
    //                 data[0].forEach((result: any) => {

    //                     totalPrice = result['sum'];
    //                 });
    //             }

    //         }).catch(err => {
    //             logger.error(err);
    //             throw new Error(err);
    //         });

    //     } catch (error: any) {
    //         logger.error(error);
    //         throw new Error(error);
    //     }

    //     return totalPrice;

    // }

    /* Possível refatoração do código de getTotalPrice? Testar depois:
    
    async getTotalPrice(cartId: number): Promise<number> {
    const sql = `SELECT sum(ic.quantidade * p.preco) as sum FROM item_carrinho as ic join produto as p on ic.id_produto = p.id where id_carrinho=?`;
    try {
        const data = await mysqlDatabase.default.raw(sql, [cartId || null]);
        if (data[0].length > 0) {
            return data[0][0]['sum'];
        }
    } catch (error: any) {
        logger.error(error);
        throw new Error(error);
    }
    return 0;
}
*/

    async postCart(postCartDTO: PostCartDTO): Promise<number[]> {

        let index: number[] = [];

        try {

            await mysqlDatabase
                .default('carrinho')
                .returning('id')
                .insert([{
                    car_id_conta: postCartDTO.clientId || null,
                }
                ]).then((insertedIndex: any) => {
                    index = insertedIndex;
                })
                .catch((error: any) => {
                    logger.error(error);
                    throw new Error(error);
                });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return index;
    }

    // async cleanCart(cartId: number): Promise<boolean> {

    //     const sql = `DELETE FROM item_carrinho WHERE id_carrinho=?`;
    //     try {
    //         await mysqlDatabase.default.raw(sql, [cartId || null]).then()
    //             .catch(err => {
    //                 logger.error(err);
    //                 throw new Error(err);
    //             });

    //     } catch (error: any) {
    //         logger.error(error);
    //         throw new Error(error);
    //     }
    //     return true;
    // }



}
