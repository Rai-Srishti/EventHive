package com.eventhive.dao.admin;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eventhive.entities.Event;
import com.eventhive.entities.enums.EventApprovalStatus;

public interface AdminEventDao extends JpaRepository<Event, Long>{
	List<Event> findByStatus(EventApprovalStatus status);
	
	 @Query("SELECT COUNT(e) FROM Event e WHERE e.host.id = :hostId AND e.status = 'CANCELLED'")
	 int countCancelledEventsByHost(@Param("hostId") Long hostId);

	long countByStatus(EventApprovalStatus approved);
	 
	 
}
  