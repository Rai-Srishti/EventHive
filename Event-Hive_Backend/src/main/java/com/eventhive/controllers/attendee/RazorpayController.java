package com.eventhive.controllers.attendee;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.eventhive.services.RazorPayService;
import com.eventhive.services.Attendee.AttendeeWalletService;
import com.eventhive.services.authentication.JWTService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/payment")
@RequiredArgsConstructor
public class RazorpayController {

    private final RazorPayService razorPayService;
    private final JWTService jwtService;
    private final AttendeeWalletService walletService;

    @PostMapping("/create-order")
    public ResponseEntity<String> createOrder(
            @RequestParam int amount,
            @RequestParam String receiptId) throws Exception {
        String order = razorPayService.createOrder(amount, receiptId);
        return ResponseEntity.ok(order);
    }

    @PostMapping("/wallet/update-balance")
    public ResponseEntity<String> updateWallet(@RequestParam Long amount) {
        Long attendeeId = jwtService.extractUserIdFromContext(); 
        walletService.addToWallet(attendeeId, amount);
        return ResponseEntity.ok("Wallet updated successfully.");
    }
}
