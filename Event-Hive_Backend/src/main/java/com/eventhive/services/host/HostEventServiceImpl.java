package com.eventhive.services.host;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventhive.custom_exception.ApiException;
import com.eventhive.dao.host.ArtistDao;
import com.eventhive.dao.host.EventDao;
import com.eventhive.dao.host.HostDao;
import com.eventhive.dao.host.HostTicketDao;
import com.eventhive.dto.host.ApiResponse;
import com.eventhive.dto.host.EventResponseDto;
import com.eventhive.dto.host.HostUpdateEventDto;
import com.eventhive.entities.Event;
import com.eventhive.entities.EventPhase;
import com.eventhive.entities.Ticket;
import com.eventhive.entities.Wallet;
import com.eventhive.entities.enums.QrCodeStatusEnum;
import com.eventhive.entities.enums.TicketStatus;
import com.eventhive.services.EmailService;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class HostEventServiceImpl implements HostEventService {
	
	//Dependency 
	private final EventDao eventDao;
	private final ModelMapper mapper;
	private final HostTicketDao ticketDao;
	private final EmailService mailService;
	
	@Override
	public EventResponseDto getEventDetails(Long eventId) {
	
		
		
		//Getting Event from Database
		Event eventEntity=eventDao.findById(eventId).orElseThrow(
			()-> new ApiException("Event not found"));
		
		//Entity-> Dto

		EventResponseDto dto = mapper.map(eventEntity, EventResponseDto.class);

		// Manually set artistName if it's nested inside an object like `eventEntity.getArtist().getFirstName()`
		if (eventEntity.getArtist() != null) {
		    dto.setArtistName(eventEntity.getArtist().getName() );
		}

		return dto;
	}
	
	@Override
	public ApiResponse deleteEvent(Long eventId) {
	    // 1. Get the Event
	    Event event = eventDao.findById(eventId)
	        .orElseThrow(() -> new RuntimeException("Event not found"));

	    // 2. Get associated Tickets
	    List<Ticket> tickets = ticketDao.findByEvent(event);

	    for (Ticket ticket : tickets) {
	        if (ticket.getStatus() == TicketStatus.BOOKED) {
	            // 3. Refund to Attendee Wallet
	            Wallet wallet = ticket.getAttendee().getWallet();
	            BigDecimal refundAmount = ticket.getTotalPrice();
	            wallet.setBalance(wallet.getBalance().add(refundAmount));

	            // 4. Mark ticket as refunded
	            ticket.setStatus(TicketStatus.REFUNDED);
	            ticket.setRefundAmount(refundAmount);

	            // 5. Invalidate QR Codes
	            ticket.getQrCodes().forEach(qr -> qr.setStatus(QrCodeStatusEnum.EXPIRED));

	            // 6. Return seat to EventPhase
	            EventPhase phase = ticket.getPhase();
	            phase.setAvailableTickets(phase.getAvailableTickets() + ticket.getQuantity());

	            // 7. Notify Attendee
	            String subject = "Event Cancelled: " + event.getEventName();
	            String content = "Dear " + ticket.getAttendee().getFirstName() + ",\n\n"
	                    + "The event '" + event.getEventName() + "' has been cancelled.\n"
	                    + "Your ticket has been refunded with amount: ₹" + refundAmount + ".\n"
	                    + "Check your wallet balance.\n\nThank you.";

	            mailService.sendEmail(ticket.getAttendee().getEmail(), subject, content);
	        }
	    }

	    // 8. Delete Event (cascade deletes phases, tickets, etc.)
	    eventDao.delete(event);

	    return new ApiResponse("Event deleted and refunds processed.");
	
	}

	@Override
	public ApiResponse updateEvent(Long eventId,HostUpdateEventDto dto) {
		Event event = eventDao.findById(eventId)
		        .orElseThrow(() -> new ApiException("Event not found"));

		    // Update only allowed fields
		    event.setEventName(dto.getEventName());
		    event.setDescription(dto.getDescription());
		    event.setAddress(dto.getAddress());
		    event.getArtist().setName(dto.getArtistName());

		    event.setUpdatedAt(LocalDateTime.now());

		    eventDao.save(event);

		    return new ApiResponse("Event updated successfully");
	}

}
