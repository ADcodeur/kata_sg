import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { API_ROOT_PATH } from '../shared/constants';
import {
  DepositCommand,
  HistoryCommand,
  HistoryDto,
  WithdrawCommand,
} from '../shared/model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private hc: HttpClient) {}

  deposit(payload: DepositCommand): Promise<any> {
    return lastValueFrom(this.hc.post(API_ROOT_PATH + '/deposit', payload));
  }

  withdraw(payload: WithdrawCommand): Promise<any> {
    return lastValueFrom(this.hc.post(API_ROOT_PATH + '/withdraw', payload));
  }

  history(payload: HistoryCommand): Promise<HistoryDto> {
    return lastValueFrom(
      this.hc.post<HistoryDto>(API_ROOT_PATH + '/history', payload)
    );
  }
}
