package com.eventhive.dao.attendee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.EventPhase;

public interface AttendeeEventPhaseDao extends JpaRepository<EventPhase, Long>{

	//List<EventPhase> findByEventEventID(Long Id);

	List<EventPhase> findByEvent_EventId(Long eventId);
}
