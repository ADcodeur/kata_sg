import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import {
  DEPOSIT_SUCCESS_MESSAGE,
  ERROR_MESSAGE,
} from 'src/app/shared/constants';
import { AbstractTransactionComponent } from '../abstract/abstract-transaction';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.scss'],
})
export class DepositComponent
  extends AbstractTransactionComponent
  implements OnInit
{
  constructor(businessService: BusinessService) {
    super(businessService);
  }

  deposit() {
    try {
      this.message = null;
      this.errorOccurs = false;
      this.businessService
        .performDeposit({
          account: this.account.value,
          amount: this.amount.value,
        })
        .then((foo) => {
          this.message = DEPOSIT_SUCCESS_MESSAGE;
        })
        .catch((error) => {
          this.errorOccurs = true;
          this.message = error?.error || ERROR_MESSAGE;
        });
    } catch (error: any) {
      this.errorOccurs = true;
      this.message = error?.error || ERROR_MESSAGE;
    }
  }
}
