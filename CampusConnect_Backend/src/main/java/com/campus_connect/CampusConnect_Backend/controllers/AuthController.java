package com.campus_connect.CampusConnect_Backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campus_connect.CampusConnect_Backend.config.JwtUtil;
import com.campus_connect.CampusConnect_Backend.models.AuthRequest;
import com.campus_connect.CampusConnect_Backend.models.User;
import com.campus_connect.CampusConnect_Backend.repository.UserRepository;
import com.campus_connect.CampusConnect_Backend.service.CustomUserDetailsService;
import com.campus_connect.CampusConnect_Backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired 
    private AuthenticationManager authManager;
    @Autowired 
    private UserRepository repository;
    @Autowired 
    private BCryptPasswordEncoder passwordEncoder;
    @Autowired 
    private JwtUtil jwtUtil;
    @Autowired 
    private CustomUserDetailsService userDetailsService;
    @Autowired
    private UserService userService;
   
   
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userService.emailExists(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

       
        return ResponseEntity.ok(userService.registerUser(user));
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
    	User user = repository.findByEmail(request.getEmail()).get();
    	System.out.println("Raw password: " + request.getPassword());
    	System.out.println("Encoded in DB: " + user.getPassword());
    	System.out.println("Matches: " + passwordEncoder.matches(request.getPassword(), user.getPassword()));

        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
     
        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        System.out.println("Userdetails are coming"+userDetails);
        final String token = jwtUtil.generateToken(userDetails.getUsername());
        System.out.println("Token generated"+token);
        return ResponseEntity.ok(token);
    }
}
