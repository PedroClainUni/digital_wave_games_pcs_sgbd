import { PostConfirmationCodesDTO } from '../models';
import { IConfirmationCodesRepository, IUsersRepository } from '../interfaces';
import logger from '../utils/logger';
import { randomAlphanumericCode } from '../utils/random';
import { sendEmail } from '../utils/emailSender';

export class ConfirmationCodesService {

    constructor(
        private confirmationCodesRepository: IConfirmationCodesRepository,
        private usersRepository: IUsersRepository
    ) { }

    async sendCode(postConfirmationCodesDTO: PostConfirmationCodesDTO): Promise<boolean> {
        try {
            const user = await this.usersRepository.existUserEmail(postConfirmationCodesDTO.email);
            if (!user) return false

            let today = new Date();

            today.setDate(today.getDate() + 1)
            postConfirmationCodesDTO.expirationDate = today;
            postConfirmationCodesDTO.code = randomAlphanumericCode(6);
            postConfirmationCodesDTO.accountId = user!.id

            sendEmail(
                postConfirmationCodesDTO.email,
                'Confirmação de email - DigitalWaveGames',
                `Use o código a seguir para criar a sua conta: ${postConfirmationCodesDTO.code}`
            );

            const response = await this.confirmationCodesRepository.sendCode(postConfirmationCodesDTO);

            return response;

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

    }

}