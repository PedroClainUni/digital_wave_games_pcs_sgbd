import { Component, OnInit } from '@angular/core';
import { PutProductDTO } from '../../shared/models/dto/product/putProduct.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/services/product.service';
import { NotificationService } from 'src/app/shared/services/notification.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/shared/models/product/product.model';

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
      this.id = parseInt(param.get('produto'))
    });
    this.getProduct();
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
      image: ['', Validators.required],
      youtubeIds: [''],
      releaseDate: ['', Validators.required],
      ageRating: ['', Validators.required],
      platform: ['', Validators.required],
      gender: ['', Validators.required],
      publisher: ['', Validators.required]
    });
  }

  getProduct():void {
    this.productService.getProduct(this.id).subscribe(p => {
      this.product = {
        id: p.id,
        nome: p.nome,
        descricao: p.descricao,
        estoque: p.estoque,
        preco: p.preco,
        releaseDate: p.releaseDate,
        imgUrl: p.imgUrl,
        youtubeIds: p.youtubeIds,
        gender: {
          id: p.gender.id,
          name: p.gender.name
        },
        plataforma: {
          id: p.plataforma.id,
          name: p.plataforma.name
        },
        publisher: {
          id: p.publisher.id,
          name: p.publisher.name
        },
        ratingSystem: {
          id: p.ratingSystem.id,
          name: p.ratingSystem.name
        }
      }
      this.registrationFormGroup = this.formBuilder.group({
        name: [this.product.nome, Validators.required],
        price: [this.product.preco/100, Validators.required],
        amount: [this.product.estoque, Validators.required],
        description: [this.product.descricao, Validators.required],
        image: [this.product.imgUrl, Validators.required],
        youtubeIds: [this.product.youtubeIds.join(',')],
        releaseDate: [this.product.releaseDate, Validators.required],
        ageRating: [this.product.ratingSystem.id.toString(), Validators.required],
        platform: [this.product.plataforma.id.toString(), Validators.required],
        gender: [this.product.gender.id.toString(), Validators.required],
        publisher: [this.product.publisher.id.toString(), Validators.required]
      });
      this.image = this.product.imgUrl;
    })
  }

  atualizarImagem(event: any): void {
    this.image = event.target.value;
  }

  public registerProduct(): void {
    const dto: PutProductDTO = {
      id: this.id,
      name: this.registrationFormGroup.controls['name'].value,
      price: this.registrationFormGroup.controls['price'].value * 100,
      amount: this.registrationFormGroup.controls['amount'].value,
      description: this.registrationFormGroup.controls['description'].value,
      releaseDate: moment(this.registrationFormGroup.controls['releaseDate'].value).format('YYYY-MM-DD'),
      imgUrl: this.registrationFormGroup.controls['image'].value,
      youtubeIds: this.registrationFormGroup.controls['youtubeIds'].value.split(','),
      ratingSystemId: this.registrationFormGroup.controls['ageRating'].value,
      platformId: this.registrationFormGroup.controls['platform'].value,
      genderId: this.registrationFormGroup.controls['gender'].value,
      publisherId: this.registrationFormGroup.controls['publisher'].value,
    }
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
