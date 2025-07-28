package com.eventhive.dto.host;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.eventhive.entities.enums.EventApprovalStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PhaseDto {
	private String phaseName;
    private BigDecimal price;
    private Integer availableTickets;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
}
