import { Injectable } from '@angular/core';
import {
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
  constructor(private apiService: ApiService) {}

  performDeposit(command: DepositCommand): Promise<any> {
    this.checkError(this.isDepositCommandValid, command);
    return this.apiService.deposit(command);
  }

  performWithdraw(command: WithdrawCommand): Promise<any> {
    this.checkError(this.isWithdrawCommandValid, command);
    return this.apiService.withdraw(command);
  }

  getHistory(command: HistoryCommand): Promise<HistoryDto> {
    this.checkError(this.isHistoryCommandValid, command);
    return this.apiService.history(command);
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
