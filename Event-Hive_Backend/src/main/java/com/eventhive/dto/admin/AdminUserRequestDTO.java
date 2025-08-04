package com.eventhive.dto.admin;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminUserRequestDTO {
	private String firstName;
	private String lastName;
	private String phoneNumber;
	private String city;
	private String state;
	private String country;
	
}
