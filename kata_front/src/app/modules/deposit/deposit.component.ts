import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
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
  depositSubscription: Subscription;

  constructor(businessService: BusinessService) {
    super(businessService);

    this.depositSubscription = this.businessService.depositResult.subscribe(
      (result) => {
        this.errorOccurs = !result.success;
        this.message = result.success
          ? DEPOSIT_SUCCESS_MESSAGE
          : result.message || ERROR_MESSAGE;
      }
    );
    this.subscriptions.add(this.depositSubscription);
  }

  deposit() {
    this.message = null;
    this.errorOccurs = false;
    this.businessService.performDeposit({
      account: this.account.value,
      amount: this.amount.value,
    });
  }
}
