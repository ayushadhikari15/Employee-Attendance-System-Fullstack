// src/main/java/com/backend/Fullstack_project/controller/AuthController.java

package com.backend.Fullstack_project.controller;

import com.backend.Fullstack_project.config.jwt.JwtUtil;
import com.backend.Fullstack_project.dto.AuthResponse;
import com.backend.Fullstack_project.dto.LoginRequest;
import com.backend.Fullstack_project.dto.RegisterRequest;
import com.backend.Fullstack_project.model.User;
import com.backend.Fullstack_project.repository.UserRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth") // Base path for auth
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    // POST /api/auth/login
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            // User ko authenticate karein
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword()
                    )
            );

            // Security context mein authentication set karein
            SecurityContextHolder.getContext().setAuthentication(authentication);

            // JWT token generate karein
            String jwt = jwtUtil.generateToken(loginRequest.getUsername());

            // Response mein token aur username bhejein
            return ResponseEntity.ok(new AuthResponse(jwt, loginRequest.getUsername()));

        } catch (AuthenticationException e) {
            // Agar authentication fail hota hai
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Error: Invalid username or password");
        }
    }

    // POST /api/auth/register
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest registerRequest) {
        // Check karein ki username pehle se exist karta hai ya nahi
        if (userRepository.findByUsername(registerRequest.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error: Username is already taken!");
        }

        // Check karein ki email pehle se exist karta hai ya nahi (Optional, but good)
        // Humne User model mein email unique rakha hai, toh database bhi error dega
        // Lekin yeh ek accha user-friendly response hai.

        // Naya user create karein
        User user = new User();
        user.setName(registerRequest.getName());
        user.setUsername(registerRequest.getUsername());
        user.setEmail(registerRequest.getEmail());
        user.setPassword(passwordEncoder.encode(registerRequest.getPassword())); // Password encode karein

        userRepository.save(user);

        // Register karne ke baad automatically login bhi kar sakte hain (Optional)
        // Yahan hum bas success message bhej rahe hain
        return ResponseEntity.ok("User registered successfully!");
    }
}