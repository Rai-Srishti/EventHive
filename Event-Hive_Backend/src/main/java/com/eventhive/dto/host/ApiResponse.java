package com.eventhive.dto.host;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.eventhive.entities.enums.EventApprovalStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ApiResponse {

	private String message;
	private LocalDate timeStamp;
	public ApiResponse(String message) {
		
		this.message = message;
		timeStamp=LocalDate.now();
	}
	
	
	
}
