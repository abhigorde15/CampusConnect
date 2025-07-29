package com.campus_connect.CampusConnect_Backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
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
    private ChatGroupRepository groupRepo;

    @Autowired
    private ChatMessageRepository messageRepo;
    @MessageMapping("/chat.sendMessage/{groupName}")
    @SendTo("/topic/{groupName}")
    public ChatMessageDTO sendMessage(@Payload ChatMessageDTO message,
                                      @DestinationVariable String groupName) {
        ChatGroup group = groupRepo.findByName(groupName)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        ChatMessage saved = new ChatMessage();
        saved.setSenderName(message.getSenderName());
        saved.setContent(message.getContent());
        saved.setChatGroup(group);
        messageRepo.save(saved);

        return message;
    }

}
