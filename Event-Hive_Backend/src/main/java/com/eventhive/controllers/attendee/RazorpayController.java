package com.eventhive.controllers.attendee;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.eventhive.services.RazorPayService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class RazorpayController {

    private final RazorPayService razorPayService;

    @PostMapping("/create-order")
    public ResponseEntity<String> createOrder(
            @RequestParam int amount,
            @RequestParam String receiptId) throws Exception {
        String order = razorPayService.createOrder(amount, receiptId);
        return ResponseEntity.ok(order);
    }
}
