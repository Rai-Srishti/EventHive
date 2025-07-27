package com.eventhive.controllers.attendee;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventhive.services.Attendee.AttendeeService;
import com.eventhive.dto.attendee.AttendeeEventPhaseDto;
import com.eventhive.dto.attendee.EventDto;
import com.eventhive.services.Attendee.AttendeeEventPhaseService;
import com.eventhive.services.Attendee.AttendeeEventService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/attendee")
public class AttendeeController {

	private final AttendeeService attendeeService;
	private final AttendeeEventService eventService;
	private final AttendeeEventPhaseService attendeeEventPhaseService;
	
	@GetMapping()
	public ResponseEntity<List<EventDto>> getAllEvents(){
		return ResponseEntity.ok(eventService.getAllApprovedEvents());
	}
	
	@GetMapping("event-details/{eventId}")
	public ResponseEntity<EventDto> getEventbyId(@PathVariable Long eventId){
		return ResponseEntity.ok(eventService.getEventById(eventId));
	}
	//this api is for getting all the tickets phase wise have to make chnages in the fronend as the path was not correct
	@GetMapping("/bookings/{eventId}")
	public ResponseEntity<List<AttendeeEventPhaseDto>> getEventPhases(@PathVariable Long eventId){
		return ResponseEntity.ok(attendeeEventPhaseService.getPhasesByEventId(eventId));
	} 
}
