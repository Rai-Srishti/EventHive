package com.eventhive.dto.admin;


import com.eventhive.entities.enums.UserStatus;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUserResponseDTO {
	private Long userId;
	private String firstName;
	private String lastName;
	private String email;
	private String phoneNumber;
	private String city;
	private String state;
	private String country;
	private UserStatus status;
	
}
