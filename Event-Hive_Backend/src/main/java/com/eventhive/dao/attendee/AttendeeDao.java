package com.eventhive.dao.attendee;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.User;

public interface AttendeeDao extends JpaRepository<User, Long>{

}
