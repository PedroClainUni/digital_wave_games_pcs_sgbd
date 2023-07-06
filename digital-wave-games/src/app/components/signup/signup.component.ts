import { Component, Injectable, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { MatStepperIntl } from '@angular/material/stepper';
import { SignupService } from '../../shared/services/signup.service';
import { SignUpCodeDTO } from '../../shared/models/dto/signUp/signUpCodeDTO';
import { SignUpFormDTO } from '../../shared/models/dto/signUp/signupformDTO';
import { PasswordValidatorService } from 'src/app/shared/validators/passwordValidator.service';

@Injectable()
export class StepperIntl extends MatStepperIntl {
  override optionalLabel = '(OPCIONAL)';
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { showError: true },
    },
    { provide: MatStepperIntl, useClass: StepperIntl },
  ],
})
export class SignupComponent implements OnInit {
  public accountFormGroup: FormGroup;
  // public confirmationFormGroup: FormGroup;

  // public sentCode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private matStepperIntl: MatStepperIntl,
    private signupService: SignupService,
    private passwordValidatorService: PasswordValidatorService
  ) {}

  ngOnInit() {
    this.accountFormGroup = this.formBuilder.group(
      {
        emailCtrl: ['', [Validators.required, Validators.email]],
        usernameCtrl: ['', [Validators.required, Validators.maxLength(30)]],
        passwordCtrl: ['', [Validators.required, Validators.minLength(8)]],
        passwordConfirmationCtrl: ['', Validators.required],
      },
      {
        validators: [this.passwordValidatorService.passwordMatchValidator],
      }
    );

    // this.confirmationFormGroup = this.formBuilder.group({
    //   confirmationCodeCtrl: ['', [Validators.required]]
    // });

    // this.matStepperIntl.changes.next();
  }

  public confirmSignup(): void {
    const signUpForm: SignUpFormDTO = {
      email: this.accountFormGroup.get('emailCtrl').value,
      name: this.accountFormGroup.get('usernameCtrl').value,
      password: this.accountFormGroup.get('passwordCtrl').value,
    };

    this.signupService.signUp(signUpForm).subscribe();
  }

  public isFormValid(): boolean {
    return this.accountFormGroup.valid;
  }

  // public hasEmail(): boolean {
  //   return this.accountFormGroup.get('emailCtrl').valid;
  // }

  // public sendCode(): void {

  //   const signUpCode: SignUpCodeDTO = {
  //     email: this.accountFormGroup.get('emailCtrl').value
  //   }

  //   this.signupService.sendConfirmationCode(signUpCode).subscribe();
  // }
}
