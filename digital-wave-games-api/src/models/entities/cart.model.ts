export class Cart {
    public id?: number;
    public userId?: number;

    constructor(props: Cart) {
        Object.assign(this, props);
    }
}