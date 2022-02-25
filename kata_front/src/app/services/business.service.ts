import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NO_TRANSACTION } from '../shared/constants';
import {
  DataReponse,
  DepositCommand,
  HistoryCommand,
  HistoryDto,
  WithdrawCommand,
} from '../shared/model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  depositResult: Subject<DataReponse<boolean>> = new Subject<
    DataReponse<boolean>
  >();
  withdrawResult: Subject<DataReponse<boolean>> = new Subject<
    DataReponse<boolean>
  >();
  historyResult: Subject<DataReponse<HistoryDto>> = new Subject<
    DataReponse<HistoryDto>
  >();

  constructor(private apiService: ApiService) {}

  performDeposit(command: DepositCommand) {
    try {
      this.checkError(this.isDepositCommandValid, command);
      this.apiService
        .deposit(command)
        .then((foo) => {
          this.depositResult.next({
            success: true,
          });
        })
        .catch((error) => {
          this.depositResult.next({
            success: false,
            message: error?.error,
          });
        });
    } catch (error: any) {
      this.depositResult.next({
        success: false,
        message: error?.error,
      });
    }
  }

  performWithdraw(command: WithdrawCommand) {
    try {
      this.checkError(this.isWithdrawCommandValid, command);
      this.apiService
        .withdraw(command)
        .then((foo) => {
          this.withdrawResult.next({
            success: true,
          });
        })
        .catch((error) => {
          this.withdrawResult.next({
            success: false,
            message: error?.error,
          });
        });
    } catch (error: any) {
      this.withdrawResult.next({
        success: false,
        message: error?.error,
      });
    }
  }

  getHistory(command: HistoryCommand) {
    try {
      this.checkError(this.isHistoryCommandValid, command);
      this.apiService
        .history(command)
        .then((data) => {
          if (data == undefined || data.transactions.length == 0) {
            this.historyResult.next({
              success: true,
              message: NO_TRANSACTION,
            });
          } else {
            this.historyResult.next({
              success: true,
              data,
            });
          }
        })
        .catch((error) => {
          this.historyResult.next({
            success: false,
            message: error?.error,
          });
        });
    } catch (error: any) {
      this.historyResult.next({
        success: false,
        message: error?.error,
      });
    }
  }

  private checkError(func: (payload: any) => string | null, payload: any) {
    let errorMessage: string | null = func(payload);
    if (errorMessage != null) {
      throw new Error(errorMessage);
    }
  }

  private isDepositCommandValid(command: DepositCommand): string | null {
    if (command.account == undefined || command.account.length < 1) {
      return 'Please provide a valid account name';
    }
    if (command.amount == undefined || command.amount < 1) {
      return 'Please provide a valid amount';
    }
    return null;
  }

  private isWithdrawCommandValid(command: WithdrawCommand): string | null {
    if (command.account == undefined || command.account.length < 1) {
      return 'Please provide a valid account name';
    }
    if (command.amount == undefined || command.amount < 1) {
      return 'Please provide a valid amount';
    }
    return null;
  }

  private isHistoryCommandValid(command: HistoryCommand): string | null {
    if (command.account == undefined || command.account.length < 1) {
      return 'Please provide a valid account name';
    }
    return null;
  }
}
