package com.eventhive.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.eventhive.dao.admin.UserDao;
import com.eventhive.entities.User;


@Service
public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	private UserDao repo;
	
	//abstract class method 
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		User user = repo.findByEmail(email); 
		
		if(user == null) {
			System.out.println("user not found!!");
			throw new UsernameNotFoundException("user not found!!");
		}
		return new UserPrincipal(user);     //we cannot return UserDetailService So, we have written a class for it
	}
	
	
	// loadUserById has to be implemented
	public UserDetails loadUserById(Long id) throws UsernameNotFoundException {
	    User user = repo.findById(id)
	                    .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
	    return new UserPrincipal(user);
	}
}

