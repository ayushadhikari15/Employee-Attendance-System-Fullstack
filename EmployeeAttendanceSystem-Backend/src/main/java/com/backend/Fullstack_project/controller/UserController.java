// src/main/java/com/backend/Fullstack_project/controller/UserController.java

package com.backend.Fullstack_project.controller;

import com.backend.Fullstack_project.exception.UserNotFoundException;
import com.backend.Fullstack_project.model.User;
import com.backend.Fullstack_project.repository.UserRepository;
// Naye Imports
import com.backend.Fullstack_project.dto.EmployeeRequest; // RegisterRequest ke bajaye
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import jakarta.validation.Valid;
import java.util.UUID; // Random password ke liye

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin("http://localhost:3001") // Port 3001
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder; // <-- PasswordEncoder inject karein

    // === PROTECTED ENDPOINT UPDATE KIYA GAYA ===
    // Logged-in user ke liye naya employee/user add karna
    // POST /api/users
    @PostMapping
    public ResponseEntity<?> createNewUser(@Valid @RequestBody EmployeeRequest employeeRequest) { // DTO change kiya

        // Check karein ki username pehle se exist karta hai ya nahi
        if (userRepository.findByUsername(employeeRequest.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Username is already taken!");
        }

        // Naya user create karein
        User user = new User();
        user.setName(employeeRequest.getName());
        user.setUsername(employeeRequest.getUsername());
        user.setEmail(employeeRequest.getEmail());

        // === YAHAN CHANGE KIYA GAYA HAI ===
        // Ek random, unknown password generate karein taaki employee login na kar sake
        String randomPassword = UUID.randomUUID().toString();
        user.setPassword(passwordEncoder.encode(randomPassword));
        // === END CHANGE ===

        userRepository.save(user);

        return ResponseEntity.ok("Employee created successfully!");
    }
    // === END NAYA ENDPOINT ===


    // GET /api/users
    @GetMapping
    List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // GET /api/users/{id}
    @GetMapping("/{id}")
    User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    // PUT /api/users/{id}
    @PutMapping("/{id}")
    User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    // Password ko chhod kar baaki details update karein
                    user.setUsername(newUser.getUsername());
                    user.setName(newUser.getName());
                    user.setEmail(newUser.getEmail());
                    return userRepository.save(user);
                }).orElseThrow(() -> new UserNotFoundException(id));
    }

    // DELETE /api/users/{id}
    @DeleteMapping("/{id}")
    String deleteUser(@PathVariable Long id){
        if(!userRepository.existsById(id)){
            throw new UserNotFoundException(id);
        }
        userRepository.deleteById(id);
        return  "User with id "+id+" has been deleted success.";
    }
}