import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';
import {
  ACCOUNT_PH,
  ERROR_MESSAGE,
  NO_TRANSACTION,
} from 'src/app/shared/constants';
import { TransactionDto } from 'src/app/shared/model';
import { getDate } from 'src/app/shared/utils';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
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
  constructor(private businessService: BusinessService) {}

  ngOnInit(): void {}

  getHistory() {
    try {
      this.transactionList = [];
      this.message = null;
      this.errorOccurs = false;
      this.businessService
        .getHistory({
          account: this.account.value,
        })
        .then((data) => {
          if (data == undefined || data.transactions.length == 0) {
            this.message = NO_TRANSACTION;
          } else {
            this.balance = data.balance;
            this.transactionList = data.transactions;
          }
        })
        .catch((error) => {
          console.log(error);
          this.errorOccurs = true;
          this.message = error?.error || ERROR_MESSAGE;
        });
    } catch (error: any) {
      this.errorOccurs = true;
      this.message = error?.error || ERROR_MESSAGE;
    }
  }
}
