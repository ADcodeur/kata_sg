package com.katasg.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TransactionDto {

	private Long date;

	private String action;

	private Long amount;
}
