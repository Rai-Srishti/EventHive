package com.eventhive.dao.attendee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.Event;
import com.eventhive.entities.enums.EventApprovalStatus;
import com.eventhive.entities.enums.EventLifeCycleStatus;

public interface AttendeeEventDao extends JpaRepository<Event, Long>{

	List<Event> findByStatusAndLifecycleStatus(EventApprovalStatus status, EventLifeCycleStatus lifecycleStatus);

}
