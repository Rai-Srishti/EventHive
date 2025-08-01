package com.eventhive.custom_exception;

public class QrCodeNotFoundException extends RuntimeException {
    public QrCodeNotFoundException(String message) {
        super(message);
    }
}
