import { ICartsRepository, IUsersRepository } from '../interfaces';
import { PostCartDTO, PostUserDTO, PutUserDTO, PutUserWalletDTO, /*PostAddressDTO,*/ ResponseBody, User } from '../models';
import logger from '../utils/logger';

export class UsersService {

    constructor(
        private usersRepository: IUsersRepository,
        private cartsRepository: ICartsRepository,
    ) { }

    // async get(): Promise<User[]> {

    //     try {

    //         const response = await this.usersRepository.getUsers();

    //         return response;

    //     } catch (error: any) {
    //         logger.error(error);
    //         throw new Error(error);
    //     }

    // }

    async getById(id: number): Promise<ResponseBody<User>> {
        try {
            const user = await this.usersRepository.getUserById(id);

            if (!user) return { success: false, message: 'User not found' }
            else return { success: true, body: user }

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }

    async getByEmail(email: string): Promise<ResponseBody<User>> {
        try {
            const user = await this.usersRepository.getUserByEmail(email);

            if (!user) return { success: false, message: 'User not found' }
            else return { success: true, body: user }

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }
/*
    async updateAddress(address: string): Promise<ResponseBody<User>> {
        try {
            const response = await this.usersRepository.updateAddress(address);
            return { success: true, body: response };
        }
        catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }
    */
    async existEmail(email: string): Promise<ResponseBody<boolean> | null> {
        try {
            const response = await this.usersRepository.existUserEmail(email);
            return { success: true, body: response };
        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }

    async createAccount(postUserDTO: PostUserDTO): Promise<ResponseBody<{ id: number }>> {

        try {
            const existEmail = await this.usersRepository.existUserEmail(postUserDTO.email);
            if (existEmail) {
                return { success: false, message: 'Email already exists' };
            }

            // postUserDTO.password = sha256(postUserDTO.password + ENCRYPTION_SECRET).toString();

            const response: number[] = await this.usersRepository.createAccount(postUserDTO);
            await this.usersRepository.createUserAccount(response[0]);

            let cart: PostCartDTO = {
                clientId: response[0]
            }

            await this.cartsRepository.postCart(cart);
            return { success: true, body: { id: response[0] } };

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async updateAccount(putUserDTO: PutUserDTO): Promise<ResponseBody<User>> {

        try {
            let user = await this.usersRepository.getUserById(putUserDTO.id)
            if (!user) return { success: false, message: 'User with id not exists' }

            let existEmail = await this.usersRepository.existUserEmail(putUserDTO.email)
            if (existEmail) return { success: false, message: 'Email already exists' }

            await this.usersRepository.update(putUserDTO);
            user.email = putUserDTO.email
            user.name = putUserDTO.name

            return {
                success: true,
                body: user
            };

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async deleteAccount(id: number): Promise<ResponseBody<undefined>> {

        try {
            const user = await this.usersRepository.getUserById(id)
            if (!user) return {
                success: false, message: 'User not found '
            }
            await this.usersRepository.deleteAccount(id);
            return {
                success: true,
            };
        }
        catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async updateWallet(putUserWalletDTO: PutUserWalletDTO): Promise<ResponseBody<undefined>> {

        try {
            const user = await this.usersRepository.getUserById(putUserWalletDTO.userId)
            if (!user) return { success: false, message: 'User not found ' }

            await this.usersRepository.updateWallet(putUserWalletDTO);
            return {
                success: true,
            };

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }

    // async changePassword(username: string, oldPass: string, newPass: string): Promise<boolean> {

    //     try {
    //         const dbPassword: string = await this.usersRepository.getUserPassword(username);
    //         const oldEncripted: string = sha256(oldPass + ENCRYPTION_SECRET).toString();
    //         if (oldEncripted !== dbPassword) return false;

    //         await this.usersRepository.changePassword(username, sha256(newPass + ENCRYPTION_SECRET).toString());
    //         return true;

    //     } catch (error: any) {
    //         logger.error(error);
    //         throw new Error(error);
    //     }

    // }

    // async patch(patchUserDTO: PatchUserDTO): Promise<number[]> {

    //     try {

    //         const user: User | null = await this.usersRepository.getUserByEmail(patchUserDTO.username);

    //         if (user === null) {
    //             return [-1];
    //         }

    //         const code = await this.passwordRecoveryCodesRepository.getCode(user.id);


    //         if (code !== patchUserDTO.code) {
    //             return [-2];
    //         }

    //         patchUserDTO.password = sha256(patchUserDTO.password + ENCRYPTION_SECRET).toString();

    //         patchUserDTO.id = user.id;

    //         const response: number[] = await this.usersRepository.patchUser(patchUserDTO);

    //         return response;

    //     } catch (error: any) {
    //         logger.error(error);
    //         throw new Error(error);
    //     }

    // }

}
