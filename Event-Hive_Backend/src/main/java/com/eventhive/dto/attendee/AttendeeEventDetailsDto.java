package com.eventhive.dto.attendee;

import java.util.List;

public class AttendeeEventDetailsDto {

	
	public class EventDetailsDto {
	    private Long eventId;
	    private String title;
	    private String description;
	    private String image;
	    private String date;
	    private String location;
	    private int seats;
	    private List<AttendeeTicketPhaseDto> phases;
	}

}
