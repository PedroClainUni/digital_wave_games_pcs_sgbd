export class Product {
    public id?: number;
    public nome?: string;
    public preco?: number;
    public estoque?: number;
    public descricao?: string;
    public plataforma?: string;

    constructor(props: Product) {
        Object.assign(this, props);
    }
}
