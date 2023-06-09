import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ProductService } from '../../shared/services/product.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { Product } from '../../shared/models/product/product.modelnew';
import { Wallet } from '../../shared/models/wallet.model';
import { WalletService } from '../../shared/services/wallet.service';
import { CartService } from 'src/app/shared/services/cart.service';
import { PostCartItemDTO } from '../../shared/models/dto/cartItem/postCartItem.dto';
import { NotificationService } from 'src/app/shared/services/notification.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.scss']
})
export class ProdutoComponent implements OnInit {

  constructor(private productService: ProductService,
              private cartService: CartService,
              public authenticationService: AuthenticationService,
              private walletService: WalletService,
              private router: ActivatedRoute,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
  this.cartId = parseInt(this.authenticationService.getCartId());
  this.getProduct();
  //this.defineCart();

  /*this.walletService.getWallet(this.authenticationService.getUsername()).subscribe((wallet: Wallet) => {
    this.wallet = wallet;
    this.wallet.funds = this.wallet.funds / 100;
  });*/
  }

  getProduct() {
    let id;
    this.router.paramMap.subscribe((param) => {
      id = param.get('produto')
    });
    this.productService.getProduct(id).subscribe((product) => {
      console.log(product)
      this.product = {
        id: product.body._id,
        nome: product.body.nome,
        descricao: product.body.descricao,
        estoque: product.body.estoque,
        preco: product.body.preco,
        plataforma: product.body.plataforma
      }
      //this.defineCart();
      this.selectedTrailer = "https://www.youtube.com/embed/FyIwEFXOcaE";
    });
    console.log(this.product);
  }

  defineCart() {
    this.cartService.getCartItems(this.cartId).subscribe(e => {
      e.forEach(item => {
        if (item.productId === this.product.id) this.onCart = true;
      })
      this.cartSize = e.length;
    })
  }

  postCartproduct(productId: number) {
    const productPostDTO: PostCartItemDTO = {
      cartId: this.cartId,
      productId: productId,
      amount: 1
    }

    this.cartService.postCartItem(productPostDTO);
    ++this.cartSize;
    this.onCart = true;
    this.notificationService.success("Produto adicionado no carrinho!")
  }

  selected(selection: string) {
    this.selectedTrailer = `https://www.youtube.com/embed/${selection}`;
  }

  public cartId: number;
  public cartSize: number;
  public product: Product;
  public wallet: Wallet;
  public selectedTrailer: string;
  public onCart: boolean = false;
}
