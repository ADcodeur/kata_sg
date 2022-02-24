package com.katasg.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.katasg.controller.command.DepositCommand;
import com.katasg.controller.command.HistoryCommand;
import com.katasg.controller.command.WithdrawCommand;
import com.katasg.dto.HistoryDto;
import com.katasg.service.KataService;
import com.sun.istack.NotNull;

@RestController
@RequestMapping("/api")
public class KataSgController {

	private KataService kataService;

	@Autowired
	public KataSgController(KataService kataService) {
		this.kataService = kataService;
	}

	@PostMapping("/deposit")
	public void deposit(@RequestBody @Validated @NotNull DepositCommand command) {
		this.kataService.deposit(command);
	}

	@PostMapping("/withdraw")
	public void withdraw(@RequestBody @Validated @NotNull WithdrawCommand command) {
		this.kataService.withdraw(command);
	}

	@PostMapping("/history")
	public HistoryDto history(@RequestBody @Validated @NotNull HistoryCommand command) {
		return this.kataService.getHistory(command);
	}
}
