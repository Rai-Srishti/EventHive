package com.eventhive.controllers.attendee;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    
//    @PostMapping("/wallet/update-balance")
//    public ResponseEntity<String> updateWallet(@RequestBody Map<String, Object> payload) {
//        Long amount = Long.parseLong(payload.get("amount").toString());
//        Long userId = jwtService.extractUserIdFromContext();  // from security context
//
//        walletService.addToWallet(userId, amount);
//        return ResponseEntity.ok("Wallet updated");
//    }
    
    @PostMapping("/wallet/update-balance/{attendeeId}")
    public ResponseEntity<String> updateWallet(@PathVariable Long attendeeId, Long amount) {
      

        walletService.addToWallet(attendeeId, amount);
        return ResponseEntity.ok("Wallet updated");
    }

}
