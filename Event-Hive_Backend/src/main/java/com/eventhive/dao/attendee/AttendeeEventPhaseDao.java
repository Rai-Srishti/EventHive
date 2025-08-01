package com.eventhive.dao.attendee;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.eventhive.entities.EventPhase;

import jakarta.persistence.LockModeType;

public interface AttendeeEventPhaseDao extends JpaRepository<EventPhase, Long>{

	//List<EventPhase> findByEventEventID(Long Id);

	List<EventPhase> findByEvent_EventId(Long eventId);
	
	
	@Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT ep FROM EventPhase ep WHERE ep.phaseId = :id")
    EventPhase findByIdWithLock(@Param("id") Long id);
}
