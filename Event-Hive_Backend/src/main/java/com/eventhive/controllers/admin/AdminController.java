package com.eventhive.controllers.admin;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.eventhive.dto.admin.AdminDashboardDTO;
import com.eventhive.dto.admin.AdminEditEventDTO;
import com.eventhive.dto.admin.AdminUserRequestDTO;
import com.eventhive.services.Admin.AdminEventService;
import com.eventhive.services.Admin.AdminService;
import com.eventhive.services.authentication.JWTService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/admin")
@AllArgsConstructor

public class AdminController {
	
	private final AdminEventService adminEventService;
	private final AdminService adminService;
	private final JWTService jwtService;
	
	//--------------------Events----------------------------
	@GetMapping("/events")
	public ResponseEntity<?> getPendingEventsEvent(){
		return ResponseEntity.ok(adminEventService.fetchpendingEvents());
	}
	
	@PutMapping("/events/{eventId}")
	public ResponseEntity<?> updateEventStatus(@PathVariable Long eventId){
		return adminEventService.updateEvent(eventId);
	}
	
	//--------------------Hosts----------------------------
	@GetMapping("/hosts")
	public ResponseEntity<?> getAllHosts(){
		return ResponseEntity.ok(adminService.fetchAllHosts());
	}
	
	@PutMapping("/hosts/validate/{hostId}")
	public ResponseEntity<?> validateHost(@PathVariable Long hostId){
		return ResponseEntity.ok(adminService.validateHost(hostId));
		
	}
	
	@PutMapping("/hosts/block/{hostId}")
	public ResponseEntity<?> updateHostStatus(@PathVariable Long hostId){
		return ResponseEntity.ok(adminService.updateHost(hostId));
		
	}
	
	@PutMapping("/hosts/unblock/{hostId}")
	public ResponseEntity<?> unblockHost(@PathVariable Long hostId){
		return ResponseEntity.ok(adminService.unblockHost(hostId));
		
	}
	
	//--------------------users----------------------------
	
	@GetMapping("/attendee")
	public ResponseEntity<?> getAllAttendee(){
		return ResponseEntity.ok(adminService.fetchAllAttendee());
	}
	
	@GetMapping("/attendee/validate/{attId}")
	public ResponseEntity<?> validateAttendee(@PathVariable Long attId){
		return ResponseEntity.ok(adminService.validateAttendee(attId));
		
	}
	
	@PutMapping("/attendee/block/{attId}")
	public ResponseEntity<?> updateAttendeeStatus(@PathVariable Long attId){
		return ResponseEntity.ok(adminService.updateAttendee(attId));
		
	}
	
	@PutMapping("/attendee/unblock/{attId}")
	public ResponseEntity<?> unblockAttendee(@PathVariable Long attId){
		return ResponseEntity.ok(adminService.unblockAttendee(attId));
		
	}

	
	//--------------------Admin Profile----------------------------
	
	@GetMapping("/profile")
	public ResponseEntity<?> showProfile(){
		Long adminId = jwtService.extractUserIdFromContext();
		return ResponseEntity.ok(adminService.fetchProfile(adminId));
		
	}
	
	@PutMapping("/profile/update")
	public ResponseEntity<?> editProfile(@RequestBody AdminUserRequestDTO dto){
		Long adminId = jwtService.extractUserIdFromContext();
		return ResponseEntity.ok(adminService.updateProfile(adminId,dto));
		
	}
	
	@GetMapping("/artists")
	public ResponseEntity<?> getAllArtists() {
	    return ResponseEntity.ok(adminEventService.findAll());
	}
	
	//------------------------------Event Management----------------
	
	@GetMapping("/events/approved")
	public ResponseEntity<?> getApprovedEvents() {
	    return ResponseEntity.ok(adminEventService.fetchApprovedEvents());
	}
	
	@GetMapping("events/edit/{eventId}")
    public ResponseEntity<AdminEditEventDTO> getEventForEdit(@PathVariable Long eventId) {
        return ResponseEntity.ok(adminEventService.getEventForEdit(eventId));
    }
	
	@PutMapping("events/edit/{eventId}")
    public ResponseEntity<?> updateEditedEvent(@PathVariable Long eventId,
                                               @RequestBody AdminEditEventDTO dto) {
        
        return adminEventService.updateEditedEvent(eventId, dto);
    }
	
	
	//--------------------Dashboard----------------------------
	
	@GetMapping("")
	public ResponseEntity<AdminDashboardDTO> getDashboardStats(){
		return ResponseEntity.ok(adminService.getDashboardStats());
	}
	
}
