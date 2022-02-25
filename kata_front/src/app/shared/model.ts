export interface DepositCommand {
  account: string;
  amount: number;
}

export interface WithdrawCommand {
  account: string;
  amount: number;
}

export interface HistoryCommand {
  account: string;
}

export interface HistoryDto {
  balance: number;
  transactions: TransactionDto[];
}

export interface TransactionDto {
  date: number;
  action: ACTION;
  amount: number;
}

export interface DataReponse<T> {
  success: boolean;
  message?: string;
  data?: T;
}

export type ACTION = 'DEPOSIT' | 'WITHDRAW';
