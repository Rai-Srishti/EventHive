package com.eventhive.services.Admin;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.eventhive.dto.admin.AdminArtistDTO;
import com.eventhive.dto.admin.AdminEditEventDTO;
import com.eventhive.dto.admin.AdminEventResponseDTO;
import com.eventhive.dto.host.ApiResponse;

public interface AdminEventService {

	List<AdminEventResponseDTO> fetchpendingEvents();

	ResponseEntity<ApiResponse> updateEvent(Long eventId);

	List<AdminEventResponseDTO> fetchApprovedEvents();

	List<AdminArtistDTO> findAll();

	AdminEditEventDTO getEventForEdit(Long eventId);

	ResponseEntity<ApiResponse> updateEditedEvent(Long eventId, AdminEditEventDTO dto);



}
