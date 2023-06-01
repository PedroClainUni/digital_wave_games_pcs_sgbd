import { PostConfirmationCodesDTO } from '../models';

export interface IConfirmationCodesRepository {

    sendCode(postConfirmationCodeDTO: PostConfirmationCodesDTO): Promise<boolean>;

}