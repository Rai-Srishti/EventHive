package com.eventhive.controllers.public_routes;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.eventhive.dto.attendee.ArtistDto;
import com.eventhive.dto.attendee.EventDto;
import com.eventhive.services.Attendee.ArtistService;
import com.eventhive.services.Attendee.AttendeeEventService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
public class PublicController {
	
	private final AttendeeEventService eventService;
	private final ArtistService artistService;
	
	@GetMapping("/events")
	public ResponseEntity<List<EventDto>> getAllEvents() {
		return ResponseEntity.ok(eventService.getAllApprovedEvents());
	}
	
	@GetMapping("/event-details/{eventId}")
	public ResponseEntity<EventDto> getEventbyId(@PathVariable Long eventId) {
		return ResponseEntity.ok(eventService.getEventById(eventId));
	}
	
	@GetMapping("/artists")
	public ResponseEntity<List<ArtistDto>> getAllArtists() {
		return ResponseEntity.ok(artistService.getAllArtists());
	}
}
