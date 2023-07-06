import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private http:HttpClient) { }

  makeBankSlipPayment() {
    return this.http.post<void>(`${environment.baseUrl}/purchase/payment/bank-slip`, {}).subscribe();
  }

  makeCardPayment() {
    return this.http.post<void>(`${environment.baseUrl}/purchase/payment/card`, {}).subscribe();
  }

  calculateFreight(weight: number) { 
    return this.http.post<number>(`${environment.baseUrl}/purchase/calculate-freight`, {weight: weight}).subscribe(); 
  }
}