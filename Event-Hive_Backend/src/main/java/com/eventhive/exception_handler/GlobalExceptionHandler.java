package com.eventhive.exception_handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.eventhive.custom_exception.ApiException;
import com.eventhive.custom_exception.EventNotFoundException;
import com.eventhive.custom_exception.InsufficientBalanceException;
import com.eventhive.custom_exception.QrCodeGenerationException;
import com.eventhive.custom_exception.QrCodeNotFoundException;
import com.eventhive.custom_exception.TicketSoldOutException;
import com.eventhive.custom_exception.UserNotFounderException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(InsufficientBalanceException.class)
    public ResponseEntity<String> handleInsufficientBalance(InsufficientBalanceException ex) {
        return ResponseEntity
                .status(HttpStatus.BAD_REQUEST)
                .body(ex.getMessage());
    }
    @ExceptionHandler(UserNotFounderException.class)
    public ResponseEntity<String> handleUserNot(UserNotFounderException ex) {
    	return ResponseEntity
    			.status(HttpStatus.BAD_REQUEST)
    			.body(ex.getMessage());
    }
    @ExceptionHandler(TicketSoldOutException.class)
    public ResponseEntity<String> handleTicketSoldOut(TicketSoldOutException ex) {
    	return ResponseEntity
    			.status(HttpStatus.BAD_REQUEST)
    			.body(ex.getMessage());
    }
    @ExceptionHandler(QrCodeNotFoundException.class)
    public ResponseEntity<String> handleQrCodeNotFound(QrCodeNotFoundException ex) {
    	return ResponseEntity
    			.status(HttpStatus.NOT_FOUND)
    			.body(ex.getMessage());
    }
    @ExceptionHandler(QrCodeGenerationException.class)
    public ResponseEntity<String> handleQrCodeGenertaion(QrCodeGenerationException ex) {
    	return ResponseEntity
    			.status(HttpStatus.INTERNAL_SERVER_ERROR)
    			.body(ex.getMessage());
    }
    
    @ExceptionHandler(EventNotFoundException.class)
    public ResponseEntity<String> handleHostNotFound(EventNotFoundException ex) {
    	return ResponseEntity
    			.status(HttpStatus.NOT_FOUND)
    			.body(ex.getMessage());
    }
    
    
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<String> handleApiException(ApiException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
