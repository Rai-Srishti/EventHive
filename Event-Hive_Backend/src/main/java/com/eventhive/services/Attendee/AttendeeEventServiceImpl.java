package com.eventhive.services.Attendee;

import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.eventhive.custom_exception.ApiException;
import com.eventhive.custom_exception.EventNotFoundException;
import com.eventhive.dao.attendee.AttendeeEventDao;
import com.eventhive.dto.attendee.EventDto;
import com.eventhive.entities.Event;
import com.eventhive.entities.enums.ApprovalAction;
import com.eventhive.entities.enums.EventApprovalStatus;
import com.eventhive.entities.enums.EventLifeCycleStatus;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor

public class AttendeeEventServiceImpl implements AttendeeEventService {

	private final AttendeeEventDao eventDao;
	
	private final ModelMapper mapper;

	@Override
	public List<EventDto> getAllApprovedEvents() {
		List<Event> eventList = eventDao.findByStatusAndLifecycleStatus(EventApprovalStatus.APPROVED, EventLifeCycleStatus.UPCOMING);

		
		 return eventList.stream().map(event -> {
		        EventDto dto = new EventDto();
		        dto.setEventId(event.getEventId());
		        dto.setEventName(event.getEventName());
		        dto.setDescription(event.getDescription());
		        dto.setCity(event.getCity());
		        dto.setAddress(event.getAddress());
		        dto.setCategory(event.getCategory());
		        dto.setPhoto("http://localhost:8080/uploads/event-photos/" + event.getPhoto());
		     
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

	@Override
	public EventDto getEventById(Long eventId) {
		Event event = eventDao.findById(eventId)
				.orElseThrow(()-> new EventNotFoundException("Event not found with id :" + eventId));
		//here im checking if the fetched event is approved or not?
		if(!event.getStatus().equals(EventApprovalStatus.APPROVED)) {
			throw new ApiException("The Event is not approved yet");
		}
		
		//manual mapping for the event
		EventDto dto = new EventDto();
	    dto.setEventId(event.getEventId());
	    dto.setEventName(event.getEventName());
	    dto.setDescription(event.getDescription());
	    dto.setCity(event.getCity());
	    dto.setAddress(event.getAddress());
	    dto.setCategory(event.getCategory());
	    dto.setPhoto("http://localhost:8080/uploads/event-photos/" + event.getPhoto());
	    dto.setEventDate(event.getEventDate());
	    dto.setArtistName(event.getArtist().getName());
	    dto.setHostName(event.getHost().getFirstName() + " " + event.getHost().getLastName());

	    return dto;
	}
		
}
