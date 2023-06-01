import { ICartItemsRepository } from '../interfaces';
import { PutCartItemDTO, PostCartItemDTO, CartItem } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class CartItemsRepository implements ICartItemsRepository{

  async getCartItemsByCart(cartId: number): Promise<CartItem[]> {
    let cartItems: CartItem[] = [];
    
    const sql = `SELECT * FROM item_carrinho where id_carrinho=?`;
    try {
        await mysqlDatabase.default.raw(sql, [cartId || null]).then(data => {
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

        }).catch(err => {
            logger.error(err);
            throw new Error(err);
        });

    } catch (error: any) {
        logger.error(error);
        throw new Error(error);
    }

    return cartItems;
  }

  async postCartItem(postCartItemDTO: PostCartItemDTO): Promise<number[]> {
    let index: number[] = [];
    
    try {

        await mysqlDatabase
        .default('item_carrinho')
        .returning('id')
        .insert([{
            id_carrinho: postCartItemDTO.cartId || null,
            id_produto: postCartItemDTO.productId || null,
            quantidade: postCartItemDTO.amount || null
        }
        ]).then( insertedIndex => {
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

  async putCartItem(putCartItemDTO: PutCartItemDTO, cartItemId: number): Promise<number | null> {
    let index: number | null = null;

    try {

        mysqlDatabase
        .default('item_carrinho')
        .update({quantidade: putCartItemDTO.amount})
        .where({id: cartItemId})
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

  async deleteCartItem(cartItemId: number): Promise<void> {
    try {

        mysqlDatabase
        .default('item_carrinho')
        .delete()
        .where({id: cartItemId})
        .catch((error: any) => {
          logger.error(error);
          throw new Error(error);
      });
      
    } catch (error: any) {
        logger.error(error);
        throw new Error(error);
    }
    return;
  }
 


}
