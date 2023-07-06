import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Router } from '@angular/router';
import { SignInFormDTO } from './models/signInFormDTO';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup;
  loggedIn: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginFormGroup = this.formBuilder.group({
      usernameCtrl: [''],
      passwordCtrl: [''],
    });
  }

  public login(): void {
    const signInForm: SignInFormDTO = {
      email: this.loginFormGroup.get('usernameCtrl').value,
      password: this.loginFormGroup.get('passwordCtrl').value,
    };

    if (signInForm.email !== '' && signInForm.password !== '') {
      this.authenticationService.login(signInForm).subscribe();
    }
  }
}
