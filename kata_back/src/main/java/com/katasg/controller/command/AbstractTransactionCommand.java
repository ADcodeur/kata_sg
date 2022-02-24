package com.katasg.controller.command;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AbstractTransactionCommand {
	private String account;
	private Long amount;
}
