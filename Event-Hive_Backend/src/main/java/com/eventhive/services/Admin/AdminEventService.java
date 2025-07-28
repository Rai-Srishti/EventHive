package com.eventhive.services.Admin;

import java.util.List;

import com.eventhive.dto.admin.AdminEventResponseDTO;

public interface AdminEventService {

	List<AdminEventResponseDTO> fetchpendingEvents();

}
