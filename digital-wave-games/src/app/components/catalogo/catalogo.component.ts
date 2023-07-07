import { Component, OnInit, Injectable, AfterViewInit } from '@angular/core';
import { MatStepperIntl } from '@angular/material/stepper';
import { Product } from '../../shared/models/product/product.modelnew';
import { PostCartItemDTO } from '../../../app/shared/models/dto/cartItem/postCartItem.dto';
import { ProductService } from '../../shared/services/product.service';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { NotificationService } from '../../shared/services/notification.service';
import { WalletService } from '../../shared/services/wallet.service';
import { Wallet } from '../../shared/models/wallet.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

import { CartService } from '../../shared/services/cart.service';
import { Options } from '@angular-slider/ngx-slider';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable()
export class StepperIntl extends MatStepperIntl {
  override optionalLabel = '(OPCIONAL)';
}

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})

export class CatalogoComponent implements OnInit, AfterViewInit {
  public products: Product[];
  public sliderControl;
  public search: FormGroup;
  constructor(
    private productService: ProductService,
    public authenticationService: AuthenticationService,
    private walletService: WalletService,
    private cartService: CartService,
    private router: Router,
    private notificationService: NotificationService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.sliderControl = new FormControl([0, 1000]);
    this.search = this.formBuilder.group({
      searchBar: [''],
      plataforma: [''],
      genero: [''],
      publisher: [''],
      orderBy:"nothing"
    })
    // this.cartId = this.authenticationService.getCartId();
    this.getProducts();
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.defineProductsOnCart();
    // }, 200);

    // if (this.cartId !== null) {
    //   this.activeLoggedButtons();
    // }

    // if (this.authenticationService.isLoggedIn()) {
    //   document.getElementById("main-cart-button").classList.add('active');
    // }
  }

  defineProductsOnCart() {

    this.cartService.getCartItems(this.cartId).subscribe((cartItems) => {
      cartItems.forEach(e => {
        document.getElementById(`cart_actions_container_${e.productId}`).classList.add('active');
        this.cartSize++;
      })
    });

  }

  getProducts(){
    this.productService.getProducts().subscribe(response => {
      this.products = [];
      response.body.forEach(item => {
        const product: Product = {
          id: item._id,
          nome: item.nome,
          descricao: item.descricao,
          estoque: item.estoque,
          preco: item.preco,
          plataforma: item.plataforma,
        }
        this.products.push(product);
      })
      // this.defineProductsOnCart();
    })

    // this.walletService.getWallet(this.authenticationService.getUsername()).subscribe((wallet: Wallet) => {
    //   this.wallet = wallet;
    //   this.wallet.funds = this.wallet.funds / 100;
    // });
  }

  activeLoggedButtons() {
    document.getElementsByClassName("cart-button")[0].classList.add('active');
  }

  formatPrice(v: number) {
    return `R$ ${(v)}`.replace('.', ',');
  }

  postCartItem(productId: number) {
    const postCartItemDTO: PostCartItemDTO = {
      cartId: this.cartId,
      productId: productId,
      amount: 1
    }

    this.cartService.postCartItem(postCartItemDTO);
    document.getElementById(`cart_actions_container_${productId}`).classList.add('active');
    this.notificationService.success('Produto foi adicionado ao carrinho.')
    ++this.cartSize;
  }

  selected = 'relevant';


  enterSearch() {
    const name = this.search.get('searchBar').value;
    const platform = this.search.get('plataforma').value;
    const floor = this.sliderControl.value[0];
    const ceil = this.sliderControl.value[1];
    this.products = undefined;
    this.productService.getProducts().subscribe((products) => {
    products = this.sorterProducts(products);
    this.products = products.body.filter(this.haveName.bind(null, name, platform, floor, ceil));
    });

  }

  clearFilter() {
    this.search.get('searchBar').setValue('');
    this.search.get('plataforma').setValue('');
    this.sliderControl.value[0] = this.minPriceValue;
    this.sliderControl.value[1] = this.maxPriceValue;
    this.enterSearch();
  }

  private haveName(name, platform,floor, ceil, element): boolean {
    const hasName = (element.nome.toUpperCase().indexOf(name.toUpperCase()) != -1 || name == "");
    const hasPlatform = (element.plataforma == platform || platform == "");
    const isInLimitPrice = (ceil >= element.preco && element.preco >= floor);
    return hasName && hasPlatform && isInLimitPrice;
  }

  sorterProducts(products):Product[]{
    let orderBy = this.search.get('orderBy').value;
    switch (orderBy) {
      case "nothing":{
        break;
      }
      case "rising-price":{
        products.body.sort((a,b)=>{
          console.log(a.preco)
          let priceOne = a.preco;
          let priceTwo = b.preco;
          return priceOne - priceTwo;
        });
        break;
      }
      case "decreasing-price":{
        products.body.sort((a,b)=>{
          let priceOne = a.preco;
          let priceTwo = b.preco;
          return priceTwo - priceOne;
        });
        break;
      }
      default:{
        console.log("Error in switchCase OrderBy")
        break;
      }
    }
    return products;
  }
  cartProductIds: number[];

  public searchName = "";

  public wallet: Wallet;

  cartId = null;
  cartSize = 0;
  cartPrice = 0;

  minPriceValue: number = 0;
  maxPriceValue: number = 1000;
  priceOptions: Options = {
    floor: 0,
    ceil: 1000
  };
}
