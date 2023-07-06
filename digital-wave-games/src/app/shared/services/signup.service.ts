import { Injectable } from '@angular/core';
import { catchError, distinctUntilChanged, Observable, take, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router"
import { NotificationService } from '../../../app/shared/services/notification.service';
import { SignUpCodeDTO } from '../models/dto/signUp/signUpCodeDTO'
import { SignUpFormDTO } from '../models/dto/signUp/signupformDTO';
import { ApiResponse } from '../models/dto/apiResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router) { }

  signUp(signUpForm: SignUpFormDTO): Observable<ApiResponse<any>> {

    return this.http.post<ApiResponse<any>>(`${environment.baseUrl}/users`, signUpForm)
      .pipe(
        take(1),
        tap((response: ApiResponse<any>) => {
          if (response.success) {
            this.notificationService.success('Cadastro concluído!');
            this.router.navigate(['/login']);
          } else {
            this.notificationService.alert(response.message)
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
