package com.eventhive.dao.attendee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.eventhive.entities.Ticket;

public interface AttendeeBookingDao extends JpaRepository<Ticket, Long>{

	 @Query("SELECT t FROM Ticket t WHERE t.attendee.userId = :attendeeId AND t.event.lifecycleStatus = 'UPCOMING'")
	    List<Ticket> findUpcomingBookingsByAttendeeId(Long attendeeId);
}
