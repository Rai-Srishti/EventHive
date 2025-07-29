package com.eventhive.services.Admin;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.eventhive.dto.admin.AdminEventResponseDTO;
import com.eventhive.dto.host.ApiResponse;

public interface AdminEventService {

	List<AdminEventResponseDTO> fetchpendingEvents();

	ResponseEntity<ApiResponse> updateEvent(Long eventId);

}
