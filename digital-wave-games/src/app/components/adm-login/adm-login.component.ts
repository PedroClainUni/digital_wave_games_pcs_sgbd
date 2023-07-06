import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { SignInFormDTO } from '../login/models/signInFormDTO';

@Component({
  selector: 'app-adm-login',
  templateUrl: './adm-login.component.html',
  styleUrls: ['./adm-login.component.scss']
})
export class AdmLoginComponent implements OnInit {

  public loginFormGroup: FormGroup;

  constructor(
    private formBuilder:FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {

    this.loginFormGroup = this.formBuilder.group({
      usernameCtrl: [''],
      passwordCtrl: ['']
    });

  }

  public login(): void {
    const username: string =  this.loginFormGroup.get('usernameCtrl').value;
    const password: string = this.loginFormGroup.get('passwordCtrl').value;
      if (username !== '' && password !== '') {
        this.authenticationService.loginAdm({
          username: username,
          password: password
        }).subscribe();
      }
    }
}
