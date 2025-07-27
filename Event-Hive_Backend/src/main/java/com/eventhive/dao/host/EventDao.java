package com.eventhive.dao.host;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.Event;

public interface EventDao extends JpaRepository<Event, Long> {

	List<Event> findByHostUserId(Long userId);
	
}
