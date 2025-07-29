package com.eventhive.dao.admin;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eventhive.entities.Ticket;


public interface AdminTicketDao extends JpaRepository<Ticket, Long>{
	
	@Query("SELECT COUNT(t) FROM Ticket t WHERE t.attendee.userId = :attId AND t.status = 'CANCELLED'")
	int countCancelledTicketByAttendee(@Param("attId") Long attId);
	
}
