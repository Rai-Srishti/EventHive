package com.eventhive.services.Admin;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.eventhive.custom_exception.ApiException;
import com.eventhive.custom_exception.EventNotFoundException;
import com.eventhive.dao.admin.AdminArtistDao;
import com.eventhive.dao.admin.AdminEventDao;
import com.eventhive.dto.admin.AdminArtistDTO;
import com.eventhive.dto.admin.AdminEditEventDTO;
import com.eventhive.dto.admin.AdminEventResponseDTO;
import com.eventhive.dto.admin.AdminHostDto;
import com.eventhive.dto.host.ApiResponse;
import com.eventhive.entities.Event;
import com.eventhive.entities.User;
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
				.map(evt->{
					 AdminEventResponseDTO dto = mapper.map(evt, AdminEventResponseDTO.class);
					 AdminHostDto hostDto = new AdminHostDto();
			         hostDto.setFirstName(evt.getHost().getFirstName());
			         dto.setHost(hostDto);
			         
			         if (evt.getArtist() != null) {
			             AdminArtistDTO artistDto = new AdminArtistDTO();
			             artistDto.setName(evt.getArtist().getName());
			             dto.setArtist(artistDto);
			         }
			        
			         return dto;
					}).toList();
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


	@Override
	public List<AdminEventResponseDTO> fetchApprovedEvents() {
		 return adminEventDao.findByStatus(EventApprovalStatus.APPROVED)
		            .stream()
		            .map(event -> mapper.map(event, AdminEventResponseDTO.class))
		            .collect(Collectors.toList());
	}



	@Override
	public List<AdminArtistDTO> findAll() {
		List<Artist> artists = adminArtistDao.findAll();

	    return artists.stream()
	            .map(artist -> {
	                AdminArtistDTO dto = new AdminArtistDTO();
	                dto.setArtistId(artist.getArtistId());
	                dto.setName(artist.getName());
	                return dto;
	            })
	            .collect(Collectors.toList());
	}

	@Override
	public AdminEditEventDTO getEventForEdit(Long eventId) {
	Event event = adminEventDao.findById(eventId)
			.orElseThrow(()->new ApiException("Event not found with ID: " + eventId));

		AdminEditEventDTO dto = new AdminEditEventDTO();
		dto.setEventName(event.getEventName());
		dto.setDescription(event.getDescription());
		dto.setCity(event.getCity());
		dto.setAddress(event.getAddress());
		dto.setEventDate(event.getEventDate());
		dto.setCategory(event.getCategory());

		// Map host to AdminHostDto
		User host = event.getHost();
		AdminHostDto hostDto = new AdminHostDto();
		hostDto.setUserId(host.getUserId());
		hostDto.setFirstName(host.getFirstName());
		dto.setHost(hostDto);

		// Map artist to AdminArtistDTO
		Artist artist = event.getArtist();
		AdminArtistDTO artistDto = new AdminArtistDTO();
		artistDto.setArtistId(artist.getArtistId());	
		artistDto.setName(artist.getName());
		dto.setArtist(artistDto);

	return dto;
	}


	@Override
	public ResponseEntity<ApiResponse> updateEditedEvent(Long eventId, AdminEditEventDTO dto) {
	    Event event = adminEventDao.findById(eventId)
	    		.orElseThrow(()->new ApiException("Event not found with ID: " + eventId));

	    // Set simple fields
	    event.setEventName(dto.getEventName());
	    event.setDescription(dto.getDescription());
	    event.setCity(dto.getCity());
	    event.setAddress(dto.getAddress());
	    event.setCategory(dto.getCategory());
	    event.setEventDate(dto.getEventDate());
	    event.setUpdatedAt(LocalDateTime.now());
//
//	    // Set host
//	    if (dto.getHost() != null && dto.getHost().getUserId() != null) {
//	        User host = userRepository.findById(dto.getHost().getUserId())
//	            .orElseThrow(() -> new ResourceNotFoundException("Host not found with ID: " + dto.getHost().getUserId()));
//	        event.setHost(host);
//	    }

	    // Set artist
	    if (dto.getArtist() != null && dto.getArtist().getArtistId() != null) {
	        Artist artist = adminArtistDao.findById(dto.getArtist().getArtistId())
	        		.orElseThrow(()->new ApiException("Artist not found with ID: " + dto.getArtist().getArtistId()));
	        event.setArtist(artist);
	    }

	    adminEventDao.save(event);

	    return ResponseEntity.ok(new ApiResponse("Event updated successfully"));
	}
	
}
