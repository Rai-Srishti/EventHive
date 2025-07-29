package com.eventhive.dao.admin;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.Artist;

public interface AdminArtistDao extends JpaRepository<Artist, Long>{
	
	List<Artist> findByArtistId(Long artistId);
}
