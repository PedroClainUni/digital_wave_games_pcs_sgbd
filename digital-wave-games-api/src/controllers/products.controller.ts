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
            nome,
            preco,
            descricao,
            estoque,
            plataforma,
        } = request.body;
        if(request.body != undefined){
        try {
            const result = await this.productsService.savem({
                nome: nome,
                preco: preco,
                descricao: descricao,
                estoque: estoque,
                plataforma: plataforma,
            });
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
    else{
        return response.status(400).json({
            message: 'Unexpected error.'
        })
    }
    }

     async put(request: Request, response: Response): Promise<Response> {
         const {
             id,
             nome,
             preco,
             descricao,
             estoque,
             plataforma,
         } = request.body;
         try {
             const result = await this.productsService.update({
                 _id: id,
                 nome: nome,
                 preco: preco,
                 descricao: descricao,
                 estoque: estoque,
                 plataforma: plataforma,
             });
             return response.send(result);

         } catch (error: any) {
             return response.status(400).json({
                 message: error.message || 'Unexpected error.'
             })
         }


     }

     async delete(request: Request, response: Response): Promise<Response> {
         try {
            const id = request.params.id
            const result = await this.productsService.deleteM(id);
            return response.send(result);

         } catch (error: any) {
             return response.status(400).json({
                 message: error.message || 'Unexpected error.'
             })
         }

     }
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
