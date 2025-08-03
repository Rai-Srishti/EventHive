package com.eventhive.dto.authentication;

import com.eventhive.entities.enums.Role;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupRequestDto {
	 @NotBlank(message = "First name is required")
	    @Size(max = 50, message = "First name must be at most 50 characters")
	    private String firstName;

	    @NotBlank(message = "Last name is required")
	    @Size(max = 50, message = "Last name must be at most 50 characters")
	    private String lastName;

	    @NotBlank(message = "Email is required")
	    @Email(message = "Invalid email format")
	    private String email;

	    @NotBlank(message = "Password is required")
	    @Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
	    private String password;

	    @NotBlank(message = "Phone number is required")
	    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Phone number must be a valid 10-digit Indian number")
	    private String phoneNumber;


	    @NotBlank(message = "City is required")
	    private String city;

	    @NotBlank(message = "State is required")
	    private String state;

	    @NotBlank(message = "Country is required")
	    private String country;

	    @NotNull(message = "Role is required")
	    private Role role; // HOST or ATTENDEE only
}