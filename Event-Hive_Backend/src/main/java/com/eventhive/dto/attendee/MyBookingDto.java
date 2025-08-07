package com.eventhive.dto.attendee;


import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
public class MyBookingDto {
    private Long ticketId;
    private Long eventId;

    private String eventName;
    private String category;
    private String photo;
    private LocalDateTime eventDate;

    private String phaseName;         
    private Integer quantity;
    private BigDecimal totalPrice;

    private LocalDateTime bookingDate;
    private String ticketStatus;      
}

