package com.eventhive.dto.event;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EventDto {

	 private Long eventId;
	    private String eventName;
	    private String description;
	    private String city;
	    private String address;
	    private String category;
	    private String photo;
	    private LocalDateTime eventDate;
	    private String artistName;
	    private String hostName; 
}
