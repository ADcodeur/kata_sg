import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepositComponent } from './modules/deposit/deposit.component';
import { HistoryComponent } from './modules/history/history.component';
import { WithdrawComponent } from './modules/withdraw/withdraw.component';

const routes: Routes = [
  {
    path: 'deposit',
    component: DepositComponent,
  },
  {
    path: 'withdraw',
    component: WithdrawComponent,
  },
  {
    path: 'history',
    component: HistoryComponent,
  },
  { path: '**', redirectTo: 'deposit', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
