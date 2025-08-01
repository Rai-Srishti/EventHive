package com.eventhive.custom_exception;

public class UserNotFounderException extends RuntimeException {
    public UserNotFounderException(String message) {
        super(message);
    }
}
