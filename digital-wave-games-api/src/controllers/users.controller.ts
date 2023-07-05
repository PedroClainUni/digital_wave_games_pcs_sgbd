import { Response, Request } from 'express';
import { UsersService, CartsService } from '../services';

export class UsersController {

    constructor(private usersService: UsersService,
        private cartsService: CartsService) { }

    // async get(request: Request, response: Response): Promise<Response> {

    //     try {

    //         const result = await this.usersService.get();

    //         return response.send(result);

    //     } catch (error: any) {
    //         return response.status(400).json({
    //             message: error.message || 'Unexpected error.'
    //         })
    //     }

    // }

    async getById(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.usersService.getById(Number.parseInt(request.params.id));
            return response.json(result);
        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async getByEmail(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.usersService.getByEmail(request.params.email);
            return response.json(result);
        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async existEmail(request: Request, response: Response): Promise<Response> {

        try {
            const result = await this.usersService.existEmail(request.params.email);
            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async createAccount(request: Request, response: Response): Promise<Response> {

        const {
            email,
            name,
            password,
        } = request.body;

        try {
            const result = await this.usersService.createAccount({
                email: email,
                name: name,
                password: password,
            });

            return response.send(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async deleteAccount(request: Request, response: Response): Promise<Response> {
        const {
            id
        } = request.body;

        try {
            const result = await this.usersService.deleteAccount(id);
            return response.json(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async updateWallet(request: Request, response: Response): Promise<Response> {
        const {
            userId,
            newBalance,
        } = request.body;
        try {
            const result = await this.usersService.updateWallet({ userId, newBalance });
            return response.json(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async updateAccount(request: Request, response: Response): Promise<Response> {
        const {
            email,
            name,
            id
        } = request.body;

        try {
            const result = await this.usersService.updateAccount({ email, id, name });
            return response.json(result);

        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }
/*
        async postAddress(request: Request, response: Response): Promise<Response> {
            const {
                userId,
                address
            } = request.body;

            try {
                const result = await this.usersService.postAddress({ address });
                return response.json(result);
            }
            catch (error: any) {
                return response.status(400).json({
                    message: error.message || 'Unexpected error.'
                })
        }
    }
*/
    async addCartItem(request: Request, response: Response): Promise<Response> {
        const {
            cartId,
            productId,
            amount
        } = request.body

        try {
            const result = await this.cartsService.addCartItem({ cartId, productId, amount });
            return response.json(result);
        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    async getCart(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.cartsService.getCartByUser(Number.parseInt(request.params.userId));
            return response.json(result);
        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }
    }

    // async patchByUsername(request: Request, response: Response): Promise<Response> {
    //     const {
    //         username,
    //         password,
    //         code
    //      } = request.body;

    //     try {

    //         const result = await this.usersService.patch({
    //             id: undefined,
    //             username: username,
    //             password: password,
    //             code: code
    //         });

    //         return response.send(result);

    //     } catch (error: any) {
    //         return response.status(400).json({
    //             message: error.message || 'Unexpected error.'
    //         })
    //     }
    // }

    // async getCart(request: Request, response: Response): Promise<Response> {

    //     try {
    //         const result = await this.cartsService.getCartByUserId(parseInt(request.params.client_id));
    //         return response.send(result);

    //     } catch (error: any) {
    //         return response.status(400).json({
    //             message: error.message || 'Unexpected error.'
    //         })
    //     }

    // }

    // async changePassword(request: Request, response: Response): Promise<Response> {

    //     try {

    //         const {
    //             newPass,
    //             oldPass,
    //             username,
    //          } = request.body;

    //         const result = await this.usersService.changePassword(username, oldPass, newPass);

    //         return response.send(result);

    //     } catch (error: any) {
    //         return response.status(400).json({
    //             message: error.message || 'Unexpected error.'
    //         })
    //     }

    // }

    /* async getOrders(request: Request, response: Response): Promise<Response> {
        try {
            const result = await this.usersService.getOrders(parseInt(request.params.client_id));

            return response.send(result);
        }

        catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
        }
    }
    */
}
