import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, distinctUntilChanged, Observable, take, tap } from 'rxjs';
import { SignInFormDTO } from '../../components/login/models/signInFormDTO';
import { environment } from '../../../environments/environment';
import { NotificationService } from './notification.service';
import { CartService } from './cart.service';
import * as moment from 'moment';
import { Jwt } from '../models/jwt.model';
import { SignInResponse } from '../models/signInResponse.model';
import { AuthenticationInfo } from '../models/authenticationInfo.dto';
import { GoogleSignInDTO } from 'src/app/components/login/models/googleSignInDTO';
import { AdmLoginDTO } from 'src/app/components/adm-login/model/admLogin.dto';
import { ApiResponse } from '../models/dto/apiResponse.dto';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private router: Router,
    private cartService: CartService,
    private userService: UserService
  ) {}

  public login(signInForm: SignInFormDTO): Observable<ApiResponse<undefined>> {
    return this.http
      .post<ApiResponse<undefined>>(
        `${environment.baseUrl}/auth/authenticate-user`,
        signInForm
      )
      .pipe(
        take(1),
        tap((response: ApiResponse<undefined>) => {
          if (response.success) {
            this.setSession(signInForm.email);
            this.notificationService.success('Você está autenticado!');
            this.router.navigate(['/']);
          } else {
            this.notificationService.alert(
              'Nome de usuário ou senha inválidos'
            );
          }
        }),
        distinctUntilChanged(),
        catchError((err) => {
          this.notificationService.error('Erro ao autenticar usuário.');
          throw new Error(err);
        })
      );
  }

  public loginAdm(dto: AdmLoginDTO): Observable<Jwt> {
    return this.http
      .post<Jwt>(
        `${environment.baseUrl}/auth/authenticate-admin`,
        dto
      )
      .pipe(
        take(1),
        tap((jwt: Jwt) => {
          if (jwt !== null) {
            this.setAdmSession(jwt);
            this.notificationService.success('Você está autenticado como administrador!');
            this.router.navigate(['/products-management']);
          } else {
            this.notificationService.alert(
              'Nome de usuário ou senha inválidos'
            );
          }
        }),
        distinctUntilChanged(),
        catchError((err) => {
          this.notificationService.error('Erro ao autenticar usuário.');
          throw new Error(err);
        })
      );
  }

  public getAuthenticationInfo(
    username: string
  ): Observable<AuthenticationInfo> {
    return this.http.get<AuthenticationInfo>(
      `${environment.baseUrl}/clients/user/${username}`
    );
  }

  private setSession(email: string) {
    const expiresAt = moment().add(3600, 'second');
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    this.cartService.getCartByClient(1).subscribe((cart) => {
      localStorage.setItem('cart_id', `${cart.id}`);
    });
    this.userService.getByEmail(email).subscribe(response => {
      const user = response.body;
      localStorage.setItem('user_id', `${user.id}`);
      localStorage.setItem('email', `${user.email}`);
      localStorage.setItem('name', `${user.name}`);
    })
  }

  private setAdmSession(jwt: Jwt) {
    const expiresAt = moment().add(jwt.expiresIn, 'second');
    const username = jwt.username;
    localStorage.setItem('user_id', `${jwt.userId}`);
    localStorage.setItem('id_token', jwt.idToken);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    localStorage.setItem('username', username);
  }

  public setProfileAvatar(avatar: string) {
    localStorage.setItem('user_avatar', avatar);
  }

  public logout() {
    console.log('logout')
    localStorage.removeItem('expires_at');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('cart_id');
    localStorage.removeItem('user_id');
    this.notificationService.alert('Você está desconectado!');
    this.router.navigate(['/']);
  }

  public logoutAdm() {
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('username');
    localStorage.removeItem('user_avatar');
    this.notificationService.alert('Você está desconectado!');
    this.router.navigate(['/']);
  }

  public isLoggedIn(): boolean {
    return (
      moment().isBefore(this.getExpiration()) &&
      localStorage.getItem('expires_at') !== null
    );
  }

  public isLoggedOut(): boolean {
    return !this.isLoggedIn();
  }

  public getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  public getUsername() {
    return localStorage.getItem('name');
  }

  public getCartId() {
    return localStorage.getItem('cart_id');
  }

  public getUserId() {
    return localStorage.getItem('user_id');
  }

  public getAvatar() {
    return localStorage.getItem('user_avatar');
  }
}
