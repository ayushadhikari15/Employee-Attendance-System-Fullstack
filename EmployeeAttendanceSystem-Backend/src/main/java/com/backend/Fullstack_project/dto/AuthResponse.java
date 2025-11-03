// src/main/java/com/backend/Fullstack_project/dto/AuthResponse.java

package com.backend.Fullstack_project.dto;

public class AuthResponse {

    private String token;
    private String username; // Extra user info bhejna accha rehta hai

    // Constructor
    public AuthResponse(String token, String username) {
        this.token = token;
        this.username = username;
    }

    // Getters
    public String getToken() {
        return token;
    }

    public String getUsername() {
        return username;
    }

    // Setters
    public void setToken(String token) {
        this.token = token;
    }

    public void setUsername(String username) {
        this.username = username;
    }
}