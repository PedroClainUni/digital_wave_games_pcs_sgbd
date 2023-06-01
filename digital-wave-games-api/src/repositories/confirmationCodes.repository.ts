import { IConfirmationCodesRepository } from '../interfaces';
import { PostConfirmationCodesDTO } from '../models';
import { mysqlDatabase } from '../databases';
import logger from '../utils/logger';

export class ConfirmationCodesRepository implements IConfirmationCodesRepository {

    async sendCode(postConfirmationCodeDTO: PostConfirmationCodesDTO): Promise<boolean> {

        try {
            
            await mysqlDatabase
            .default('codigoverificacao')
            .insert([{
                codigo: postConfirmationCodeDTO.code || null,
                expiracao: postConfirmationCodeDTO.expirationDate || null,
                ativo: 1,
                cod_id_conta: postConfirmationCodeDTO.accountId || null,
            }
            ]).catch((error: any) => {
                logger.error(error);
                throw new Error(error);
            });

        } catch (error: any) {
            logger.error(error);
            throw new Error(error);
        }

        return true;

    }

    // async getCode(email: string): Promise<string | null> {

    //     let code: string | null = null;

    //     const sql = `SELECT * FROM codigo_confirmacao WHERE email = ? AND NOW() < validade  ORDER BY id DESC LIMIT 1; `;

    //     try {
    //         await mysqlDatabase.default.raw(sql, [email || null]).then(data => {

    //             if (data[0].length > 0) {
    //                 data[0].forEach((userResult: any) => {

    //                     code = userResult['codigo'];

    //                 });
    //             }

    //         }).catch((error: any) => {
    //             logger.error(error);
    //             throw new Error(error);
    //         });

    //     } catch (error: any) {
    //         logger.error(error);
    //         throw new Error(error);
    //     }

    //     return code;

    // }

}
