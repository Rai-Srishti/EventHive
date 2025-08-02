package com.eventhive.dto.host;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class QrValidationResponseDto {
	private String status;   // e.g., "VALIDATED", "REFUNDED", etc.
    private String message;

}
