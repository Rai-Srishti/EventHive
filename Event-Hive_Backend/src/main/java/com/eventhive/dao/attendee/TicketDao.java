package com.eventhive.dao.attendee;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.EventPhase;
import com.eventhive.entities.Ticket;

public interface TicketDao extends JpaRepository<Ticket, Long> {
	//Optional<EventPhase> findEventPhaseById(Long id);

}
