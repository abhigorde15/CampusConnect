package com.campus_connect.CampusConnect_Backend.controllers;
import java.util.List;

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

import com.campus_connect.CampusConnect_Backend.models.ChatGroup;
import com.campus_connect.CampusConnect_Backend.models.ChatMessage;
import com.campus_connect.CampusConnect_Backend.repository.ChatGroupRepository;
import com.campus_connect.CampusConnect_Backend.repository.ChatMessageRepository;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "*")
public class ChatRestController {

    @Autowired
    private ChatGroupRepository groupRepo;

    @Autowired
    private ChatMessageRepository messageRepo;

   
    @GetMapping("/groups")
    public ResponseEntity<List<ChatGroup>> getAllGroups() {
        return ResponseEntity.ok(groupRepo.findAll());
    }

 
    @PostMapping("/groups")
    public ResponseEntity<?> createGroup(@RequestBody ChatGroup group) {
        try {
            return ResponseEntity.ok(groupRepo.save(group));
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error creating group: " + e.getMessage());
        }
    }

    @DeleteMapping("/groups/{id}")
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

    @GetMapping("/messages/{groupName}")
    public ResponseEntity<?> getMessagesByGroup(@PathVariable String groupName) {
        try {
            List<ChatMessage> messages = messageRepo.findByChatGroupNameOrderByTimestampAsc(groupName);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error fetching messages: " + e.getMessage());
        }
    }
}
