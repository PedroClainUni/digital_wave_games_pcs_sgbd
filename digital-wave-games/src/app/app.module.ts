import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';

import { NgxSliderModule } from '@angular-slider/ngx-slider';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SignupComponent } from './components/signup/signup.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { ProdutoComponent } from './components/produto/produto.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { MyAccountComponent } from './components/my-account/my-account.component';
import { BuyCreditsComponent } from './components/my-account/buy-credits/buy-credits.component';
import { registerLocaleData } from '@angular/common';
import { SupportComponent } from './components/support/support.component';
import { AdmLoginComponent } from './components/adm-login/adm-login.component';
import { EditProfileComponent } from './components/my-account/edit-profile/edit-profile.component';
import { NewAddressComponent } from './components/my-account/edit-profile/new-address/new-address.component';
import { AdmHomeComponent } from './components/adm-home/adm-home.component';
import { ProductsManagementComponent } from './components/products-management/products-management.component';
import { ProductsRegistrationComponent } from './components/products-registration/products-registration.component';
import { ClientsManagementComponent } from './components/clients-management/clients-management.component';
import { ProductEditionComponent } from './components/product-edition/product-edition.component';
import { SafePipe } from './shared/pipes/safePipe';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    CatalogoComponent,
    ProdutoComponent,
    CartComponent,
    MyAccountComponent,
    BuyCreditsComponent,
    CheckoutComponent,
    SupportComponent,
    AdmLoginComponent,
    EditProfileComponent,
    NewAddressComponent,
    AdmHomeComponent,
    ProductsManagementComponent,
    ProductsRegistrationComponent,
    ClientsManagementComponent,
    ProductEditionComponent,
    SafePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatStepperModule,
    MatMenuModule,
    MatProgressBarModule,
    MatBadgeModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    MatTooltipModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    HttpClientModule,
    MatSelectModule,
    MatDialogModule,
    MatCheckboxModule,
    MatRadioModule,
    NgxSliderModule,
    MatExpansionModule,
    MatTableModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MatNativeDateModule },
    { provide: MatSnackBar },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
