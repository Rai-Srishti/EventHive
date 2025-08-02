package com.eventhive.services.host;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.eventhive.dao.attendee.TicketDao;
import com.eventhive.dao.qrCode.QrCodeDao;
import com.eventhive.dto.host.QrValidationRequestDto;
import com.eventhive.dto.host.QrValidationResponseDto;
import com.eventhive.entities.QrCode;
import com.eventhive.entities.Ticket;
import com.eventhive.entities.enums.QrCodeStatusEnum;
import com.eventhive.entities.enums.TicketStatus;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class TicketValidationServiceImpl implements TicketValidationService{

	private final QrCodeDao qrCodeDao;
	private final TicketDao ticketDao;
	
	@Override
	public QrValidationResponseDto validate(QrValidationRequestDto request) {
	    Long ticketId = Long.parseLong(request.getId());

	    // Step 1: Find ticket by ID
	    Optional<Ticket> ticketOpt = ticketDao.findById(ticketId);

	    if (ticketOpt.isEmpty()) {
	        return new QrValidationResponseDto("NOT_FOUND", "Ticket not found.");
	    }

	    Ticket ticket = ticketOpt.get();

	    // Step 2: Optional - verify if the ticket has an associated QR code
	    if (ticket.getQrCodes() == null) {
	        return new QrValidationResponseDto("NO_QR", "This ticket does not have a QR code assigned.");
	    }
	    if (ticket.getQrCodes() != null) {
	    	
	    }
	    

	    // Step 3: Check ticket status
	    TicketStatus status = ticket.getStatus();

	    if (status == TicketStatus.REFUNDED) {
	        return new QrValidationResponseDto("REFUNDED", "This ticket was refunded and cannot be used.");
	    }

	    if (status == TicketStatus.VALIDATED) {
	        return new QrValidationResponseDto("ALREADY_VALIDATED", "Ticket already validated.");
	    }

	    if (status == TicketStatus.BOOKED) {
	        ticket.setStatus(TicketStatus.VALIDATED);
	        ticketDao.save(ticket);
	        
//	        List<QrCode> qrCodes = qrCodeDao.findByTicketId(ticketId); 
//	        for (QrCode qr : qrCodes) {
//	            qr.setStatus(QrCodeStatusEnum.EXPIRED); 
//	            qrCodeDao.save(qr);
//	        }
	        
	        return new QrValidationResponseDto("VALIDATED", "Ticket is valid and has been marked as validated.");
	    }

	    return new QrValidationResponseDto("UNKNOWN", "Unknown ticket status.");
	}
}
