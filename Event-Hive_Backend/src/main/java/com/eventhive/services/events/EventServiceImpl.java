package com.eventhive.services.events;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eventhive.dto.event.EventDto;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor

public class EventServiceImpl implements EventService {

	
	@Override
	public List<EventDto> getAllEvent() {
		// TODO Auto-generated method stub
		return null;
	}

}
