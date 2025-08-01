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
import com.eventhive.entities.enums.QrCodeStatusEnum;
import com.eventhive.entities.enums.TicketStatus;
import com.eventhive.services.EmailService;
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
	private final EmailService mailService;
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
	    
	    byte[] qrImage = qrService.generateQrCodeAsBytes(savedTicket);

        // Compose Email
        String subject = "🎟 Ticket Confirmation - " + phase.getEvent().getEventName();
        String messageBody = "<p>Hi <strong>" + user.getFirstName() + "</strong>,</p>" +
                "<p>Your ticket for the event <strong>" + phase.getEvent().getEventName() + "</strong> has been successfully booked.</p>" +
                "<p><strong>Quantity:</strong> " + quantity + "<br>" +
                "<strong>Total Paid:</strong> ₹" + totalPrice + "</p>" +
                "<p>Your QR code is attached with this email.</p>" +
                "<br><p>Thanks,<br><em>EventHive Team</em></p>";

        mailService.sendTicketConfirmationEmail(user.getEmail(), subject, messageBody, qrImage);
	    
	    return new ApiResponse("Ticket Booked!!");
		
	}



	@Override
	public ApiResponse cancelTicket(Long ticketId) {
		
		//1. getting the ticket
		Ticket ticket = ticketDao.findById(ticketId)
				.orElseThrow(()-> new RuntimeException("Not a Valid ticket"));
		
		//2.checking for the status
		if(ticket.getStatus() != TicketStatus.BOOKED) {
			throw new RuntimeException("Only booked tickets can be cancelled");
		}
		
		//3.calculating the refund amount
		
		BigDecimal refundAmount = ticket.getTotalPrice();
		
		//4.getting the users wallet to process the refund
		
		Wallet wallet = ticket.getAttendee().getWallet();
		
		//5. adding the refund amount
		
		wallet.setBalance(wallet.getBalance().add(refundAmount));
		ticket.setRefundAmount(refundAmount);
		ticket.setStatus(TicketStatus.REFUNDED);
		
		ticket.getQrCodes().forEach(qr-> qr.setStatus(QrCodeStatusEnum.EXPIRED));
		
		//6. increasing the seat count for that phase 
		EventPhase phase = ticket.getPhase();
        phase.setAvailableTickets(phase.getAvailableTickets() + ticket.getQuantity());
        
        //7.notifying the host about the deleted event
        User host = ticket.getEvent().getHost();
        
        String subject = "Ticket Cancelled for Event: " + ticket.getEvent().getEventName();
        String content = "A ticket for your event '" + ticket.getEvent().getEventName() + "' has been cancelled.\n"
                       + "Attendee: " + ticket.getAttendee().getFirstName() + " " + ticket.getAttendee().getLastName() + "\n"
                       + "Quantity: " + ticket.getQuantity();

        mailService.sendEmail(host.getEmail(), subject, content);
		return new ApiResponse("ticket cancelled successfully and refund added to your wallet");
	}

}
