package com.eventhive.controllers.attendee;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eventhive.services.Attendee.AttendeeService;
import com.eventhive.services.Attendee.AttendeeWalletService;
import com.eventhive.services.Attendee.TicketPhaseService;
import com.eventhive.services.authentication.JWTService;
import com.eventhive.dto.attendee.ArtistDto;
import com.eventhive.dto.attendee.AttendeeDto;
import com.eventhive.dto.attendee.AttendeeEventPhaseDto;
import com.eventhive.dto.attendee.EventDto;

import com.eventhive.dto.attendee.MyBookingDto;
import com.eventhive.services.Attendee.AttendeeBookingService;
import com.eventhive.services.Attendee.ArtistService;

import com.eventhive.services.Attendee.AttendeeEventPhaseService;
import com.eventhive.services.Attendee.AttendeeEventService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/attendee")
public class AttendeeController {

	private final AttendeeService attendeeService;
	private final AttendeeEventService eventService;
	private final ArtistService artistService;
	private final AttendeeEventPhaseService attendeeEventPhaseService;
	private final AttendeeBookingService bookingService;
	private final TicketPhaseService ticketPhaseService;
	private final JWTService jwtService;
	private final AttendeeWalletService walletService;

	@GetMapping()
	public ResponseEntity<List<EventDto>> getAllEvents() {
		return ResponseEntity.ok(eventService.getAllApprovedEvents());
	}

	@GetMapping("event-details/{eventId}")
	public ResponseEntity<EventDto> getEventbyId(@PathVariable Long eventId) {
		return ResponseEntity.ok(eventService.getEventById(eventId));
	}

	// this api is for getting all the tickets phase wise have to make chnages in
	// the fronend as the path was not correct
	@GetMapping("/bookings/{eventId}")
	public ResponseEntity<List<AttendeeEventPhaseDto>> getEventPhases(@PathVariable Long eventId) {
		return ResponseEntity.ok(attendeeEventPhaseService.getPhasesByEventId(eventId));
	}

	@GetMapping("/my-bookings")
	public ResponseEntity<List<MyBookingDto>> getMyUpcomingBookings() {
		Long attendeeId = jwtService.extractUserIdFromContext();
		System.out.println(attendeeId);
		List<MyBookingDto> bookings = bookingService.getBookingsByAttendeeId(attendeeId);
		return ResponseEntity.ok(bookings);
	}

	@GetMapping("/artists")
	public ResponseEntity<List<ArtistDto>> getAllArtists() {
		return ResponseEntity.ok(artistService.getAllArtists());
	}

	@PostMapping("/purchase-ticket")
	public ResponseEntity<?> purchaseTicket(@RequestParam Long phaseId, @RequestParam int quantity) {
		Long userId = jwtService.extractUserIdFromContext();

		return ResponseEntity.ok(ticketPhaseService.purchasedTicket(userId, phaseId, quantity));
	}

	@DeleteMapping("/cancel-ticket/{ticketId}")
	public ResponseEntity<?> deleteBooking(@PathVariable Long ticketId) {
		return ResponseEntity.ok(ticketPhaseService.cancelTicket(ticketId));
	}
	
	
	@GetMapping("/wallet")
	public ResponseEntity<?> getWallet(){
		Long attendeeId = jwtService.extractUserIdFromContext();
		return ResponseEntity.ok(walletService.getBalance(attendeeId));
	}
	
	@GetMapping("/details")
	public ResponseEntity<?> getAttendeeDetails(){
		Long attendeeId = jwtService.extractUserIdFromContext();
		return ResponseEntity.ok(attendeeService.getAttendeeById(attendeeId));
	}
	
	@PutMapping("/update-profile")
	public ResponseEntity<?> updateProfile(@RequestBody AttendeeDto dto) {
	    Long userId = jwtService.extractUserIdFromContext();
	    attendeeService.updateAttendeeProfile(userId, dto);
	    return ResponseEntity.ok("Profile updated successfully");
	}
}
