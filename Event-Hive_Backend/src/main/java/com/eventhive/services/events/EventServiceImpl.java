package com.eventhive.services.events;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.eventhive.dao.events.EventDao;
import com.eventhive.dto.event.EventDto;
import com.eventhive.entities.Event;
import com.eventhive.entities.enums.ApprovalAction;
import com.eventhive.entities.enums.EventApprovalStatus;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor

public class EventServiceImpl implements EventService {

	private final EventDao eventDao;
	
	private final ModelMapper mapper;

	@Override
	public List<EventDto> getAllApprovedEvents() {
		List<Event> eventList = eventDao.findByStatus(EventApprovalStatus.APPROVED);
		
		 return eventList.stream().map(event -> {
		        EventDto dto = new EventDto();
		        dto.setEventId(event.getEventId());
		        dto.setEventName(event.getEventName());
		        dto.setDescription(event.getDescription());
		        dto.setCity(event.getCity());
		        dto.setAddress(event.getAddress());
		        dto.setCategory(event.getCategory());
		        dto.setPhoto(event.getPhoto());
		        dto.setEventDate(event.getEventDate());

		       
		        if (event.getArtist() != null) {
		            dto.setArtistName(event.getArtist().getName());
		        }
		        if (event.getHost() != null) {
		            dto.setHostName(event.getHost().getFirstName() + " " + event.getHost().getLastName());
		        }

		        return dto;
		    }).collect(Collectors.toList());
	}

}
