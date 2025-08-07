package com.eventhive.dao.attendee;


import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.Ticket;

public interface TicketDao extends JpaRepository<Ticket, Long> {

}
