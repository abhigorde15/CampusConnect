package com.campus_connect.CampusConnect_Backend.repository;

import com.campus_connect.CampusConnect_Backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Optional<User> findByEmail(String email);
}
