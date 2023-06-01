export interface IEmployeeRepository {

 existEmployeeEmail(email: string): Promise<boolean>;
 getEmployeePassword(email: string): Promise<string>;
}
