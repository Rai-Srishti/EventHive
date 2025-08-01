package com.eventhive.services.host;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.eventhive.dao.host.ArtistDao;
import com.eventhive.dto.host.ArtistDto;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class HostArtistImpl implements HostArtist {

	
	//Dependency 
	@Autowired
		private final ArtistDao artistDao;
	
	@Override
	public List<ArtistDto> getAllArtistNames() {
	    return artistDao.findAll()
	            .stream()
	            .map(artist -> new ArtistDto(artist.getName()))
	            .collect(Collectors.toList());
	}

	

}
