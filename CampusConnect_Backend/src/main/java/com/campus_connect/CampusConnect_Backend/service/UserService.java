package com.campus_connect.CampusConnect_Backend.service;

import com.campus_connect.CampusConnect_Backend.models.User;
import com.campus_connect.CampusConnect_Backend.models.VerificationToken;
import com.campus_connect.CampusConnect_Backend.repository.UserRepository;
import com.campus_connect.CampusConnect_Backend.repository.VerificationTokenRepository;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public User registerUser(User user) {
    	 user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public boolean emailExists(String email) {
        return userRepository.findByEmail(email).isPresent();
    }
    @Autowired
    private VerificationTokenRepository tokenRepository;

    public void saveVerificationToken(User user, String token) {
        VerificationToken verificationToken = new VerificationToken(
            token,
            user,
            new Date(System.currentTimeMillis() + 1000 * 60 * 60) // 1 hour expiry
        );
        tokenRepository.save(verificationToken);
    }

   

    public boolean verifyUserToken(String token) {
    	System.out.println("Token"+token);
        Optional<VerificationToken> optionalToken = tokenRepository.findByToken(token);
        if (optionalToken.isEmpty()) return false;
    	System.out.println("Optional Token "+optionalToken);
        VerificationToken verificationToken = optionalToken.get();

       
        if (verificationToken.getExpiryDate().before(new Date())) {
            tokenRepository.delete(verificationToken); // cleanup expired token
            return false;
        }

        User user = verificationToken.getUser();
        user.setVerified(true);
        userRepository.save(user);
        tokenRepository.delete(verificationToken); // one-time use token
        return true;
    }

	public Optional<User> findByEmail(String username) {
		
		return userRepository.findByEmail(username);
	}


}
