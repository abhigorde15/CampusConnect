package com.campus_connect.CampusConnect_Backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String toEmail, String name, String code) {
        String subject = "CampusConnect Email Verification";
        String body = "Hi " + name + ",\n\nPlease verify your email using this code: " + code +
                      "\n\nEnter this code on the website to complete verification.\n\nThanks,\nCampusConnect Team";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(subject);
        message.setText(body);
        mailSender.send(message);
    }
}
