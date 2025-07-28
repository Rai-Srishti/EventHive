package com.eventhive.controllers.host;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventhive.dto.host.HostNewEventRequestDto;
import com.eventhive.dto.host.HostUpdateEventDto;
import com.eventhive.services.host.HostEventService;
import com.eventhive.services.host.HostService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/host")
@AllArgsConstructor


public class HostController {

	
	//Dependency Injection 
	//Field Based (2 Benefits)
	private final HostService hostService;
	private final HostEventService eventService;
	
	

	@PostMapping("{hostId}")
	ResponseEntity<?> insertAppointment(@PathVariable Long hostId,@RequestBody 
			HostNewEventRequestDto dto){
		
		return ResponseEntity.ok(hostService.enterEvent(dto,hostId));
	}
	
	@GetMapping("{hostId}")
	ResponseEntity<?> getEventById(@PathVariable Long hostId){
		
		
		return ResponseEntity.ok(hostService.fetchDetails(hostId));
	}
	
	@GetMapping("/event/{eventId}")
	public ResponseEntity<?> getEventDetailsByEventId(@PathVariable Long eventId) {
	    return ResponseEntity.ok(eventService.getEventDetails(eventId));
	}
	
	@DeleteMapping("/event/{eventId}")
	public ResponseEntity<?> deleteEvent(@PathVariable Long eventId) {
	    return ResponseEntity.ok(eventService.deleteEvent(eventId));
	}
	
	@PutMapping("/event/{eventId}")
	public ResponseEntity<?> updateEvent(@PathVariable Long eventId,@RequestBody 
			HostUpdateEventDto dto) {
	    return ResponseEntity.ok(eventService.updateEvent(eventId,dto));
	}
	
	
	
}