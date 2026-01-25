package com.campus_connect.CampusConnect_Backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.campus_connect.CampusConnect_Backend.models.ChatGroup;

public interface ChatGroupRepository extends JpaRepository<ChatGroup, Integer> {
    Optional<ChatGroup> findByName(String name);
 

}
