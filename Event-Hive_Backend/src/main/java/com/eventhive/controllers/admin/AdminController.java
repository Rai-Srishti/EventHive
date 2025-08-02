package com.eventhive.controllers.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventhive.dto.admin.AdminUserRequestDTO;
import com.eventhive.services.Admin.AdminEventService;
import com.eventhive.services.Admin.AdminService;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor

public class AdminController {
	
	private final AdminEventService adminEventService;
	private final AdminService adminService;
	
	@GetMapping("/events")
	public ResponseEntity<?> getPendingEventsEvent(){
		return ResponseEntity.ok(adminEventService.fetchpendingEvents());
	}
	
	@PutMapping("/events/{eventId}")
	public ResponseEntity<?> updateEventStatus(@PathVariable Long eventId){
		return adminEventService.updateEvent(eventId);
	}
	
	
	
	@GetMapping("/hosts")
	public ResponseEntity<?> getAllHosts(){
		return ResponseEntity.ok(adminService.fetchAllHosts());
	}
	
	@PutMapping("/hosts/block/{hostId}")
	public ResponseEntity<?> updateHostStatus(@PathVariable Long hostId){
		return ResponseEntity.ok(adminService.updateHost(hostId));
		
	}
	
	@PutMapping("/hosts/unblock/{hostId}")
	public ResponseEntity<?> unblockHost(@PathVariable Long hostId){
		return ResponseEntity.ok(adminService.unblockHost(hostId));
		
	}
	
	@GetMapping("/attendee")
	public ResponseEntity<?> getAllAttendee(){
		return ResponseEntity.ok(adminService.fetchAllAttendee());
	}
	
	@PutMapping("/attendee/block/{attId}")
	public ResponseEntity<?> updateAttendeeStatus(@PathVariable Long attId){
		return ResponseEntity.ok(adminService.updateAttendee(attId));
		
	}
	
	@PutMapping("/attendee/unblock/{attId}")
	public ResponseEntity<?> unblockAttendee(@PathVariable Long attId){
		return ResponseEntity.ok(adminService.unblockAttendee(attId));
		
	}
	
	@GetMapping("/profile/{adminId}")
	public ResponseEntity<?> showProfile(@PathVariable Long adminId){
		return ResponseEntity.ok(adminService.fetchProfile(adminId));
		
	}
	
	@PutMapping("/profile/{adminId}/update")
	public ResponseEntity<?> editProfile(@PathVariable Long adminId, @RequestBody AdminUserRequestDTO dto){
		return ResponseEntity.ok(adminService.updateProfile(adminId,dto));
		
	}
}
