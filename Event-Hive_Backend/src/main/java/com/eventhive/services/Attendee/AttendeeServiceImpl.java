package com.eventhive.services.Attendee;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.eventhive.dao.attendee.AttendeeDao;
import com.eventhive.dao.host.ArtistDao;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AttendeeServiceImpl implements AttendeeService {

	private final ArtistDao artistDao;
	private final AttendeeDao attendeeDao;
	
	private final ModelMapper mapper;
}
