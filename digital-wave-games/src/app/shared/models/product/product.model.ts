import { Gender } from '../product/gender.model';
import { Publisher } from './publisher.model';
import { RatingSystem } from './ratingSystem.model';
import { Platform } from './platform.model'
export interface Product {
  id?: number;
  _id?: number;
  nome?: string;
  preco?: number;
  estoque?: number;
  descricao?: string;
  releaseDate?: string;
  imgUrl?: string;
  youtubeIds?: string[];
  gender?: Gender;
  plataforma?: Platform;
  publisher?: Publisher;
  ratingSystem?: RatingSystem
}
