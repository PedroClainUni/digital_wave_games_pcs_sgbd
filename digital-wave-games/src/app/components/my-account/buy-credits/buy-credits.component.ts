import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { Wallet } from 'src/app/shared/models/wallet.model';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/shared/services/payment.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FormBuilder } from '@angular/forms';
import { GenerateBbDTO } from 'src/app/shared/models/dto/wallet/generateBb.dto';

@Component({
  selector: 'app-buy-credits',
  templateUrl: './buy-credits.component.html',
  styleUrls: ['./buy-credits.component.scss'],
})
export class BuyCreditsComponent implements OnInit {
  ngOnInit(): void {
    this.clientId = this.authenticationService.getUserId();
    this.username = this.authenticationService.getUsername();
    this.walletService.getWallet(this.username).subscribe((w) => {
      this.wallet = {
        id: w.id,
        userId: w.userId,
        funds: w.funds,
      };
    });
  }

  constructor(
    public dialogRef: MatDialogRef<BuyCreditsComponent>,
    public authenticationService: AuthenticationService,
    public walletService: WalletService,
    public paymentService: PaymentService,
    public router: Router,
    public notificationService: NotificationService,
    private formBuilder: FormBuilder
  ) {}

  formatPrice(v: number) {
    return (v / 100).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  cancel(): void {
    this.dialogRef.close();
  }

  setValueToIncrease(value: number) {
    this.valueToIncrease = value;
  }

  setPaymentType(type: number) {
    this.paymentId = type;
  }

  updateInput(event: any) {
    var val: any = event.target.value;
    if (!this.isNumber(val)) return;
    this.setValueToIncrease(val * 100);
  }

  isNumber(value: any): boolean {
    return Number.isInteger(parseInt(value));
  }

  onSubmit(): void {
    var val: any = this.valueToIncreaseForm.value.value;
    if (!this.isNumber(val)) return;
    this.setValueToIncrease(val * 100);
  }

  validateFields(): boolean {
    if (this.paymentId == null) {
      this.notificationService.error('Escolha uma forma de pagamento.');
      return false;
    }
    if (this.valueToIncrease == 0) {
      this.notificationService.error('Insira um valor para ser adicionado.');
      return false;
    }
    return true;
  }

  finishPurshase() {
    if (!this.validateFields()) return;

    switch (this.paymentId) {
      case 1:
        this.paymentService.makeBankSlipPayment();
        break;
      case 2:
        this.paymentService.makeCardPayment();
        break;
      /***
       * TODO: caso 4 realizar pagamento via pix.
       */
    }
    /***
     * TODO: em caso de pagamento via pix ou cartão o valor só deve ser adicionado caso
     * os dados sejam validos.
     */

    const generateBb: GenerateBbDTO = {
      value: this.valueToIncrease,
      username: this.authenticationService.getUsername(),
    };

    this.walletService.generateBB(generateBb).subscribe();
    this.walletService.putWallet({
      value: this.wallet.funds + this.valueToIncrease,
      walletId: this.wallet.id,
    });
    this.cancel();
    this.router.navigate(['/minha-conta/success']);
  }

  wallet: Wallet;
  valueToIncrease: number = 0;
  paymentId: number;
  clientId: string;
  username: string;
  valueToIncreaseForm = this.formBuilder.group({
    value: '',
  });
}
