package com.eventhive.dto.attendee;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TicketResponseDto {

    private Long ticketId;
    private String eventTitle;
    private String phaseName;
    private Integer quantity;
    private BigDecimal totalPrice;
    private LocalDateTime bookingDate;
    private String status;
}