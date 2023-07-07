import { Component, OnInit } from '@angular/core';
import { PutProductDTO } from '../../shared/models/dto/product/putProduct.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product/product.modelnew';

@Component({
  selector: 'app-product-edition',
  templateUrl: './product-edition.component.html',
  styleUrls: ['./product-edition.component.scss']
})

export class ProductEditionComponent implements OnInit {
  public product: Product;
  private id;
  private formDate;
  public green = 'green';
  public white = 'white';
  public registrationFormGroup: FormGroup;
  image: string = "../../../assets/images/ImageField.png"
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private notificationService: NotificationService,
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.paramMap.subscribe((param) => {
      this.id = param.get('produto')
    });
    this.getProduct();
    document.addEventListener("keydown", function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
    this.registrationFormGroup = this.formBuilder.group({
      nome: ['', Validators.required],
      preco: ['', Validators.required],
      estoque: ['', Validators.required],
      descricao: ['', Validators.required],
      image: ['', Validators.required],
      plataforma: ['', Validators.required],
    });
  }

  getProduct():void {
    this.productService.getProduct(this.id).subscribe(p => {
      this.product = {
        id: p.body._id,
        nome: p.body.nome,
        descricao: p.body.descricao,
        estoque: p.body.estoque,
        preco: p.body.preco,
        plataforma: p.body.plataforma
      }
      this.registrationFormGroup = this.formBuilder.group({
        nome: [this.product.nome, Validators.required],
        preco: [this.product.preco, Validators.required],
        estoque: [this.product.estoque, Validators.required],
        descricao: [this.product.descricao, Validators.required],
        //image: [this.product.imgUrl, Validators.required],
        //youtubeIds: [this.product.youtubeIds.join(',')],
        //releaseDate: [this.product.releaseDate, Validators.required],
       // ageRating: [this.product.ratingSystem.id.toString(), Validators.required],
        plataforma: [this.product.plataforma.toString(), Validators.required],
        //gender: [this.product.gender.id.toString(), Validators.required],
        //publisher: [this.product.publisher.id.toString(), Validators.required]
      });
      //this.image = this.product.imgUrl;
    })
  }

  atualizarImagem(event: any): void {
    this.image = event.target.value;
  }

  public registerProduct(): void {
    const dto: PutProductDTO = {
      id: this.id,
      nome: this.registrationFormGroup.controls['nome'].value,
      preco: this.registrationFormGroup.controls['preco'].value,
      estoque: this.registrationFormGroup.controls['estoque'].value,
      descricao: this.registrationFormGroup.controls['descricao'].value,
      //imgUrl: this.registrationFormGroup.controls['image'].value,
      plataforma: this.registrationFormGroup.controls['plataforma'].value,
    }
    console.log(dto)
    this.productService.putProduct(dto);
    this.notificationService.success("Produto editado com sucesso");
    if (this.isFormValid()) {

    }
  }
  private isFormValid(): boolean {
    return this.registrationFormGroup.valid;
  }

  onDate(event) {
    this.formDate = event.target.value;
  }
}
