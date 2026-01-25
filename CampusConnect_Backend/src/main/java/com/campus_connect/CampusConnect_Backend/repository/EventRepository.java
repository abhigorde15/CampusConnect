package com.campus_connect.CampusConnect_Backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.campus_connect.CampusConnect_Backend.models.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Long> {
    List<Event> findByCategory(String category);

    List<Event> findByOrderByEventDateAsc();
}
