package com.eventhive.services.Attendee;

import java.util.List;

import com.eventhive.dto.attendee.AttendeeDto;
import com.eventhive.dto.attendee.EventDto;

public interface AttendeeService {
	AttendeeDto getAttendeeById(Long id);
	void updateAttendeeProfile(Long id, AttendeeDto request);
}
