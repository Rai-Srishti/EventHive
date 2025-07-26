package com.eventhive.controllers.attendee;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.eventhive.services.Attendee.AttendeeService;

import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/attendee")
public class AttendeeController {

	private final AttendeeService attendeeService;
}
