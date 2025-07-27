package com.eventhive.controllers.attendee;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventhive.services.Attendee.AttendeeService;
import com.eventhive.dto.attendee.EventDto;
import com.eventhive.services.Attendee.AttendeeEventService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/attendee")
public class AttendeeController {

	private final AttendeeService attendeeService;
	private final AttendeeEventService eventService;
	
	@GetMapping()
	public ResponseEntity<List<EventDto>> getAllEvents(){
		return ResponseEntity.ok(eventService.getAllApprovedEvents());
	}
}
