import { TestBed } from '@angular/core/testing';
import { ApiService } from 'src/app/services/api.service';
import { BusinessService } from 'src/app/services/business.service';
import {
  DepositCommand,
  HistoryCommand,
  HistoryDto,
  WithdrawCommand,
} from 'src/app/shared/model';
import { DepositComponent } from './deposit.component';

class MockApiService {
  deposit(payload: DepositCommand): Promise<any> {
    if (payload.amount < 1) {
      throw new Error('Invalid amount');
    }
    return Promise.resolve(null);
  }

  withdraw(payload: WithdrawCommand): Promise<any> {
    if (payload.amount < 1) {
      throw new Error('Invalid amount');
    }
    return Promise.resolve(null);
  }

  history(payload: HistoryCommand): Promise<HistoryDto> {
    return Promise.resolve({
      balance: 10,
      transactions: [],
    });
  }
}

describe('DepositComponent', () => {
  let component: DepositComponent;
  let businessService: BusinessService;
  let apiService: ApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        DepositComponent,
        BusinessService,
        { provide: ApiService, useClass: MockApiService },
      ],
    }).compileComponents();
    component = TestBed.inject(DepositComponent);
    businessService = TestBed.inject(BusinessService);
    apiService = TestBed.inject(ApiService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should be ok', () => {
    component.account.setValue('main1');
    component.amount.setValue(100);
    component.deposit();
    expect(component.errorOccurs).toBeFalse();
  });

  it('should has error', () => {
    component.account.setValue('main1');
    component.amount.setValue(-100);
    component.deposit();
    expect(component.errorOccurs).toBeTrue();
  });
});
