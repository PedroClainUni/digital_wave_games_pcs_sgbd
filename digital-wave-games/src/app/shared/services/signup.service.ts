import { Injectable } from '@angular/core';
import { catchError, distinctUntilChanged, Observable, take, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router"
import { NotificationService } from '../../../app/shared/services/notification.service';
import { SignUpCodeDTO } from '../models/dto/signUp/signUpCodeDTO'
import { SignUpFormDTO } from '../models/dto/signUp/signupformDTO';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router) { }

  signUp(signUpForm: SignUpFormDTO): Observable<number[]> {

    return this.http.post<number[]>(`${environment.baseUrl}/clients/users`, signUpForm)
      .pipe(
        take(1),
        tap((index: number[]) => {
          if (index[0] === -1) {
            this.notificationService.alert('O nome de usuário já existe!');
          } else if (index[0] === -2) {
            this.notificationService.alert('Código de verificação inválido!');
          } else {
            this.notificationService.success('Cadastro concluído!');
            this.router.navigate(['/login']);
          }

        }),
        distinctUntilChanged(),
        catchError(err => {
          this.notificationService.error('Erro ao cadastrar usuário.');
          throw new Error(err);
        })
      );

  }

  sendConfirmationCode(signUpCode: SignUpCodeDTO): Observable<boolean> {
    return this.http.post<boolean>(`${environment.baseUrl}/clients/confirmation-codes`, signUpCode)
    .pipe(
      take(1),
      tap((success: boolean) => {
        if (success) {
          this.notificationService.success('Código enviado!');
        }
      }),
      distinctUntilChanged(),
      catchError(err => {
        this.notificationService.error('Erro ao enviar email de confirmação');
        throw new Error(err);
      })
    );
  }
}
