package com.eventhive.services.host;

import com.eventhive.dto.host.EventResponseDto;

public interface EventService {

	EventResponseDto getEventDetails(Long eventId);

}
