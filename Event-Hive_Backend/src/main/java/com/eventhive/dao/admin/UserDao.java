package com.eventhive.dao.admin;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.eventhive.entities.User;
import com.eventhive.entities.enums.Role;

@Repository
public interface UserDao extends JpaRepository<User, Long> {

	List<User> findByRole(Role host);
	User findByEmail(String email);
	long countByRole(Role host);
}
