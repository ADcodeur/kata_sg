package com.katasg.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.katasg.model.Transaction;

@Repository
public interface TransactionDao extends JpaRepository<Transaction, Long> {

}
