package com.eventhive.dao.host;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.User;

public interface HostDao extends JpaRepository<User, Long>{

	
	
	
}
