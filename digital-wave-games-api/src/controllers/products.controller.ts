import { Response, Request } from 'express';
import { ProductsService } from '../services';
import { Types } from 'mongoose';

export class ProductsController {

    constructor(private productsService: ProductsService) {}

    async getAll(request: Request, response: Response): Promise<Response> {

        try {

            const result = await this.productsService.getAllM();

            return response.json(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async getById(request: Request, response: Response): Promise<Response> {
        try {
            const id = request.params.id
            const result = await this.productsService.getByIdM(id);
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async save(request: Request, response: Response): Promise<Response> {
        const {
            name,
            price,
            description,
            amount,
            platform,
        } = request.body;
        try {
            const result = await this.productsService.savem({
                name: name,
                price: price,
                description: description,
                amount: amount,
                platform: platform,
            });
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    // async put(request: Request, response: Response): Promise<Response> {
    //     const {
    //         id,
    //         nome,
    //         preco,
    //         descricao,
    //         estoque,
    //         plataforma,
    //     } = request.body;
    //     try {
    //         const result = await this.productsService.update({
    //             id: id,
    //             nome: nome,
    //             preco: preco,
    //             descricao: descricao,
    //             estoque: estoque,
    //             plataforma: plataforma,
    //         });
    //         return response.send(result);

    //     } catch (error: any) {
    //         return response.status(400).json({
    //             message: error.message || 'Unexpected error.'
    //         })
    //     }


    // }

    // async delete(request: Request, response: Response): Promise<Response> {
    //     try {
    //         const result = await this.productsService.delete(Number(request.params.id));
    //         return response.send(result);

    //     } catch (error: any) {
    //         return response.status(400).json({
    //             message: error.message || 'Unexpected error.'
    //         })
    //     }

    // }
/*
    async buyProduct(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.productsService.buyProduct(Number(request.params.quantity), Number(request.params.id));
            return response.send(result);
        }
        catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
    */
}
