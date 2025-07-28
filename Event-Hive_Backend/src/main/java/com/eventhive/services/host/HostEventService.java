package com.eventhive.services.host;

import com.eventhive.dto.host.ApiResponse;
import com.eventhive.dto.host.EventResponseDto;
import com.eventhive.dto.host.HostUpdateEventDto;

public interface HostEventService {

	EventResponseDto getEventDetails(Long eventId);
	
	ApiResponse deleteEvent(Long eventId);

	ApiResponse updateEvent(Long eventId,HostUpdateEventDto dto);

}
