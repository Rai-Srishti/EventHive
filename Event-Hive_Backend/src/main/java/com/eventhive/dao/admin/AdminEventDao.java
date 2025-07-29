package com.eventhive.dao.admin;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.Event;
import com.eventhive.entities.enums.EventApprovalStatus;

public interface AdminEventDao extends JpaRepository<Event, Long>{
	List<Event> findByStatus(EventApprovalStatus status);
}
