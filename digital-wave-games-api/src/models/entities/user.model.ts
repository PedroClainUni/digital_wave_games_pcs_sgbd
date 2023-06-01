export class User {
    public id?: number;
    public name?: string;
    public email?: string;
    public balance?: number;
    public emailConfirm?: boolean

    constructor(props: User) {
        Object.assign(this, props);
    }
}