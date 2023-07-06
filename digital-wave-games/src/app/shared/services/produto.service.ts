import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'
import{HttpClient, HttpHeaders} from '@angular/common/http'
import { Game } from '../../components/produto/produto.component';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getProduct():Observable<Game[]>{ 
    return this.http.get<Game[]>(`${environment.baseUrl}/store/products`);
  
  }
}
