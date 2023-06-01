import { mysqlDatabase } from '../databases';
import { IProductsRepository } from '../interfaces';
import { PostProductDTO, Product, PutProductDTO } from '../models';
import logger from '../utils/logger';

export class ProductsRepository implements IProductsRepository {

    async getProducts(): Promise<Product[]> {

        let products: Product[] = [];

        const sql = `SELECT * FROM produto;`;

        try {
            await mysqlDatabase.default.raw(sql).then(data => {
                if (data[0].length > 0) {
                    data[0].forEach(async(result: any) => {
                        products.push({
                            id: result['id'],
                            nome: result['nome'],
                            preco: result['preco'],
                            estoque: result['quantidade'],
                            descricao: result['descricao'],
                            plataforma: result['plataforma']
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
        return products;
    }

    async getById(id: number): Promise<Product | null> {

        let product: Product | null = null;
        
        const sql = `SELECT * FROM produto WHERE id=?`;
        try {
            await mysqlDatabase.default.raw(sql, [id || null]).then(data => {
                if (data[0].length > 0) {
                    data[0].forEach(async(result: any) => {
                        product = {
                            id: result['id'],
                            nome: result['nome'],
                            preco: result['preco'],
                            estoque: result['quantidade'],
                            descricao: result['descricao'],
                            plataforma: result['plataforma']
                        };
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
        return product;
    }

    async save(dto: PostProductDTO): Promise<number[]> {
        let index: number[] = [];
        try {
            await mysqlDatabase.default('produto')
                .returning('id')
                .insert([{
                    nome: dto.name || null,
                    preco: dto.price || null,
                    estoque: dto.amount || null,
                    descricao: dto.description || null,
                    plataforma: dto.platform || null,
                }])
                .then((insertedIndex) => {
                    index = insertedIndex
                })
                .catch(err => {
                    logger.error(err);
                    throw new Error(err);
                });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
        return index;
    }

    // async putProduct(dto: PutProductDTO): Promise<void> {
    //     try {
    //         await mysqlDatabase
    //             .default("produto")
    //             .update({
    //                 nome: dto.nome || null,
    //                 preco: dto.preco || null,
    //                 estoque: dto.estoque || null,
    //                 descricao: dto.descricao || null,
    //                 plataforma: dto.plataforma || null,
    //         })
    //         .where({id: dto.id})
    //     } catch (error: any) {
    //         logger.error(error);
    //         throw new Error(error);
    //     }
    // }

    // async deleteProduct(id: number): Promise<void> {
    //     try {

    //         mysqlDatabase
    //         .default('produto')
    //         .delete()
    //         .where({id: id})
    //         .catch((error: any) => {
    //           logger.error(error);
    //           throw new Error(error);
    //       });
          
    //     } catch (error: any) {
    //         logger.error(error);
    //         throw new Error(error);
    //     }
    // }
}
