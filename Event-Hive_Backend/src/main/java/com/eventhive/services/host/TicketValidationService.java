package com.eventhive.services.host;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.dto.host.QrValidationRequestDto;
import com.eventhive.dto.host.QrValidationResponseDto;

public interface TicketValidationService{

	QrValidationResponseDto validate(QrValidationRequestDto request);  
}

