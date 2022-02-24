import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/services/business.service';
import {
  ERROR_MESSAGE,
  WITHDRAW_SUCCESS_MESSAGE,
} from 'src/app/shared/constants';
import { AbstractTransactionComponent } from '../abstract/abstract-transaction';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss'],
})
export class WithdrawComponent
  extends AbstractTransactionComponent
  implements OnInit
{
  constructor(businessService: BusinessService) {
    super(businessService);
  }

  withdraw() {
    try {
      this.message = null;
      this.errorOccurs = false;
      this.businessService
        .performWithdraw({
          account: this.account.value,
          amount: this.amount.value,
        })
        .then((foo) => {
          this.message = WITHDRAW_SUCCESS_MESSAGE;
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
