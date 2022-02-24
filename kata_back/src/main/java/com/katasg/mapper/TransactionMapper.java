package com.katasg.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.katasg.dto.TransactionDto;
import com.katasg.model.Transaction;

public class TransactionMapper {

	public TransactionDto map(Transaction entity) {
		TransactionDto dto = new TransactionDto();
		dto.setDate(entity.getDate().getEpochSecond());
		dto.setAction(entity.getAction().name());
		dto.setAmount(entity.getAmount());
		return dto;
	}

	public List<TransactionDto> map(List<Transaction> entities) {
		if (entities == null || entities.isEmpty()) {
			return new ArrayList<>();
		}
		return entities.stream().map(entity -> map(entity)).collect(Collectors.toList());
	}
}
