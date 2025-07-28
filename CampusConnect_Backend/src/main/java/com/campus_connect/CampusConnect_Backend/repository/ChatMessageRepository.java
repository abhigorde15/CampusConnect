package com.campus_connect.CampusConnect_Backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campus_connect.CampusConnect_Backend.models.ChatMessage;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
    List<ChatMessage> findByChatGroupNameOrderByTimestampAsc(String groupName);
   
}