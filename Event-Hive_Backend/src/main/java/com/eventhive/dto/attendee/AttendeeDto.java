package com.eventhive.dto.attendee;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.eventhive.entities.Event;
import com.eventhive.entities.Ticket;
import com.eventhive.entities.Wallet;
import com.eventhive.entities.enums.Role;
import com.eventhive.entities.enums.UserStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttendeeDto {
	 
	    private String firstName;
	    private String lastName;
	    private String email;
	    private String password;
	    private String phoneNumber;
	    private String city;
	    private String state;
	    private String country;    

	 }
