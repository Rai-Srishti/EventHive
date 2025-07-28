package com.eventhive.services.Attendee;

import java.util.List;

import com.eventhive.dto.attendee.AttendeeEventDetailsDto;
import com.eventhive.dto.attendee.AttendeeEventPhaseDto;

public interface AttendeeEventPhaseService {

	 List<AttendeeEventPhaseDto> getPhasesByEventId(Long eventId);
}
