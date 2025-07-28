package com.eventhive.services.host;

import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventhive.custom_exception.ApiException;
import com.eventhive.dao.host.ArtistDao;
import com.eventhive.dao.host.EventDao;
import com.eventhive.dao.host.HostDao;
import com.eventhive.dto.host.ApiResponse;
import com.eventhive.dto.host.EventResponseDto;
import com.eventhive.dto.host.HostUpdateEventDto;
import com.eventhive.entities.Event;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class HostEventServiceImpl implements HostEventService {
	
	//Dependency 
	private final EventDao eventDao;
	private final ModelMapper mapper;
	
	@Override
	public EventResponseDto getEventDetails(Long eventId) {
	
		
		
		//Getting Event from Database
		Event eventEntity=eventDao.findById(eventId).orElseThrow(
			()-> new ApiException("Event not found"));
		
		//Entity-> Dto

		EventResponseDto dto = mapper.map(eventEntity, EventResponseDto.class);

		// Manually set artistName if it's nested inside an object like `eventEntity.getArtist().getFirstName()`
		if (eventEntity.getArtist() != null) {
		    dto.setArtistName(eventEntity.getArtist().getName() );
		}

		return dto;
	}
	
	@Override
	public ApiResponse deleteEvent(Long eventId) {

	    if (!eventDao.existsById(eventId)) {
	        throw new ApiException("Event doesn't exist");
	    }

	    eventDao.deleteById(eventId);

	    return new ApiResponse("Event with EventId: " + eventId + " deleted successfully");
	}

	@Override
	public ApiResponse updateEvent(Long eventId,HostUpdateEventDto dto) {
		Event event = eventDao.findById(eventId)
		        .orElseThrow(() -> new ApiException("Event not found"));

		    // Update only allowed fields
		    event.setEventName(dto.getEventName());
		    event.setDescription(dto.getDescription());
		    event.setAddress(dto.getAddress());
		    event.getArtist().setName(dto.getArtistName());

		    event.setUpdatedAt(LocalDateTime.now());

		    eventDao.save(event);

		    return new ApiResponse("Event updated successfully");
	}

}
