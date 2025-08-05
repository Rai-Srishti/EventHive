package com.eventhive.custom_exception;

public class EmailAlreadyExistsException extends RuntimeException{
	public EmailAlreadyExistsException(String message) {
        super(message);
	}
}
