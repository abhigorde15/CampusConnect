package com.campus_connect.CampusConnect_Backend.controllers;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.json.JSONArray;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
import com.campus_connect.CampusConnect_Backend.service.EmailService;
import com.campus_connect.CampusConnect_Backend.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins="https://campus-connect-amber-nine.vercel.app")
public class AuthController {
    @Autowired
    private EmailService emailService;
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
    public ResponseEntity<?> register(@RequestBody User user, HttpServletRequest request) {
        if (userService.emailExists(user.getEmail())) {
            return ResponseEntity.badRequest().body("Email already registered");
        }

        // Save user with isVerified = false
        User registeredUser = userService.registerUser(user);  // still unverified
//        System.out.println("before Generate verification token");
        // Generate verification token
//        String token = UUID.randomUUID().toString();
//        userService.saveVerificationToken(registeredUser, token);
//       
//       
//        String verificationUrl = request.getRequestURL().toString().replace("/register", "")
//                + "/verify?token=" + token;
//
//        
//
//        emailService.sendEmail(user.getEmail(), user.getName(),token);
//        
//       
        return ResponseEntity.ok("Registration successful. Please verify your email.");
    }
  

    @GetMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestParam("token") String token) {
        boolean result = userService.verifyUserToken(token);
        if (result) {
            return ResponseEntity.ok("Email verified successfully. You can now log in.");
        } else {
            return ResponseEntity.badRequest().body("Invalid or expired verification token.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
       
    	
        Optional<User> optionalUser = repository.findByEmail(request.getEmail());
        if (optionalUser.isEmpty()) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
        
        User user = optionalUser.get();
     
        // 2. Check if user is verified
        if (!user.isVerified()) {
            return ResponseEntity.badRequest().body("Please verify your email before logging in.");
        }

        // 3. Check if password is correct
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }

        // 4. Authenticate and generate token
        authManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        final String token = jwtUtil.generateToken(userDetails.getUsername(), user.getName());
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("userId", user.getId()); 

        return ResponseEntity.ok(response);

    }
    @GetMapping("/user")
    public ResponseEntity<?> getUser(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Missing or invalid Authorization header");
        }

        String jwt = authHeader.substring(7); 

        try {
            String username = jwtUtil.extractUsername(jwt); // Validate and extract username

            if (username == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

            User user = userService.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

            return ResponseEntity.ok(user);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Token validation failed");
        }
    }

}
