import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarRef, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  snackBarConfig: MatSnackBarConfig;
  snackBarRef: MatSnackBarRef<any>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  snackBarAutoHide = '2000';

  openSnackBar(message: string, action: string, css: string) {
    this.snackBarConfig = new MatSnackBarConfig();
    this.snackBarConfig.horizontalPosition = this.horizontalPosition;
    this.snackBarConfig.verticalPosition = this.verticalPosition;
    this.snackBarConfig.duration = parseInt(this.snackBarAutoHide, 0);
    this.snackBarConfig.panelClass = [css];
    this.snackBarRef = this.snackBar.open(message, action, this.snackBarConfig);
  }

  public success(message, action = 'Ok', duration = 5000, css = 'success-msg') {
    this.openSnackBar(message, action, css);

  }

  public error(message, action = 'Ok', css = 'error-msg') {

    this.openSnackBar(message, action, css);

  }

  public alert(message, action = 'Ok', duration = 5000, css = 'alert-msg') {
    this.openSnackBar(message, action, css);

  }

  public stoppedWithError() {

  }
}
