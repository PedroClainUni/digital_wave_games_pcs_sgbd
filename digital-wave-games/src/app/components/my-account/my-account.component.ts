import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BuyCreditsComponent } from './buy-credits/buy-credits.component';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { WalletService } from 'src/app/shared/services/wallet.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { OrderService } from 'src/app/shared/services/order.service';
import { Order } from 'src/app/shared/models/order.model';
import { OrderItem } from 'src/app/shared/models/orderItem.model';
import { ProductService } from 'src/app/shared/services/product.service';
import { Product } from 'src/app/shared/models/product/product.model';
import * as moment from 'moment';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.scss'],
})
export class MyAccountComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private router: ActivatedRoute,
    private notificationService: NotificationService,
    private walletService: WalletService,
    private authenticationService: AuthenticationService,
    private orderService: OrderService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.username = this.authenticationService.getUsername();
    this.userId = Number.parseInt(this.authenticationService.getUserId());

    this.orderService.getOrdersByClient(this.userId).subscribe(orders => {
      for (let order of orders) {
        const orderItemView: OrderItemView[] = [];
        this.orderService.getOrderItems(order.id).subscribe(orderItems => {
          for (let orderItem of orderItems) {
            let productView: ProductView;
            this.productService.getProduct(orderItem.productId).subscribe(product => {
              productView = {
                id: product.id,
                imgUrl: product.imgUrl,
                name: product.nome,
              }
              orderItemView.push({
                id: orderItem.id,
                amount: orderItem.amount,
                imgUrl: productView.imgUrl,
                productName: productView.name,
                productPrice: orderItem.unitPrice
              })
            })
          }
          this.orders.push({
            id: order.id,
            expectedDeliveryDate: moment(order.expectedDeliveryDate).format("DD/MM/YYYY"),
            orderItems: orderItemView,
            purchaseDate: moment(order.purchaseDate).format('DD/MM/YYYY'),
            totalPrice: order.totalPrice
          })
        })
      }
    })
    this.walletService.getWallet(this.username).subscribe((w) => {
      this.funds = w.funds;
    });
    this.orderService.getOrdersByClient
    if (this.router.snapshot.paramMap.get('success')) {
      this.notificationService.success('Sua compra foi realizada com sucesso!');
    }
  }

  buyCredits(): void {
    console.log('teste');
    let dialogRef = this.dialog.open(BuyCreditsComponent, {
      width: '35%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
    });
  }

  formatPrice(v: number) {
    return (v / 100).toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  getAvatar() {
    if (this.authenticationService.getAvatar()) {
      return this.authenticationService.getAvatar();
    }
    return 'assets/images/dwg-large.png';
  }

  funds: number;
  username: string;
  userId: number;
  orders: OrderView[] = [];

}

interface OrderView {
  id: number;
  orderItems: OrderItemView[];
  totalPrice: number;
  purchaseDate: string;
  expectedDeliveryDate: string;
}

interface OrderItemView {
  id: number;
  productName: string;
  productPrice: number;
  imgUrl: string;
  amount: number;
}

interface ProductView {
  id: number;
  name: string;
  imgUrl: string;
}
