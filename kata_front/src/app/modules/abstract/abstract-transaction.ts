import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessService } from 'src/app/services/business.service';
import { ACCOUNT_PH, AMOUNT_PH } from 'src/app/shared/constants';

@Component({
  template: '',
  styleUrls: [],
})
export abstract class AbstractTransactionComponent implements OnInit {
  ACCOUNT_PH = ACCOUNT_PH;
  AMOUNT_PH = AMOUNT_PH;

  fg: FormGroup;
  account: FormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
  ]);
  amount: FormControl = new FormControl('', [
    Validators.required,
    Validators.min(0),
  ]);

  errorOccurs: boolean = false;
  message: string | null = null;

  constructor(protected businessService: BusinessService) {
    this.fg = new FormGroup({
      account: this.account,
      amount: this.amount,
    });
  }

  ngOnInit(): void {}
}
