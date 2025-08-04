package com.eventhive.services.Attendee;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.eventhive.custom_exception.UserNotFoundException;
import com.eventhive.dao.attendee.AttendeeDao;
import com.eventhive.dao.host.ArtistDao;
import com.eventhive.dto.attendee.AttendeeDto;
import com.eventhive.entities.User;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class AttendeeServiceImpl implements AttendeeService {

	private final ArtistDao artistDao;
	private final AttendeeDao attendeeDao;
	
	private final ModelMapper mapper;

	@Override
	public AttendeeDto getAttendeeById(Long id) {
	    User user = attendeeDao.findById(id)
	        .orElseThrow(() -> new UserNotFoundException("Attendee Not Found"));

	    return mapper.map(user, AttendeeDto.class);
	}
	
	@Override
	public void updateAttendeeProfile(Long id, AttendeeDto dto) {
	    User user = attendeeDao.findById(id)
	        .orElseThrow(() -> new UserNotFoundException("Attendee Not Found"));

	    user.setFirstName(dto.getFirstName());
	    user.setLastName(dto.getLastName());
	    user.setEmail(dto.getEmail());
	    user.setPhoneNumber(dto.getPhoneNumber());
	    user.setCity(dto.getCity());
	    user.setState(dto.getState());
	    user.setCountry(dto.getCountry());

	    attendeeDao.save(user);
	}



}
