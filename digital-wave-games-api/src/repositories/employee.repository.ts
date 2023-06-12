import { IEmployeeRepository, IUsersRepository } from "../interfaces";
import { PatchUserDTO, PostUserDTO, PutUserDTO, User } from "../models";
import { mysqlDatabase } from "../databases";
import logger from "../utils/logger";

export class EmployeeRepository implements IEmployeeRepository {

  async existEmployeeEmail(email: string): Promise<boolean> {
    let response = null;
    const sql = `SELECT COUNT(*) > 0 as exist FROM conta INNER JOIN contafuncionario ON conta.id = contafuncionario.id_Conta WHERE email = ?;`;
    try {
      await mysqlDatabase.default
        .raw(sql, [email || null])
        .then((data: any) => {
          if (data[0].length > 0) {
            data[0].forEach((result: any) => {
              response = result.exist
            });
          }
        })
        .catch((error: any) => {
          logger.error(error);
          throw new Error(error);
        });
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    }
    return Boolean(response);
  }

  async getEmployeePassword(email: string): Promise<string> {
    let password: string = "";
    const sql = `SELECT * FROM conta INNER JOIN contafuncionario ON conta.id = contafuncionario.id_Conta WHERE email = ?;`;

    try {
      await mysqlDatabase.default
        .raw(sql, [email || null])
        .then((data: any) => {
          if (data[0].length > 0) {
            data[0].forEach((userResult: any) => {
              password = userResult["senha"];
            });
          }
        })
        .catch((error: any) => {
          logger.error(error);
          throw new Error(error);
        });
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    }

    return password;
  }
}
