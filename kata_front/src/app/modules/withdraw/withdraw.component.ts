import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  withdrawSubscription: Subscription;

  constructor(businessService: BusinessService) {
    super(businessService);

    this.withdrawSubscription = this.businessService.withdrawResult.subscribe(
      (result) => {
        this.errorOccurs = !result.success;
        this.message = result.success
          ? WITHDRAW_SUCCESS_MESSAGE
          : result.message || ERROR_MESSAGE;
      }
    );
    this.subscriptions.add(this.withdrawSubscription);
  }

  withdraw() {
    this.message = null;
    this.errorOccurs = false;
    this.businessService.performWithdraw({
      account: this.account.value,
      amount: this.amount.value,
    });
  }
}
