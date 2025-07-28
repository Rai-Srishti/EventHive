package com.eventhive.services.Admin;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.eventhive.custom_exception.EventNotFoundException;
import com.eventhive.dao.admin.AdminEventDao;
import com.eventhive.dto.admin.AdminEventResponseDTO;
import com.eventhive.entities.Event;
import com.eventhive.entities.enums.EventApprovalStatus;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor

public class AdminEventServiceImpl implements AdminEventService{
	
	private final AdminEventDao adminEventDao;
	private final ModelMapper mapper;
	
	
	
	@Override
	public List<AdminEventResponseDTO> fetchpendingEvents() {
		List<Event> eventList = adminEventDao.findByStatus(EventApprovalStatus.PENDING);
		if(eventList.isEmpty()) {
			throw new EventNotFoundException("No Pending Event!!");
		}
		
		return eventList.stream()
				.map(evt->mapper.map(evt, AdminEventResponseDTO.class))
				.toList();
	}
	
	
	
}
