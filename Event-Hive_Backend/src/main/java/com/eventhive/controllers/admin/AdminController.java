package com.eventhive.controllers.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventhive.services.Admin.AdminEventService;
import com.eventhive.services.Admin.AdminService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor

public class AdminController {
	
	private final AdminEventService adminEventService;
	
	@GetMapping("{events}")
	ResponseEntity<?> getPendingEventsEvent(){
		return ResponseEntity.ok(adminEventService.fetchpendingEvents());
	}
	
//	@PutMapping("{eventId}")
//	Api
}
