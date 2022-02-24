package com.katasg.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.Getter;
import lombok.Setter;

@Table(name = "ACCOUNT")

@Entity
@Getter
@Setter
public class Account {

	@Id
	@Column(name = "ACCOUNT_NAME")
	private String name;

	@OneToMany(mappedBy = "account", cascade = CascadeType.ALL)
	private List<Transaction> transactions;

	@Column(name = "BALANCE")
	private Long balance;

	public Account(String name, Long balance) {
		this.name = name;
		this.balance = balance;
		this.transactions = new ArrayList<>();
	}

	public Account() {
		this.transactions = new ArrayList<>();
	}
}
