package com.eventhive.controllers.host;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventhive.dto.host.HostNewEventRequestDto;
import com.eventhive.services.host.HostService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/host")
@AllArgsConstructor


public class HostController {

	
	//Dependency Injection 
	//Field Based (2 Benefits)
	private final HostService hostService;
	
	

	@PostMapping("{hostId}")
	ResponseEntity<?> insertAppointment(@PathVariable Long hostId,@RequestBody 
			HostNewEventRequestDto dto){
		
		return ResponseEntity.ok(hostService.enterEvent(dto,hostId));
	}
	
	
}