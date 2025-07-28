package com.eventhive.dao.authentication;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.User;

public interface AuthUserDao extends JpaRepository<User, Long> {

	boolean existsByEmail(String email);
	Optional<User> findByEmail(String email);
	
}

