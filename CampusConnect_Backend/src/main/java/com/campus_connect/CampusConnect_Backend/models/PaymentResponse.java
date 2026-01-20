package com.campus_connect.CampusConnect_Backend.models;



public class PaymentResponse {
    private String id;
    private String currency;
    private int amount;

    public PaymentResponse(String id, String currency, Object amount) {
        this.id = id;
        this.currency = currency;
        this.amount = Integer.parseInt(amount.toString());
    }

    public String getId() {
        return id;
    }

    public String getCurrency() {
        return currency;
    }

    public int getAmount() {
        return amount;
    }
}
