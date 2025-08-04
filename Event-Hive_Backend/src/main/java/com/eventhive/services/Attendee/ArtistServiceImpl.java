package com.eventhive.services.Attendee;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.eventhive.dao.host.ArtistDao;
import com.eventhive.dto.attendee.ArtistDto;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
@Transactional
public class ArtistServiceImpl implements ArtistService{
	private final ArtistDao artistDao;
	private ModelMapper mapper;
	
	@Override
	public List<ArtistDto> getAllArtists(){
	    return artistDao.findAll()
	        .stream()
	        .map(artist -> {
	            ArtistDto dto = mapper.map(artist, ArtistDto.class);

	            // Make sure photo URL is absolute
	            if (artist.getPhoto() != null && !artist.getPhoto().startsWith("http")) {
	                dto.setPhoto("http://localhost:8080/uploads/artists/" + artist.getPhoto());
	            }

	            return dto;
	        })
	        .collect(Collectors.toList());
	}


	
}
