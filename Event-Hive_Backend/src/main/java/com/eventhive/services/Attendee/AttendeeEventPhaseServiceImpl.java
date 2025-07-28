package com.eventhive.services.Attendee;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.eventhive.dao.attendee.AttendeeEventPhaseDao;
import com.eventhive.dto.attendee.AttendeeEventPhaseDto;
import com.eventhive.entities.EventPhase;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
@Transactional

public class AttendeeEventPhaseServiceImpl implements AttendeeEventPhaseService {

	private final AttendeeEventPhaseDao phaseDao;
	private ModelMapper mapper ;
	@Override
	public List<AttendeeEventPhaseDto> getPhasesByEventId(Long eventId) {
		List<EventPhase> eventPhase = phaseDao.findByEvent_EventId(eventId);
		
		return eventPhase.stream()
		.map(phase -> mapper.map(phase, AttendeeEventPhaseDto.class))
		.collect(Collectors.toList());
		 
	}

}
