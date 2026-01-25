package com.campus_connect.CampusConnect_Backend.controllers;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.campus_connect.CampusConnect_Backend.config.JwtUtil;
import com.campus_connect.CampusConnect_Backend.models.ChatGroup;
import com.campus_connect.CampusConnect_Backend.models.ChatMessage;
import com.campus_connect.CampusConnect_Backend.models.User;
import com.campus_connect.CampusConnect_Backend.repository.ChatGroupRepository;
import com.campus_connect.CampusConnect_Backend.repository.ChatMessageRepository;
import com.campus_connect.CampusConnect_Backend.repository.MarketItemRepository;
import com.campus_connect.CampusConnect_Backend.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "https://campus-connect-amber-nine.vercel.app/")
public class ChatRestController {

    @Autowired
    private ChatGroupRepository groupRepo;

    @Autowired
    private ChatMessageRepository messageRepo;
   
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private UserRepository userRepository;
    @GetMapping("/public/groups")
    public ResponseEntity<List<ChatGroup>> getAllGroups() {
        return ResponseEntity.ok(groupRepo.findAll());
    }

 
    @PostMapping("/chat/groups")
    public ResponseEntity<?> createGroup(@RequestBody ChatGroup group) {
        try {
            return ResponseEntity.ok(groupRepo.save(group));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating group: " + e.getMessage());
        }
    }

    @DeleteMapping("/chat/groups/{id}")
    public ResponseEntity<?> deleteGroup(@PathVariable int id) {
        if (!groupRepo.existsById(id)) {
            return ResponseEntity.status(404).body("Group not found");
        }
        try {
            groupRepo.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting group: " + e.getMessage());
        }
    }

    @GetMapping("/public/chat/messages/{groupName}")
    public ResponseEntity<?> getMessagesByGroup(@PathVariable String groupName) {
        try {
            List<ChatMessage> messages = messageRepo.findByChatGroupNameOrderByTimestampAsc(groupName);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching messages: " + e.getMessage());
        }
    }
    @DeleteMapping("/message/{id}")
    public ResponseEntity<?> deleteById(@PathVariable Long id, HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED)
                                 .body("Missing or invalid Authorization header");
        }

        String token = authHeader.substring(7);
        String email = jwtUtil.extractUsername(token);

        Optional<ChatMessage> optionalMsg = messageRepo.findById(id);
        if (optionalMsg.isEmpty()) {
            return ResponseEntity.status(HttpServletResponse.SC_NOT_FOUND)
                                 .body("Message not found");
        }

        ChatMessage msg = optionalMsg.get();
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED)
                                 .body("User not found");
        }

        User user = optionalUser.get();

        if (user.getName().equals(msg.getSenderName())) {
            messageRepo.deleteById(id); // 🧹 Actual deletion here
            return ResponseEntity.ok("Successfully Deleted");
        }

        return ResponseEntity.status(HttpServletResponse.SC_FORBIDDEN)
                             .body("You are not allowed to delete this message");
    }

}
