import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { CartComponent } from './components/cart/cart.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { SupportComponent } from './components/support/support.component';
import { EditProfileComponent } from './components/my-account/edit-profile/edit-profile.component';
import { AdmLoginComponent } from './components/adm-login/adm-login.component';
import { AdmHomeComponent } from './components/adm-home/adm-home.component';
import { ProductsManagementComponent } from './components/products-management/products-management.component';
import { ProductsRegistrationComponent } from './components/products-registration/products-registration.component';
import { ClientsManagementComponent } from './components/clients-management/clients-management.component';
import { ProductEditionComponent } from './components/product-edition/product-edition.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar', component: SignupComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'produto/:produto', component: ProdutoComponent },
  { path: 'carrinho', component: CartComponent },
  { path: 'minha-conta', component: MyAccountComponent },
  { path: 'minha-conta', children: [{ path: 'editar', component: EditProfileComponent }] },
  { path: 'minha-conta/:success', component: MyAccountComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'suporte', component: SupportComponent },
  { path: 'adm-login', component: AdmLoginComponent },
  { path: 'adm-home', component: AdmHomeComponent },
  { path: 'products-management', component: ProductsManagementComponent },
  { path: 'products-registration', component: ProductsRegistrationComponent },
  {path: 'clients-management', component: ClientsManagementComponent},
  {path: 'product-edition/:produto', component: ProductEditionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
