import { catchError, distinctUntilChanged, Observable, take, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../app/shared/services/notification.service';
import { AuthenticationService } from '../../../app/shared/services/authentication.service'
import { SupportEmailDTO } from '../models/dto/supportEmail/supportEmailDTO'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) { }

  sendSupportEmail(supportEmailDTO: SupportEmailDTO): Observable<boolean> {
    console.log(supportEmailDTO);
    return this.http.post<boolean>(`${environment.baseUrl}/support/support`, supportEmailDTO)
    .pipe(
      take(1),
      tap((success: boolean) => {
        if (success) {
          this.notificationService.success('Mensagem enviada!');
        }
      }),
      distinctUntilChanged(),
      catchError(err => {
        this.notificationService.error('Erro ao enviar mensagem');
        throw new Error(err);
      })
    );
  }
}
