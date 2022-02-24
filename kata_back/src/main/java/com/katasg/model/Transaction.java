package com.katasg.model;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "TRANSACTION")

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TRANSACTION_SEQUENCE")
	@SequenceGenerator(name = "TRANSACTION_SEQUENCE", sequenceName = "TRANSACTION_SEQUENCE", allocationSize = 1)
	@Column(name = "TX_ID")
	private Long id;

	@ManyToOne
	private Account account;

	@Column(name = "DATE")
	private Instant date;

	@Column(name = "ACTION")
	private Action action;

	@Column(name = "AMOUNT")
	private Long amount;
}
