import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../service/rest.service';
import {Product} from '../../model/product.model';

@Component({
  selector: 'app-purchase-details',
  templateUrl: './purchase-details.component.html',
  styleUrls: ['./purchase-details.component.less']
})
export class PurchaseDetailsComponent implements OnInit {

  product: Product;
  productId: string;

  constructor(private rest: RestService, private route: ActivatedRoute) {
    this.productId = route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.rest.getProduct(this.productId).subscribe((data: {}) => {
      this.product = (data as Product);
    });
  }

}
