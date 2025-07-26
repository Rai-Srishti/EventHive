package com.eventhive.dao.events;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.Event;

public interface EventDao extends JpaRepository<Event, Long>{

}
