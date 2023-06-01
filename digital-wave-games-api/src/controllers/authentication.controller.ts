import { Response, Request } from 'express';
import { AuthenticationService } from '../services';

export class AuthenticationController {

    constructor(private authenticationService: AuthenticationService) {}

    async authenticateUser(request: Request, response: Response): Promise<Response> {
        const { 
            email,
            password
         } = request.body;
        try {
            const result = await this.authenticationService.authenticateUser({
                email: email,
                password: password
            });

            return response.json(result);
        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }

    async authenticateAdmin(request: Request, response: Response): Promise<Response> {

        const { 
            email,
            password
         } = request.body;
        try {

            const result = await this.authenticationService.authenticateAdmin({
                email: email,
                password: password
            });

            return response.send(result);
            
        } catch (error: any) {
            return response.status(400).json({
                message: error.message || 'Unexpected error.'
            })
        }

    }
}
