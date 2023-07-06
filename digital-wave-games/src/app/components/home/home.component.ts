import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ProductService } from './../../shared/services/product.service';
import { Product } from './../../shared/models/product/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  public products;
  categoryCounts = ['Ação', 'Aventura'];
  constructor(private productService: ProductService) { }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.getProducts();
    })
  }

  ngOnInit(): void {
  }
  getProducts() {

    this.productService.getProducts().subscribe(response => {
      this.products = [];
      response.body.forEach(item => {
        const product: Product = {
          id: item._id,
          nome: item.nome,
          descricao: item.descricao,
          estoque: item.estoque,
          preco: item.preco,
          plataforma: {
            id: item.plataforma.id,
            name: item.plataforma.name
          },
        }
        this.products.push(product);
      })
    })
  }
  countCategory(products): string[] {
    let productsCategories = [];
    products.forEach(product => {
      if (productsCategories.indexOf(product.gender.name) == -1) {
        productsCategories.push(product.gender.name);
      }
    });

    return productsCategories;
  }

  productByCategory(category){
    let productsBycategory = [];
    this.products.forEach(product =>{
      if(product.gender.name == category){
        productsBycategory.push(product)
      }
    })
    return productsBycategory;
  }
}
