package com.eventhive.dao.attendee;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.Wallet;

public interface AttendeeWalletDao extends JpaRepository<Wallet, Long>{
	Optional<Wallet> findByUserUserId(Long userId);
}
