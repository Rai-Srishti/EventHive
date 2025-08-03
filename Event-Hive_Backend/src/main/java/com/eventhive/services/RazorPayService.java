package com.eventhive.services;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;



@Service
public class RazorPayService {

	@Value("${razorpay.key_id}")
	private String keyId;
	
	@Value("${razorpay.key_secret}")
	private String keySecret;
	
	public String createOrder(int amount, String receiptId) throws Exception{
		RazorpayClient razorpayClient = new RazorpayClient(keyId, keySecret);
		JSONObject orderRequest = new JSONObject();
		orderRequest.put("amount", amount * 100); // in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", receiptId);
        orderRequest.put("payment_capture", true); // auto capture
        
        Order order = razorpayClient.orders.create(orderRequest);
        return order.toString();
	}
}
