import { Response, Request } from 'express';
import { ProductsService } from '../services';

export class ProductsController {

    constructor(private productsService: ProductsService) {}

    async getAll(request: Request, response: Response): Promise<Response> {

        try {

            const result = await this.productsService.getAll();

            return response.json(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async getById(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.productsService.getById(Number(request.params.id));
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
            const result = await this.productsService.save({
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
}
