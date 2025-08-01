package com.eventhive.services.host;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.eventhive.custom_exception.ApiException;
import com.eventhive.custom_exception.EventNotFoundException;
import com.eventhive.dao.host.ArtistDao;
import com.eventhive.dao.host.EventDao;
import com.eventhive.dao.host.HostDao;
import com.eventhive.dto.host.ApiResponse;
import com.eventhive.dto.host.EventResponseDto;
import com.eventhive.dto.host.HostNewEventRequestDto;
import com.eventhive.dto.host.HostUpdateEventDto;
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
	private final EventDao eventDao;
	private final ModelMapper mapper;

	
	public ApiResponse enterEvent(HostNewEventRequestDto dto, MultipartFile photoFile, Long hostId) {

	    // 1. Find the Host
	    User host = hostDao.findById(hostId)
	            .orElseThrow(() -> new ApiException("Host doesn't exist"));

	    // 2. Find the Artist by Name
	    Artist artist = artistDao.findByName(dto.getArtistName())
	    	    .orElseGet(() -> {
	    	        Artist newArtist = new Artist();
	    	        newArtist.setName(dto.getArtistName());
	    	        newArtist.setCountry("India"); // default
	    	        newArtist.setBio("Performer in " + dto.getCategory()); // default based on category
	    	        newArtist.setGenre(dto.getCategory()); 
	    	        return artistDao.save(newArtist);
	    	    });

	    
	    // 3. Map DTO to Event Entity
	    Event event = mapper.map(dto, Event.class);

	    // 4. Set Host and Artist
	    event.setHost(host);
	    event.setArtist(artist);

	    // 5. Handle Image Upload
	    if (photoFile != null && !photoFile.isEmpty()) {
	        try {
	            // Generate unique filename
	            String fileName = UUID.randomUUID().toString() + "_" + photoFile.getOriginalFilename();
	           // Path uploadDir = Paths.get("/eventhive/uploads/event-photos");
	            
	            String uploadDirStr = System.getProperty("user.dir") + "/uploads/event-photos";
	            Path uploadDir = Paths.get(uploadDirStr);
	            Files.createDirectories(uploadDir);
	            Path filePath = uploadDir.resolve(fileName);

	            // Save file
	            photoFile.transferTo(filePath.toFile());

	            // Set relative path to photo field
	            event.setPhoto("event-photos/" + fileName);
	        } catch (IOException e) {
	            throw new ApiException("Failed to store event photo: " + e.getMessage());
	        }
	    }

	    // 6. Map Phases from DTO and link them to the event
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

	    // 7. Attach phases to event
	    event.setPhases(phases);

	    // 8. Persist event via host
	    host.addEvent(event);

	    return new ApiResponse("Event with phases, artist, and photo uploaded successfully");
	}



	// Top get all Events of a Particular Host
	@Override
	public List<EventResponseDto> fetchDetails(Long hostId) {
	    List<Event> eventList = eventDao.findByHostUserId(hostId);
	    
	    if (eventList.isEmpty()) {
	        throw new EventNotFoundException("No events found for host ID: " + hostId);
	    }
	    
	    return eventList.stream()
	            .map(d -> mapper.map(d, EventResponseDto.class))
	            .toList();
	}
	
	
	
	
	

}
