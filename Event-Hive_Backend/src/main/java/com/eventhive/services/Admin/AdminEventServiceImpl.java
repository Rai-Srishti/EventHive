package com.eventhive.services.Admin;

import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.eventhive.custom_exception.ApiException;
import com.eventhive.custom_exception.EventNotFoundException;
import com.eventhive.dao.admin.AdminArtistDao;
import com.eventhive.dao.admin.AdminEventDao;
import com.eventhive.dto.admin.AdminEventResponseDTO;
import com.eventhive.dto.host.ApiResponse;
import com.eventhive.entities.Event;
import com.eventhive.entities.Artist;
import com.eventhive.entities.enums.EventApprovalStatus;
import com.eventhive.entities.enums.UserStatus;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor

public class AdminEventServiceImpl implements AdminEventService{
	
	private final AdminEventDao adminEventDao;
	private final AdminArtistDao adminArtistDao;
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



	@Override
	public ResponseEntity<ApiResponse> updateEvent(Long eventId) {
		Event event = adminEventDao.findById(eventId)
				.orElseThrow(()->new ApiException("Event Not Found"));
		
		Artist artist = event.getArtist();
		
		if(artist==null ||event.getArtist().getArtistId()==null ||!adminArtistDao.existsById(artist.getArtistId())) {
			event.setStatus(EventApprovalStatus.REJECTED);
			event.setUpdatedAt(LocalDateTime.now());
			adminEventDao.save(event);
			return ResponseEntity.ok(new ApiResponse("Artist not found or not assigned to event. Event rejected."));
		}
		
		
		if(event.getHost()==null || event.getHost().getStatus()==UserStatus.BLOCKED) {
			event.setStatus(EventApprovalStatus.REJECTED);
	        event.setUpdatedAt(LocalDateTime.now());
	        adminEventDao.save(event);
	        return ResponseEntity.ok(new ApiResponse("Event host is blocked or not assigned. Event rejected."));
		}
		
		if (event.getCreatedAt() == null || event.getEventDate() == null) {
			 	event.setStatus(EventApprovalStatus.REJECTED);
		        event.setUpdatedAt(LocalDateTime.now());
		        adminEventDao.save(event);
		        return ResponseEntity.ok(new ApiResponse("Event date or created date is missing. Event rejected."));
	    }
		
		long daysBetween = java.time.Duration.between(event.getCreatedAt(), event.getEventDate()).toDays();
	    if (daysBetween < 15) {
	    	event.setStatus(EventApprovalStatus.REJECTED);
	    	event.setUpdatedAt(LocalDateTime.now());
	    	adminEventDao.save(event);
	    	return ResponseEntity.ok(new ApiResponse("Event must be scheduled at least 15 days after its creation. Event rejected."));
	    }
	    
	    event.setStatus(EventApprovalStatus.APPROVED);
	    event.setUpdatedAt(LocalDateTime.now());
	    adminEventDao.save(event);
	    
	    return ResponseEntity.ok(new ApiResponse("Event approved successfully!"));
		
	}
	
}
