package com.katasg.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class HistoryDto {

	private Long balance;

	List<TransactionDto> transactions;
}
