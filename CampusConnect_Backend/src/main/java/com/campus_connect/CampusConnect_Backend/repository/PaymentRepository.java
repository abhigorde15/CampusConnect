package com.campus_connect.CampusConnect_Backend.repository;



import org.springframework.data.jpa.repository.JpaRepository;

import com.campus_connect.CampusConnect_Backend.models.Payment;

import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByUserId(Long userId);
}
