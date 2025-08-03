package com.eventhive.services.Attendee;

import java.math.BigDecimal;

public interface AttendeeWalletService {
	void addToWallet(Long userId, Long amountToAdd);
	BigDecimal getBalance(Long attendeeId);
}
