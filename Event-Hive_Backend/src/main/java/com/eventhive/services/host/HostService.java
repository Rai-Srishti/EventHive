package com.eventhive.services.host;

import java.util.List;

import com.eventhive.dto.host.ApiResponse;
import com.eventhive.dto.host.EventResponseDto;
import com.eventhive.dto.host.HostNewEventRequestDto;

public interface HostService {

	ApiResponse enterEvent(HostNewEventRequestDto dto, Long hostId);
	
	List<EventResponseDto> fetchDetails(Long hostId);

}