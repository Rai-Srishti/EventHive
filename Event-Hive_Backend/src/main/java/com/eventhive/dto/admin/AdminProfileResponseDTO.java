package com.eventhive.dto.admin;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminProfileResponseDTO {
	private Long userId;
	private String firstName;
	private String lastName;
	private String email;
	private String phoneNumber;
	private String state;
	private String country;
	
}
