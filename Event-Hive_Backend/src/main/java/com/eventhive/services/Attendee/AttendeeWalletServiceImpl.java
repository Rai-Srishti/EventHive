package com.eventhive.services.Attendee;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import com.eventhive.dao.attendee.AttendeeWalletDao;
import com.eventhive.entities.Wallet;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AttendeeWalletServiceImpl implements AttendeeWalletService{
	
	private final AttendeeWalletDao walletDao;
	@Override
	public void addToWallet(Long userId, Long amountToAdd) {
		Wallet wallet = walletDao.findByUserUserId(userId)
	            .orElseThrow(() -> new RuntimeException("Wallet not found for user"));

	        BigDecimal updated = wallet.getBalance().add(BigDecimal.valueOf(amountToAdd));
	        wallet.setBalance(updated);
	        walletDao.save(wallet);
		
	}
	@Override
	public BigDecimal getBalance(Long attendeeId) {
		Wallet wallet = walletDao.findByUserUserId(attendeeId)
	            .orElseThrow(() -> new RuntimeException("Wallet not found for user"));
		
		return wallet.getBalance();
	}
	
	

}
