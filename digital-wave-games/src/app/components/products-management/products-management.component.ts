import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { filter } from 'rxjs';
import { Product } from 'src/app/shared/models/product/product.modelnew';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { ProductService } from 'src/app/shared/services/product.service';


@Component({
  selector: 'app-products-management',
  templateUrl: './products-management.component.html',
  styleUrls: ['./products-management.component.scss']
})
export class ProductsManagementComponent implements OnInit, AfterViewInit {
  public searchName;
  products: Product[] = [];
  filterProducts: Product[];
  displayedColumns: string[] = ['id', 'name', 'price', 'amount', 'platform', 'remove', 'edit']
  dataSource = new MatTableDataSource([]);

  constructor(private _liveAnnouncer: LiveAnnouncer,
    private notificationService: NotificationService,
    private productService: ProductService,
   ) { }

  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    this.products = this.getProducts();
    this.filterProducts = this.products;
    this.dataSource = new MatTableDataSource(this.products);
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    document.addEventListener("keydown", function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
      }
    });
  }

 enterSearch(event: any) {
    this.searchName = event.target.value;
    this.productService.getProducts().subscribe((response) => {
      this.products = response.body.filter(this.haveName.bind(null, this.searchName));
      this.reloadTableT();
    });
  }


  private haveName(search, element): boolean {
    return element.name.toUpperCase().indexOf(search.toUpperCase()) !=  -1 || search == "";
  }

  search(event: any) {
    const pattern: string = event.target.value;
    this.filterProducts = this.products.filter(p => {
      return p.nome.toUpperCase().startsWith(pattern.toUpperCase());
    })
    this.dataSource = new MatTableDataSource(this.filterProducts);
  }

  getProducts() {
    const products: Product[] = [];
    this.productService.getProducts().subscribe(response => {
      response.body.forEach(item => {
        const product: Product = {
          id: item._id,
          nome: item.nome,
          descricao: item.descricao,
          estoque: item.estoque,
          preco: item.preco,
          plataforma: item.plataforma
        }
        products.push(product);
      })

      this.reloadTable(products);
    })
    return products;
  }

  reloadTable(products) {
    this.dataSource = new MatTableDataSource(products);
    this.dataSource.sort = this.sort;
  }

  reloadTableT() {
    this.dataSource = new MatTableDataSource(this.products);
    this.dataSource.sort = this.sort;
  }

  formatDate(date: Date) {
    return date.toLocaleDateString('pt-BR');
  }
  remove(id: string) {
  
    this.productService.deleteProduct(id);
    this.dataSource = new MatTableDataSource(this.filterProducts);
    this.notificationService.success("Produto removido com successo");
    this.reloadTable(this.getProducts());
  }

  removeFromArray(id: number) {
    this.products = this.products.filter(p => {
      return p.id !== id;
    })
    this.filterProducts = this.filterProducts.filter(p => {
      return p.id !== id;
    })
  }
}
