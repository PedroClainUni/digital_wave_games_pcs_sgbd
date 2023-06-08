import { IProductsRepository } from '../interfaces';
import {ProductM, IProduct} from '../models/schemas/product.Schema'
import { PostProductDTO, Product, PutProductDTO, ResponseBody } from '../models';
import logger from '../utils/logger';

export class ProductsService {

    constructor(private productsRepository: IProductsRepository) { }

    async getAll(): Promise<ResponseBody<Product[]>> {

        let products: Product[] = [];

        try {
            const response: Product[] = await this.productsRepository.getProducts();
            for (let product of response) {
                const id: number = product.id != null ? product.id : -1;
                products.push({
                    id: id,
                    nome: product?.nome,
                    descricao: product?.descricao,
                    preco: product?.preco,
                    estoque: product?.estoque,
                });
            }
        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
        return { success: true, body: products}
    }

    async getAllM(): Promise<ResponseBody<typeof ProductM[]>>{
        let products: typeof ProductM[] = []

        try {
            const response: typeof ProductM[] = await ProductM.find();
            products = response;
        } catch (error:any) {
            logger.error(error);
            throw new Error(error);
        }
        return{success:true, body:products}
    }

    async getById(id: number): Promise<ResponseBody<Product>> {
        let response: ResponseBody<Product>;

        try {
            const product: Product | null = await this.productsRepository.getById(id);
            if (!product) return { success: false, message: 'Product not found' }
            response = {
                success: true,
                body: {
                    id: product?.id,
                    nome: product?.nome,
                    descricao: product?.descricao,
                    preco: product?.preco,
                    estoque: product?.estoque,
                }
            }

        } catch (error: any) {
            throw new Error(error);
        }
        return response;
    }

    // async delete(id: number): Promise<void> {
    //     try {

    //         await this.productsRepository.deleteProduct(id);

    //     } catch (error: any) {
    //         logger.error(error);
    //         throw new Error(error);
    //     }
    // }

    // async update(dto: PutProductDTO): Promise<void> {
    //     try {

    //         await this.productsRepository.putProduct(dto);

    //     } catch (error: any) {
    //         logger.error(error);
    //         throw new Error(error);
    //     }

    // }

    async save(dto: PostProductDTO): Promise<ResponseBody<{ id: number }>> {
        try {

            const response = await this.productsRepository.save(dto);
            return { success: true, body: { id: response[0] } }

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }
}
