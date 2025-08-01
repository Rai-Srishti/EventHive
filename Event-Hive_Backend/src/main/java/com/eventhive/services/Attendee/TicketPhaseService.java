package com.eventhive.services.Attendee;

import com.eventhive.dto.attendee.TicketResponseDto;
import com.eventhive.dto.host.ApiResponse;
import com.eventhive.entities.Ticket;

public interface TicketPhaseService {

	ApiResponse purchasedTicket(Long userId , Long phase_id ,int quantity);

	ApiResponse cancelTicket(Long ticketId);
}
