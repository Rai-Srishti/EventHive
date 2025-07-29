package com.eventhive.services.Attendee;

import java.util.List;

import com.eventhive.dto.attendee.MyBookingDto;

public interface AttendeeBookingService {


	List<MyBookingDto> getBookingsByAttendeeId(Long userId);

	
}
