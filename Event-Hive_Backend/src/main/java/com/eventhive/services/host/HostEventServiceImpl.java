package com.eventhive.services.host;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventhive.custom_exception.ApiException;
import com.eventhive.dao.host.ArtistDao;
import com.eventhive.dao.host.EventDao;
import com.eventhive.dao.host.HostDao;
import com.eventhive.dto.host.EventResponseDto;
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

}
