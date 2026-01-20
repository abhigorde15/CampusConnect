package com.campus_connect.CampusConnect_Backend.service;


import com.campus_connect.CampusConnect_Backend.models.Payment;
import com.campus_connect.CampusConnect_Backend.repository.PaymentRepository;
import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.Utils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PaymentService {

    @Value("${razorpay.key_id}")
    private String razorpayKeyId;

    @Value("${razorpay.key_secret}")
    private String razorpayKeySecret;

    private final PaymentRepository paymentRepository;

    public PaymentService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public Map<String, Object> createOrder(int amount, int userId, Long itemId, String itemName) throws Exception {
        // Initialize Razorpay client
        RazorpayClient client = new RazorpayClient(razorpayKeyId, razorpayKeySecret);

        // Create Razorpay order
        JSONObject orderRequest = new JSONObject();
        orderRequest.put("amount", amount * 100); // amount in paise
        orderRequest.put("currency", "INR");
        orderRequest.put("receipt", "txn_" + System.currentTimeMillis());
        orderRequest.put("payment_capture", 1);

        Order order = client.orders.create(orderRequest);

        
        Payment payment = new Payment();
        payment.setRazorpayOrderId(order.get("id"));
        payment.setAmount(amount);
        payment.setCurrency(order.get("currency"));
        payment.setStatus("CREATED");
        payment.setUserId(userId);
        payment.setItemTitle(itemName);
     
       // paymentRepository.save(payment);

       
        Map<String, Object> response = new HashMap<>();
        response.put("id", order.get("id"));
        response.put("currency", order.get("currency"));
        response.put("amount", order.get("amount"));
        response.put("key", razorpayKeyId); 
        response.put("orderId", order.get("id"));

        return response;
    }

    public boolean verifyPayment(String orderId, String paymentId, String signature) {
        try {
            JSONObject attributes = new JSONObject();
            attributes.put("razorpay_order_id", orderId);
            attributes.put("razorpay_payment_id", paymentId);
            attributes.put("razorpay_signature", signature);
            Utils.verifyPaymentSignature(attributes, razorpayKeySecret);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public Payment savePayment(Payment payment) {
        return paymentRepository.save(payment);
    }

    public List<Payment> getPaymentsByUser(Long userId) {
        return paymentRepository.findByUserId(userId);
    }
}
