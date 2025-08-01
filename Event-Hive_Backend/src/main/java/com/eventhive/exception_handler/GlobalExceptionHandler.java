package com.eventhive.exception_handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.eventhive.custom_exception.ApiException;
import com.eventhive.custom_exception.EventNotFoundException;
import com.eventhive.custom_exception.UserNotFoundException;
import com.eventhive.custom_exception.QrCodeGenerationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

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
    
    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleHostNotFound(UserNotFoundException ex) {
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(ex.getMessage());
    }
    
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<String> handleApiException(ApiException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
