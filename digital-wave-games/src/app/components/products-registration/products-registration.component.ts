import { Component, OnInit } from '@angular/core';
import { ProductRegistrationDTO } from '../../shared/models/dto/product/productRegistrationDTO';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import * as moment from 'moment';

@Component({
  selector: 'app-products-registration',
  templateUrl: './products-registration.component.html',
  styleUrls: ['./products-registration.component.scss']
})

export class ProductsRegistrationComponent implements OnInit {
  public registrationFormGroup: FormGroup;

  image: string = "../../../assets/images/ImageField.png"
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    document.addEventListener("keydown", function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
    this.registrationFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      amount: ['', Validators.required],
      description: ['', Validators.required],
     // image: ['', Validators.required],
      platform: ['', Validators.required]
    });
  }

  atualizarImagem(event: any): void {
    this.image = event.target.value;
  }

  public registerProduct(): void {
    if(this.isFormValid()){
      const dto = {
        nome: this.registrationFormGroup.controls['name'].value,
        preco: this.registrationFormGroup.controls['price'].value,
        estoque: this.registrationFormGroup.controls['amount'].value,
        descricao: this.registrationFormGroup.controls['description'].value,
        //imgUrl: this.registrationFormGroup.controls['image'].value,
        plataforma: this.registrationFormGroup.controls['platform'].value,
      }
      this.productService.postProduct(dto);
      console.log(dto)
      this.notificationService.success('Produto adicionado com sucesso!')
      //this.clearFields();
    } else {
      this.notificationService.error('Preencha todos os campos obrigatórios.')
    }
  }
  private isFormValid(): boolean {
    return this.registrationFormGroup.valid;
  }
  
  clearFields() {     
        this.registrationFormGroup.controls['price'].setValue('')
        this.registrationFormGroup.controls['amount'].setValue('')
        this.registrationFormGroup.controls['name'].setValue('')
        this.registrationFormGroup.controls['platform'].setValue('')
        this.registrationFormGroup.controls['description'].setValue('');
       // this.registrationFormGroup.controls['image'].setValue('');
        this.registrationFormGroup.controls['price'].setErrors(null);
        this.registrationFormGroup.controls['amount'].setErrors(null);
        this.registrationFormGroup.controls['name'].setErrors(null);
        this.registrationFormGroup.controls['platform'].setErrors(null);
        this.registrationFormGroup.controls['description'].setErrors(null);
        //this.registrationFormGroup.controls['image'].setErrors(null);
       // this.image = "../../../assets/images/ImageField.png";
  }
}
