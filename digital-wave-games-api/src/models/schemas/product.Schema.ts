import mongoose, { Schema, Model, Document} from "mongoose";

export interface IProduct{
    _id?: string;
    name?: string;
    price?: number;
    amount?: number;
    description?: string;
    platform?: string;
}


const ProductSchema: Schema = new mongoose.Schema({
    name: String,
    price: Number,
    amount: Number,
    description: String,
    platform: String,
});
interface ProductModel extends Omit<IProduct, '_id'>, Document{}
export const ProductM: Model<ProductModel> = mongoose.model<ProductModel>("Produto", ProductSchema);