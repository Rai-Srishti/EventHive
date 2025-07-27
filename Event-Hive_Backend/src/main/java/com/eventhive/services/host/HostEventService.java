package com.eventhive.services.host;

import com.eventhive.dto.host.EventResponseDto;

public interface HostEventService {

	EventResponseDto getEventDetails(Long eventId);

}
