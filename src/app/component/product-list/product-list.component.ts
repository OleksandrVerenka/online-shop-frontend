import { Component, OnInit } from '@angular/core';
import { RestService } from '../../service/rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../../model/product.model';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {

  private page = 1;
  size = 8;
  pages: Array<number> = [];
  products: Array<Product> = [];

  constructor(public rest: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(): void {
    this.products = [];
    this.rest.getProducts(this.page, this.size).subscribe((data: {}) => {
      this.products = data['content'];
      this.pages = new Array(data['totalPages']);
    });
  }

  buyProduct(id: string): void {
    this.router.navigate(['/products/' + id + '/payment']);
  }

  setPage(i: number, event: Event) {
    event.preventDefault();
    this.page = i + 1;
    this.getProducts();
  }
}
