package com.eventhive.services.host;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventhive.custom_exception.ApiException;
import com.eventhive.dao.host.ArtistDao;
import com.eventhive.dao.host.HostDao;
import com.eventhive.dto.host.ApiResponse;
import com.eventhive.dto.host.HostNewEventRequestDto;
import com.eventhive.entities.Artist;
import com.eventhive.entities.Event;
import com.eventhive.entities.EventPhase;
import com.eventhive.entities.User;
import com.eventhive.entities.enums.TicketPhaseName;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class HostServiceImpl implements HostService {
	
	
	// Field Based Dependency 
	
	private final HostDao hostDao;
	private final ArtistDao artistDao;
	
	private final ModelMapper mapper;

	
	public ApiResponse enterEvent(HostNewEventRequestDto dto, Long hostId) {
		
		 // 1. Find the Host
	    User host = hostDao.findById(hostId)
	            .orElseThrow(() -> new ApiException("Host doesn't exist"));

	    // 2. Find the Artist by Name
	    Artist artist = artistDao.findByName(dto.getArtistName())
	            .orElseThrow(() -> new ApiException("Artist '" + dto.getArtistName() + "' doesn't exist"));

	    // 3. Map DTO to Event Entity
	    Event event = mapper.map(dto, Event.class);

	    // 4. Set Host and Artist
	    event.setHost(host);
	    event.setArtist(artist);

	    // 5. Map Phases from DTO and link them to the event
	    List<EventPhase> phases = dto.getPhases().stream().map(phaseDto -> {
	        EventPhase phase = new EventPhase();
	        phase.setPhaseName(TicketPhaseName.valueOf(phaseDto.getPhaseName().toUpperCase()));

	        phase.setPrice(phaseDto.getPrice());
	        phase.setAvailableTickets(phaseDto.getAvailableTickets());
	        phase.setStartTime(phaseDto.getStartTime());
	        phase.setEndTime(phaseDto.getEndTime());
	        phase.setTotalTickets(phaseDto.getAvailableTickets());
	        phase.setEvent(event); // back-reference
	        return phase;
	    }).collect(Collectors.toList());

	    // 6. Attach phases to event
	    event.setPhases(phases);

	    // 7. Using helper to persist 
	    host.addEvent(event);

	    return new ApiResponse("Event with phases and artist linked successfully");
	
				
	}
	
	
	

}
