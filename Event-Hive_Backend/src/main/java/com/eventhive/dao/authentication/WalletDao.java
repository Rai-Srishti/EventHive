package com.eventhive.dao.authentication;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.Wallet;

public interface WalletDao extends JpaRepository<Wallet, Long>  {

}
