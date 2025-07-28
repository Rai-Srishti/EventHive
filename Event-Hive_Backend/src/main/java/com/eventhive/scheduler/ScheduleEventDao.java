package com.eventhive.scheduler;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.Artist;
import com.eventhive.entities.Event;
import com.eventhive.entities.enums.EventLifeCycleStatus;

public interface ScheduleEventDao extends JpaRepository<Event, Long>{

	List<Event> findByEventDateBeforeAndLifecycleStatus(LocalDateTime now, EventLifeCycleStatus status);
	
}
