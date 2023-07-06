
import { Platform } from './platform.model'
export interface Product {
  id?: number;
  _id?: number;
  nome?: string;
  preco?: number;
  estoque?: number;
  descricao?: string;
  plataforma?: Platform;
}
