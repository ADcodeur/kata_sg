package com.katasg.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.katasg.model.Account;

@Repository
public interface AccountDao extends JpaRepository<Account, String> {

}
