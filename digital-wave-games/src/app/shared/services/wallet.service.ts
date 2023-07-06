import { Product } from '../models/product/product.model';
import { catchError, distinctUntilChanged, Observable, take, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { Wallet } from '../models/wallet.model';
import { PutWallerDTO } from '../models/dto/putWallet.dto';
import { GenerateBbDTO } from '../models/dto/wallet/generateBb.dto';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class WalletService {
  wallet: Wallet;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService
  ) {}

  generateBB(generateBb: GenerateBbDTO): Observable<boolean> {
    return this.http
      .post<boolean>(`${environment.baseUrl}/clients/charges`, generateBb)
      .pipe(
        take(1),
        tap((success: boolean) => {
          if (success) {
            this.notificationService.success(
              'O boleto bancário foi enviado para o e-mail cadastrado!'
            );
          }
        }),
        distinctUntilChanged(),
        catchError((err) => {
          this.notificationService.error('Erro ao gerar boleto bancário');
          throw new Error(err);
        })
      );
  }

  getWallet(username: string): Observable<Wallet> {
    return this.http.get<Wallet>(
      `${environment.baseUrl}/clients/wallets/${username}`
    );
  }

  putWallet(putWalletDTO: PutWallerDTO) {
    return this.http
      .put(`${environment.baseUrl}/clients/wallets`, putWalletDTO)
      .subscribe();
  }
}
