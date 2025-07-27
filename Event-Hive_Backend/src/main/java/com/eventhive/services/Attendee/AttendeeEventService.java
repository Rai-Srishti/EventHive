package com.eventhive.services.Attendee;

import java.util.List;

import com.eventhive.dto.attendee.EventDto;

public interface AttendeeEventService {

	List<EventDto> getAllApprovedEvents();
	
}
