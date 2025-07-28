package com.eventhive.dao.attendee;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.Event;
import com.eventhive.entities.User;
import com.eventhive.entities.enums.ApprovalAction;

public interface AttendeeDao extends JpaRepository<User, Long>{

	
}
