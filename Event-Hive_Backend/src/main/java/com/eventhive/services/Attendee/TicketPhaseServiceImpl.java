package com.eventhive.services.Attendee;

import java.math.BigDecimal;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.eventhive.custom_exception.InsufficientBalanceException;
import com.eventhive.custom_exception.TicketSoldOutException;
import com.eventhive.custom_exception.UserNotFounderException;
import com.eventhive.dao.attendee.AttendeeDao;
import com.eventhive.dao.attendee.AttendeeEventPhaseDao;
import com.eventhive.dao.attendee.TicketDao;
import com.eventhive.dto.attendee.TicketResponseDto;
import com.eventhive.dto.host.ApiResponse;
import com.eventhive.entities.EventPhase;
import com.eventhive.entities.Ticket;
import com.eventhive.entities.User;
import com.eventhive.entities.Wallet;
import com.eventhive.services.qr.QrCodeService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor

public class TicketPhaseServiceImpl implements TicketPhaseService{
	
	private final AttendeeDao attendeeDao;
	private final AttendeeEventPhaseDao eventPhaseDao;
	private final TicketDao ticketDao;
	private final QrCodeService qrService;
	//private final ModelMapper mapper;

	

	@Override
	public ApiResponse purchasedTicket(Long userId, Long phase_id, int quantity) {
		User user = attendeeDao.findById(userId)
	            .orElseThrow(() -> new UserNotFounderException("User not found"));

	    Wallet wallet = user.getWallet();
	    if (wallet == null) {
	        throw new RuntimeException("User wallet not found");
	    }

	    
	    // 2. Fetch phase
	    EventPhase phase = eventPhaseDao.findByIdWithLock(phase_id);
	           
	    
	 // 3. Check if enough tickets are available
	    if(phase.getAvailableTickets() < quantity) {
	    	throw new TicketSoldOutException("Sorry the tickets are sold out!!");
	    }
	    // 4. Calculate total price
	    BigDecimal totalPrice = phase.getPrice().multiply(BigDecimal.valueOf(quantity)) ;
	    
	 // 5. Check wallet balance
	    if(wallet.getBalance().compareTo(totalPrice)<0) {
	    	throw new InsufficientBalanceException("The Wallet Balance is Insufficient!!");
	    }
	    
	 // 6. Deduct wallet balance
	    wallet.setBalance(wallet.getBalance().subtract(totalPrice));

	    // 7. Update available tickets
	    phase.setAvailableTickets(phase.getAvailableTickets() - quantity);
	    
	    
	    Ticket ticket = new Ticket();
	    
	    ticket.setAttendee(user);
	    ticket.setPhase(phase);
	    ticket.setEvent(phase.getEvent());
	    ticket.setQuantity(quantity);
	    ticket.setTotalPrice(totalPrice);
	    
	    
	 // 9. Save ticket first
	    Ticket savedTicket = ticketDao.save(ticket);

	    // 10. Generate QR Code and associate
	    qrService.generateQrCode(savedTicket);

	    
	    return new ApiResponse("Ticket Booked!!");
		
	}

}
