package com.campus_connect.CampusConnect_Backend.controllers;


import com.campus_connect.CampusConnect_Backend.models.Payment;
import com.campus_connect.CampusConnect_Backend.models.PaymentRequest;
import com.campus_connect.CampusConnect_Backend.models.PaymentResponse;
import com.campus_connect.CampusConnect_Backend.service.PaymentService;
import com.razorpay.Order;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins="https://campus-connect-amber-nine.vercel.app")
public class PaymentController {

    private final PaymentService paymentService;
    public PaymentController(PaymentService paymentService) {
        this.paymentService = paymentService;
    }

   
    @PostMapping("/payment")
    public ResponseEntity<?> createOrder(@RequestBody PaymentRequest request) {
        try {
            Map<String, Object> orderData = paymentService.createOrder(
                request.getAmount(),
                request.getUserId(),
                request.getItemId(),
                request.getItemName()
            );
            return ResponseEntity.ok(orderData);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(Map.of("error", e.getMessage()));
        }
    }


    
    @PostMapping("/payment/verify")
    public ResponseEntity<String> verifyPayment(@RequestBody Map<String, Object> payload) {
        String razorpay_order_id = (String) payload.get("razorpay_order_id");
        String razorpay_payment_id = (String) payload.get("razorpay_payment_id");
        String razorpay_signature = (String) payload.get("razorpay_signature");
        int userId = Integer.parseInt(payload.get("userId").toString());
        int amount = payload.get("amount") != null ? Integer.parseInt(payload.get("amount").toString()) : 0;
        String itemTitle = payload.get("itemTitle") != null ? payload.get("itemTitle").toString() : "Unknown Item";

        boolean isValid = paymentService.verifyPayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);

        if (isValid) {
            Payment payment = new Payment();
            payment.setRazorpayOrderId(razorpay_order_id);
            payment.setRazorpayPaymentId(razorpay_payment_id);
            payment.setRazorpaySignature(razorpay_signature);
            payment.setAmount(amount);
            payment.setCurrency("INR");
            payment.setStatus("SUCCESS");
            payment.setUserId(userId);
            payment.setItemTitle(itemTitle);

            paymentService.savePayment(payment);
            return ResponseEntity.ok("Payment verified and saved successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid payment signature!");
        }
    }

   
    @GetMapping("/user/{userId}")
    public List<Payment> getPaymentsByUser(@PathVariable Long userId) {
        return paymentService.getPaymentsByUser(userId);
    }
}
