package com.eventhive.services.host;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.eventhive.dto.host.ApiResponse;
import com.eventhive.dto.host.EventResponseDto;
import com.eventhive.dto.host.HostNewEventRequestDto;

public interface HostService {

	ApiResponse enterEvent(HostNewEventRequestDto dto, MultipartFile photoFile, Long hostId);
	
	List<EventResponseDto> fetchDetails(Long hostId);

}