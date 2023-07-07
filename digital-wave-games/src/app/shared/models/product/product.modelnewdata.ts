
import { Platform } from './platform.model'
export interface Product {
  success?: boolean;
  body:{
  id?: number;
  _id?: number;
  nome?: string;
  preco?: number;
  estoque?: number;
  descricao?: string;
  plataforma?: string;
  }
}
