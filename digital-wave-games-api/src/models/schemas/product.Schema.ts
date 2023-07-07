import mongoose, { Schema, Model, Document} from "mongoose";

export interface IProduct{
    _id?: string;
    nome?: string;
    preco?: number;
    estoque?: number;
    descricao?: string;
    plataforma?: string;
}


const ProductSchema: Schema = new mongoose.Schema({
    nome: String,
    preco: Number,
    estoque: Number,
    descricao: String,
    plataforma: String,
});
interface ProductModel extends Omit<IProduct, '_id'>, Document{}
export const ProductM: Model<ProductModel> = mongoose.model<ProductModel>("Produto", ProductSchema);