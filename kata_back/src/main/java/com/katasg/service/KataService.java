package com.katasg.service;

import java.time.Instant;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.katasg.controller.command.DepositCommand;
import com.katasg.controller.command.HistoryCommand;
import com.katasg.controller.command.WithdrawCommand;
import com.katasg.dao.AccountDao;
import com.katasg.dao.TransactionDao;
import com.katasg.dto.HistoryDto;
import com.katasg.mapper.TransactionMapper;
import com.katasg.model.Account;
import com.katasg.model.Action;
import com.katasg.model.Transaction;

@Service
@Transactional
public class KataService {

	private AccountDao accountDao;

	private TransactionDao transactionDao;

	private TransactionMapper transactionMapper;

	@Autowired
	public KataService(AccountDao accountDao, TransactionDao transactionDao) {
		this.accountDao = accountDao;
		this.transactionDao = transactionDao;
		this.transactionMapper = new TransactionMapper();

	}

	public void deposit(DepositCommand command) {
		Optional<Account> oac = this.accountDao.findById(command.getAccount());

		Account ac;
		if (oac.isPresent()) {
			ac = oac.get();
			ac.setBalance(ac.getBalance() + command.getAmount());
		} else {
			ac = new Account(command.getAccount(), command.getAmount());
		}

		ac.getTransactions().add(new Transaction(null, ac, Instant.now(), Action.DEPOSIT, command.getAmount()));
		this.accountDao.save(ac);
	}

	public void withdraw(WithdrawCommand command) {
		Account ac = this.findById(command.getAccount());

		if (ac.getBalance() < command.getAmount()) {
			throw new RuntimeException("Insufficient balance");
		}

		ac.setBalance(ac.getBalance() - command.getAmount());
		ac.getTransactions().add(new Transaction(null, ac, Instant.now(), Action.WITHDRAW, command.getAmount()));
		this.accountDao.save(ac);
	}

	public HistoryDto getHistory(HistoryCommand command) {
		Account ac = this.findById(command.getAccount());
		return new HistoryDto(ac.getBalance(), transactionMapper.map(ac.getTransactions()));
	}

	private Account findById(String accountName) {
		return this.accountDao.findById(accountName)
				.orElseThrow(() -> new RuntimeException("Account not found"));
	}
}
