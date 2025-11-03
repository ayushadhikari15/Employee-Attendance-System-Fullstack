// src/main/java/com/backend/Fullstack_project/repository/UserRepository.java

package com.backend.Fullstack_project.repository;

import com.backend.Fullstack_project.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional; // Optional ko import karein

public interface UserRepository extends JpaRepository<User,Long> {

    // Spring Security ko login ke waqt user ko username se dhoondhne ke liye
    // JpaRepository yeh method automatically implement kar dega
    Optional<User> findByUsername(String username);
}