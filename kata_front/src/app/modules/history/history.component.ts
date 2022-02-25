import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BusinessService } from 'src/app/services/business.service';
import { ACCOUNT_PH, ERROR_MESSAGE } from 'src/app/shared/constants';
import { TransactionDto } from 'src/app/shared/model';
import { getDate } from 'src/app/shared/utils';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit, OnDestroy {
  ACCOUNT_PH = ACCOUNT_PH;
  getDate = getDate;
  message: string | null = null;

  account: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  balance: number | null = null;
  transactionList: TransactionDto[] = [];
  errorOccurs: boolean = false;

  historySubscription: Subscription;

  constructor(private businessService: BusinessService) {
    this.historySubscription = this.businessService.historyResult.subscribe(
      (result) => {
        this.errorOccurs = !result.success;
        this.message = result.success
          ? result.message || null
          : result.message || ERROR_MESSAGE;
        this.balance = result.data?.balance || 0;
        this.transactionList = result.data?.transactions || [];
      }
    );
  }
  ngOnDestroy(): void {
    this.historySubscription.unsubscribe();
  }

  ngOnInit(): void {}

  getHistory() {
    this.balance = 0;
    this.transactionList = [];
    this.message = null;
    this.errorOccurs = false;
    this.businessService.getHistory({
      account: this.account.value,
    });
  }
}
