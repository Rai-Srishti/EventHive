package com.eventhive.dto.host;

import java.time.LocalDateTime;
import java.util.List;

import com.eventhive.entities.enums.EventApprovalStatus;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class HostNewEventRequestDto {
	  
    private String eventName;

    private String description;

    private String city;

    private String address;

    private LocalDateTime eventDate;

    private String category;
    
    public String artistName;

    private EventApprovalStatus status = EventApprovalStatus.PENDING;

    private LocalDateTime createdAt = LocalDateTime.now();

    private LocalDateTime updatedAt;

    private List<PhaseDto> phases;
    
}
