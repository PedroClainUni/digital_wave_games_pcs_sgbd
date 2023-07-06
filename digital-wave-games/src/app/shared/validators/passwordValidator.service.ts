import { Injectable } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class PasswordValidatorService {

  public passwordMatchValidator(form: FormGroup): { [key: string]: any } {
    const password = form.controls['passwordCtrl'].value;
    const passwordConfirmation = form.controls['passwordConfirmationCtrl'].value;

    if (!password || !passwordConfirmation) {
       return null;
    } else if (password !== passwordConfirmation) {
      form.controls['passwordCtrl'].setErrors({mismatch: true});
      form.controls['passwordConfirmationCtrl'].setErrors({mismatch: true});
      return {mismatch: false}
    } else if (password === passwordConfirmation) {
      form.controls['passwordCtrl'].setErrors(null);
      form.controls['passwordConfirmationCtrl'].setErrors(null);
      return null;
    }

    return null;
 }

  public passwordStrengthValidator(form: FormGroup): { [key: string]: any } {
    let hasNumber = /\d/.test(form.controls['passwordCtrl'].value);
    let hasUpper = /[A-Z]/.test(form.controls['passwordCtrl'].value);
    let hasLower = /[a-z]/.test(form.controls['passwordCtrl'].value);
    let isGreaterThan8 = form.controls['passwordCtrl'].value.length >= 8;

    if (hasNumber && hasUpper && hasLower && isGreaterThan8) {
      form.controls['passwordCtrl'].setErrors(null);
      return null;
    }
    form.controls['passwordCtrl'].setErrors({strength: true});
    return { strength: true };
  }

}
