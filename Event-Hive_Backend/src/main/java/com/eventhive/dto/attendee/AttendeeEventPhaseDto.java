package com.eventhive.dto.attendee;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.eventhive.entities.enums.TicketPhaseName;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class AttendeeEventPhaseDto {
	private Long phaseId;
    private TicketPhaseName phaseName;
    private BigDecimal price;
    private Integer totalTickets;
    private Integer availableTickets;
    private LocalDateTime startTime;
    private LocalDateTime endTime;

}
