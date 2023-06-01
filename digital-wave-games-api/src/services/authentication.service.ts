import { PostSignInDTO, ResponseBody, User } from "../models";
import { EmployeeRepository, UsersRepository } from "../repositories";
import logger from "../utils/logger";

export class AuthenticationService {

    constructor(private usersRepository: UsersRepository, private employeeRepository: EmployeeRepository) { }

    async authenticateUser(postSignInDTO: PostSignInDTO): Promise<ResponseBody<undefined> | null> {
        const email = postSignInDTO.email;
        const password = postSignInDTO.password;

        try {
            let existEmail = await this.usersRepository.existUserEmail(email);
            if (!existEmail) return { success: false, message: 'Email not found' }

            const dbPassword: string = await this.usersRepository.getUserPassword(email);
            if (dbPassword !== password) return { success: false, message: 'Password incorrect'}
            else return { success: true }

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }

    async authenticateAdmin(postSignInDTO: PostSignInDTO): Promise<ResponseBody<undefined> | null> {
        const email = postSignInDTO.email;
        const password = postSignInDTO.password;

        try {
            let existEmail = await this.employeeRepository.existEmployeeEmail(email);
            if (!existEmail) return { success: false, message: 'Email not found' }

            const dbPassword: string = await this.employeeRepository.getEmployeePassword(email);
            if (dbPassword !== password) return { success: false, message: 'Password incorrect'}
            else return { success: true }

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }
    }
}
