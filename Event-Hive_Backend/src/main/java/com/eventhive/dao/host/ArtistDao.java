package com.eventhive.dao.host;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.Artist;

public interface ArtistDao extends JpaRepository<Artist, Long>{

	Optional<Artist> findByName(String name);

}