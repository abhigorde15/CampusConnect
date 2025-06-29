package com.campus_connect.CampusConnect_Backend.repository;

import com.campus_connect.CampusConnect_Backend.models.Note;
import com.campus_connect.CampusConnect_Backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotesRepository extends JpaRepository<Note, Integer> {
    List<Note> findByUploadedBy(User user);
}
