package com.eventhive.dto.authentication;

import com.eventhive.entities.enums.Role;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestDto {
    private String firstName;
    private String lastName;
    private String email;
    private String password;
    private String phoneNumber;
    private String city;
    private String state;
    private String country;
    private Role role; // HOST or ATTENDEE only
}