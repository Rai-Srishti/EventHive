package com.eventhive.custom_exception;

public class TicketSoldOutException extends RuntimeException {
    public TicketSoldOutException(String message) {
        super(message);
    }
}
