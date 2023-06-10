import { IUsersRepository } from "../interfaces";
import { PatchUserDTO, PostUserDTO, PutUserDTO, PutUserWalletDTO, /*PutAddressDTO,*/ User } from "../models";
import { mysqlDatabase } from "../databases";
import logger from "../utils/logger";

export class UsersRepository implements IUsersRepository {
  // async getUsers(): Promise<User[]> {
  //   let users: User[] = [];

  //   const sql = `SELECT * FROM usuario_cliente;`;

  //   try {
  //     await mysqlDatabase.default
  //       .raw(sql)
  //       .then((data) => {
  //         if (data[0].length > 0) {
  //           data[0].forEach((user: any) => {
  //             users.push({
  //               id: user["id"],
  //               username: user["nome_usuario"],
  //               name: user["nome"],
  //               email: user["email"],
  //               isEmailConfirmed: user["email_confirmado"],
  //               profileImage: user["foto_perfil"],
  //               tel: user["tel_1"],
  //               cel1: user["tel_2"],
  //               cel2: user["tel_3"],
  //               secondaryEmail: user["email_secundario"],
  //               failedLoginAttempts: user["acesso_falho"],
  //               nextAllowedAccess: user["liberar_acesso"],
  //               banned: user["bloqueado"],
  //             });
  //           });
  //         }
  //       })
  //       .catch((error: any) => {
  //         logger.error(error);
  //         throw new Error(error);
  //       });
  //   } catch (error: any) {
  //     logger.error(error);
  //     throw new Error(error);
  //   }

  //   return users;
  // }

  async existUserEmail(email: string): Promise<boolean> {
    let response = null;

    const sql = `SELECT COUNT(*) > 0 as exist FROM conta INNER JOIN contausuario ON conta.id = contausuario.user_id_conta WHERE email = ?;`;
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

  async getUserById(id: number): Promise<User | null> {
    let user: User | null = null;

    const sql = `SELECT conta.id, email, nome, emailConfirm, saldo FROM conta INNER JOIN contausuario ON conta.id = contausuario.user_id_conta WHERE conta.id = ?;`;
    try {
      await mysqlDatabase.default
        .raw(sql, [id || null])
        .then((data: any) => {
          if (data[0].length > 0) {
            data[0].forEach((userResult: any) => {
              user = {
                id: userResult["id"],
                name: userResult["nome"],
                email: userResult["email"],
                balance: userResult["saldo"],
                emailConfirm: userResult["emailConfirm"]
              };
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
    return user;
  }

  async getUserPassword(email: string): Promise<string> {
    let password: string = "";

    const sql = `SELECT * FROM conta INNER JOIN contausuario ON conta.id = contausuario.user_id_conta WHERE email = ?;`;

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

  async createAccount(postUserDTO: PostUserDTO): Promise<number[]> {
    let index: number[] = [];

    try {
      await mysqlDatabase
        .default("conta")
        .returning("id")
        .insert([
          {
            nome: postUserDTO.name || null,
            senha: postUserDTO.password || null,
            email: postUserDTO.email || null,
          },
        ])
        .then((insertedIndex: any) => {
          index = insertedIndex;
        })
        .catch((error: any) => {
          logger.error(error);
          throw new Error(error);
        });
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    }

    return index;
  }

  async createUserAccount(accountId: number): Promise<number[]> {
    let index: number[] = [];

    try {
      await mysqlDatabase
        .default("contausuario")
        .returning("id")
        .insert([
          {
            user_id_conta: accountId,
            emailConfirm: false,
            saldo: 0,
          },
        ])
        .then((insertedIndex: any) => {
          index = insertedIndex;
        })
        .catch((error: any) => {
          logger.error(error);
          throw new Error(error);
        });
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    }

    return index;
  }

  async update(putUserDTO: PutUserDTO): Promise<void> {
    try {
      await mysqlDatabase
        .default("conta")
        .update({
          email: putUserDTO.email,
          nome: putUserDTO.name,
        })
        .where({ id: putUserDTO.id });
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    }
  }

  async updateWallet(putUserWallet: PutUserWalletDTO): Promise<void> {
    const sql = "UPDATE contausuario INNER JOIN conta ON contausuario.user_id_conta = conta.id SET saldo = ? WHERE conta.id = ?;"
    try {
      await mysqlDatabase
        .default
        .raw(sql, [putUserWallet.newBalance ?? null, putUserWallet.userId ?? null])
    } catch (error: any) {
      logger.error(error);
      throw new Error(error);
    }
  }
/*
  async putAddress(putAddress: PutAddressDTO): Promise<void> {
    const sql = "UPDATE contausuario INNER JOIN conta on contausuario.user_id_conta = conta.id SET endereco = ? WHERE conta.id = ?";
    try {
      await mysqlDatabase
        .default
        .raw(sql, [putAddress.address ?? null, putAddress.userId ?? null])
    }
    catch (error: any) {
      logger.error(error);
      throw new Error(error);
  }
*/
  // async changePassword(username: string, password: string): Promise<void> {
  //   try {
  //     await mysqlDatabase
  //       .default("usuario_cliente")
  //       .update({
  //         senha: password,
  //       })
  //       .where({ nome_usuario: username });
  //   } catch (error: any) {
  //     logger.error(error);
  //     throw new Error(error);
  //   }
  // }

  // async patchUser(patchUserDTO: PatchUserDTO): Promise<number[]> {
  //   let index: number[] = [];

  //   try {
  //     await mysqlDatabase
  //       .default("usuario_cliente")
  //       .returning("id")
  //       .where({ id: patchUserDTO.id })
  //       .update({
  //         senha: patchUserDTO.password,
  //       })
  //       .then((insertedIndex: any) => {
  //         index.push(insertedIndex);
  //       })
  //       .catch((error: any) => {
  //         logger.error(error);
  //         throw new Error(error);
  //       });
  //   } catch (error: any) {
  //     logger.error(error);
  //     throw new Error(error);
  //   }

  //   return index;
  // }

  // async getAddresses(userId: number): Promise<any> {
  //   let addresses: any[] = [];

  //   const sql = `SELECT * FROM endereco WHERE id_cliente = ?;`;

  //   try {
  //     await mysqlDatabase.default
  //       .raw(sql, [userId || null])
  //       .then((data) => {
  //         if (data[0].length > 0) {
  //           data[0].forEach((userResult: any) => {
  //             addresses.push({
  //               id: userResult["id"],
  //               postalCode: userResult["codigo_postal"],
  //               city: userResult["cidade"],
  //               district: userResult["bairro"],
  //               street: userResult["rua"],
  //               number: userResult["numero"],
  //               additionalInfo: userResult["complemento"],
  //               state: userResult["estado"],
  //               cep: userResult["cep"],
  //             });
  //           });
  //         }
  //       })
  //       .catch((error: any) => {
  //         logger.error(error);
  //         throw new Error(error);
  //       });
  //   } catch (error: any) {
  //     logger.error(error);
  //     throw new Error(error);
  //   }

  //   return addresses;
  // }

  // async increaseFailedLoginAttempt(username: string): Promise<User | null> {
  //   const sql0 =
  //     "UPDATE usuario_cliente SET acesso_falho = IF (reset_acesso_falho <= NOW(), 0, acesso_falho) WHERE nome_usuario = ?";
  //   const sql1 =
  //     "UPDATE usuario_cliente SET acesso_falho = acesso_falho + 1, reset_acesso_falho = NOW() + INTERVAL 2 HOUR WHERE nome_usuario = ?";
  //   const sql2 =
  //     "UPDATE usuario_cliente SET liberar_acesso = IF (acesso_falho > 3, NOW() + INTERVAL 5 * (acesso_falho - 3) SECOND, liberar_acesso) where nome_usuario = ?";
  //   try {
  //     await mysqlDatabase.default.raw(sql0, [username || null]);

  //     await mysqlDatabase.default.raw(sql1, [username || null]);

  //     await mysqlDatabase.default.raw(sql2, [username || null]);

  //     await this.updateStatusBan(username);
  //   } catch (error: any) {
  //     logger.error(error);
  //     throw new Error(error);
  //   }
  //   const user = await this.getUserByEmail(username);
  //   if (
  //     user?.failedLoginAttempts != undefined &&
  //     user?.failedLoginAttempts > 3
  //   ) {
  //     const date = new Date(Date.now() + user.failedLoginAttempts * 5);
  //   }
  //   return await this.getUserByEmail(username);
  // }

  // private async updateStatusBan(username: string): Promise<void> {
  //   const sql =
  //     "UPDATE usuario_cliente SET bloqueado = IF (liberar_acesso <= NOW(), false, true) WHERE nome_usuario = ?";

  //   try {
  //     await mysqlDatabase.default.raw(sql, [username || null]);
  //   } catch (error: any) {
  //     logger.error(error);
  //     throw new Error(error);
  //   }
  // }
}
