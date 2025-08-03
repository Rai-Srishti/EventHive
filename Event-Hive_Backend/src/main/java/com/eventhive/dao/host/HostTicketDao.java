package com.eventhive.dao.host;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.Event;
import com.eventhive.entities.Ticket;

public interface HostTicketDao extends JpaRepository<Ticket, Long>{

	List<Ticket> findByEvent(Event event);

}
