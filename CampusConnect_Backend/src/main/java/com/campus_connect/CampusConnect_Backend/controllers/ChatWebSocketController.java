package com.campus_connect.CampusConnect_Backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.campus_connect.CampusConnect_Backend.models.ChatGroup;
import com.campus_connect.CampusConnect_Backend.models.ChatMessage;
import com.campus_connect.CampusConnect_Backend.models.ChatMessageDTO;
import com.campus_connect.CampusConnect_Backend.repository.ChatGroupRepository;
import com.campus_connect.CampusConnect_Backend.repository.ChatMessageRepository;

@Controller
@CrossOrigin(origins = "https://campus-connect-amber-nine.vercel.app/")
public class ChatWebSocketController {

        @Autowired
        private SimpMessagingTemplate messagingTemplate;

        @Autowired
        private ChatGroupRepository groupRepo;

        @Autowired
        private ChatMessageRepository messageRepo;

        @MessageMapping("/chat.sendMessage/{groupName}")
        public void sendMessage(
                        @Payload ChatMessageDTO message,
                        @DestinationVariable String groupName) {
                ChatGroup group = groupRepo.findByName(groupName)
                                .orElseGet(() -> {
                                        ChatGroup newGroup = new ChatGroup();
                                        newGroup.setName(groupName);
                                        // Set default values or handle them appropriately
                                        newGroup.setDescription("Auto-created group for " + groupName);
                                        newGroup.setBranchName("General"); // Or derive from groupName if possible
                                        return groupRepo.save(newGroup);
                                });

                ChatMessage saved = new ChatMessage();
                saved.setSenderName(message.getSenderName());
                saved.setContent(message.getContent());
                saved.setChatGroup(group);

                ChatMessage persisted = messageRepo.save(saved);

                messagingTemplate.convertAndSend(
                                "/topic/" + groupName,
                                persisted);
        }
}
