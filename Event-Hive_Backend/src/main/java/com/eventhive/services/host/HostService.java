package com.eventhive.services.host;

import com.eventhive.dto.host.ApiResponse;
import com.eventhive.dto.host.HostNewEventRequestDto;

public interface HostService {

	ApiResponse enterEvent(HostNewEventRequestDto dto, Long hostId);

}