import { Component, Injectable, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      useValue: {showError: true},
    },
    {provide: MatStepperIntl, useClass: StepperIntl}
  ],
})
export class SignupComponent implements OnInit {

  public accountFormGroup: FormGroup;
  public personalFormGroup: FormGroup;
  public confirmationFormGroup: FormGroup;

  private isHuman: boolean;
  public sentCode: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private matStepperIntl: MatStepperIntl,
    private signupService: SignupService,
    private passwordValidatorService: PasswordValidatorService) { }

  ngOnInit() {
    this.accountFormGroup = this.formBuilder.group({
      emailCtrl: ['', [Validators.required, Validators.email]],
      usernameCtrl: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.-]*$'),
        Validators.minLength(5),
        Validators.maxLength(30)
      ]],
      passwordCtrl: ['', Validators.required],
      passwordConfirmationCtrl: ['', Validators.required]
    },
    {
      validators: [this.passwordValidatorService.passwordMatchValidator, this.passwordValidatorService.passwordStrengthValidator]
    });

    this.personalFormGroup = this.formBuilder.group({
      postalCodeCtrl: [''],
      cityCtrl: [''],
      stateCtrl: [''],
      districtCtrl: [''],
      numberCtrl: [''],
      additionalInfoCtrl: [''],
      streetCtrl: [''],
      phone1Ctrl: [''],
      phone2Ctrl: [''],
      phone3Ctrl: [''],
      secondaryEmailCtrl: ['', Validators.email],
    });

    this.confirmationFormGroup = this.formBuilder.group({
      confirmationCodeCtrl: ['', [Validators.required]]
    });

    this.matStepperIntl.changes.next();
  }

  public confirmSignup (): void {
    const signUpForm: SignUpFormDTO = {
      email: this.accountFormGroup.get('emailCtrl').value,
      username: this.accountFormGroup.get('usernameCtrl').value,
      name: null,
      password: this.accountFormGroup.get('passwordCtrl').value,
      postalCode: this.personalFormGroup.get('postalCodeCtrl').value,
      city: this.personalFormGroup.get('cityCtrl').value,
      state: this.personalFormGroup.get('stateCtrl').value,
      district: this.personalFormGroup.get('districtCtrl').value,
      number: this.personalFormGroup.get('numberCtrl').value,
      additionalInfo: this.personalFormGroup.get('additionalInfoCtrl').value,
      street: this.personalFormGroup.get('streetCtrl').value,
      phone1: this.personalFormGroup.get('phone1Ctrl').value,
      phone2: this.personalFormGroup.get('phone2Ctrl').value,
      phone3: this.personalFormGroup.get('phone3Ctrl').value,
      secondaryEmail: this.personalFormGroup.get('secondaryEmailCtrl').value,
      code: this.confirmationFormGroup.get('confirmationCodeCtrl').value
    }

    this.signupService.signUp(signUpForm).subscribe();

  }

  public isFormValid (): boolean {
    return this.accountFormGroup.valid && this.personalFormGroup.valid && this.isHuman;
  }

  public hasEmail(): boolean {
    return this.accountFormGroup.get('emailCtrl').valid;
  }

  public sendCode(): void {

    const signUpCode: SignUpCodeDTO = {
      email: this.accountFormGroup.get('emailCtrl').value
    }

    this.signupService.sendConfirmationCode(signUpCode).subscribe();
  }

}
