package com.eventhive.dao.admin;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.eventhive.entities.User;
import com.eventhive.entities.enums.Role;

public interface AdminUserDao extends JpaRepository<User, Long> {

	List<User> findByRole(Role host);
	
}
