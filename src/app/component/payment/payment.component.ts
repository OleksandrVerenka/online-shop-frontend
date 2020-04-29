import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CreditCard } from '../../model/credit-card.model';
import { RestService } from '../../service/rest.service';
import {Product} from '../../model/product.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.less']
})
export class PaymentComponent implements OnInit {

  productId: string;
  product: Product = new Product();
  creditCard: CreditCard = new CreditCard();
  isFormValid = true;
  creditCardPattern = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
  cvPattern = /\d{3}/;
  monthPattern = /^(1[0-2]|[1-9])$/;
  yearPattern = /\d{2}/;

  constructor(private rest: RestService, private route: ActivatedRoute, private router: Router) {
    this.productId = route.snapshot.params.id;
  }

  ngOnInit(): void {
    this.rest.getProduct(this.productId).subscribe((data: {}) => {
      this.product = (data as Product);
    });
  }

  buyProduct(cardForm) {
    if (cardForm.valid) {
      this.router.navigate(['/products/' + this.productId + '/purchase/details']);
    } else {
      this.isFormValid = false;
    }

  }

  setInputStyle(model) {
    return {'border-color': !this.isFormValid && model.errors ? 'red' : ''};
  }
}
