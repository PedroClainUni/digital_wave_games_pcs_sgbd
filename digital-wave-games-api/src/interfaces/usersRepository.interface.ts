import { PatchUserDTO, PutUserWalletDTO, User } from '../models';
import { PostUserDTO } from '../models';
import { PutUserDTO } from '../models';
import { PostAddressDTO } from '../models';

export interface IUsersRepository {

    // getUsers(): Promise<User[]>;
    getUserById(id: number): Promise<User | null>;
    existUserEmail(email: string): Promise<boolean>;
    updateWallet(putUserWallet: PutUserWalletDTO): Promise<void>;
    // existEmployeeEmail(email: string): Promise<boolean>;
    createAccount(postUserDTO: PostUserDTO): Promise<number[]>;
    createUserAccount(accountId: number): Promise<number[]>;
    // patchUser(patchUserDTO: PatchUserDTO): Promise<number[]>
    // getAddresses(userId: number): Promise<any[]>
    // postAddress(postAddressDTO: PostAddressDTO): Promise<void>
    update(putUserDTO: PutUserDTO): Promise<void>;
    // changePassword(username: string, password: string): Promise<void>;
    getUserPassword(username: string): Promise<string>;
    // getOrders(userId: number): Promise<any[]>
}
